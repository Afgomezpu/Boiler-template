import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { WEBSERVICE, URL } from '../../config/webservices';
import { ServicesProvider } from '../../providers/services';
import {SwiperComponent} from '../components/swiper/swiper.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import * as c3 from "c3";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {ExcelService} from '../../providers/excel.service'
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import { MatSort } from '@angular/material/sort';
//./../assets/lib/jquery.enjoyhint.js
//import '../../assets/lib/jquery.enjoyhint.js';
declare var EnjoyHint: any;


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})

export class DemoComponent implements OnInit {
  @ViewChild(MatSort, {}) sort: MatSort;
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  dataModal: object = {};
  formModal:FormGroup;
  dataSource:any=[];
  aColumnas:Array<string>;
  dataExcel: any = [
    {
      
      "CATEGORYID": 1,
      "CATEGORYNAME": "BOOKS",
      "DESCRIPTION": "It contains all types of books",
      "IMAGE": "Books",
      "STATUS": "TRUE"
    },
    {
      
      "CATEGORYID": 2,
      "CATEGORYNAME": "EBOOKS",
      "DESCRIPTION": "It contains all types of ebooks",
      "IMAGE": "Ebooks",
      "STATUS": "TRUE"
    },
    {
     
      "CATEGORYID": 3,
      "CATEGORYNAME": "Bookss",
      "DESCRIPTION": "DESCRIPTION",
      "IMAGE": "IMAGE",
      "STATUS": "TRUE"
    }
  ]
  data: object = {};
  constructor(public serviceProvider: ServicesProvider,public Swiper: MatDialog,private excelService:ExcelService,public fb: FormBuilder) {
 
     this.formModal=this.fb.group({
      titulo:[''],
      cuerpo:[''],
      
    })
    console.log(URL + WEBSERVICE.LOGIN);
  }

   swiper(){
    const dialogRef = this.Swiper.open(SwiperComponent)
   }


  ngOnInit(): void {
    this.fn_ConsumirServicioWeb();
    this.graficarCirculo();
    this.graficarBarra();
    setTimeout(() => {
      this.serviceProvider.fn_GenerarToast('exito', 'Muy bien campeón!');
    }, 5000);
    
  }

  aplicarFiltro(inputFiltro: string) {
    this.dataSource.filter = inputFiltro.trim().toLowerCase();
  }

  async fn_GenerarDataTable(){
    this.aColumnas= [ "nombre"];
    this.dataSource = await new MatTableDataSource([{'nombre':'gomez'}]);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dataExcel, 'myExcelFile');
  }

  fn_generarTour(){
    let pasos = [
      {
        selector: '.btn-azul',
        event: 'click',
        description:
          'La opción de búsqueda permitirá realizar una búsqueda y abrirá el panel del mismo',
        showNext: true,
        showPrev: true,
        busqueda_realizada: true,
      },
      {
        selector: '.btn-azul-claro',
        event: 'click',
        description:
          'Otra alternativa para abrir el panel de búsqueda, es haciendo click desde esta pestaña lateral ',
        showNext: true,
        showPrev: true,
        busqueda_realizada: true,
      },
      {
        selector: '.btn-azul-agua-marina',
        event: 'click',
        description:
          'Otra alternativa para abrir el panel de búsqueda, es haciendo click desde esta pestaña lateral ',
        showNext: true,
        showPrev: true,
        busqueda_realizada: true,
      },
    ];
    
    this.serviceProvider.fn_AbrirTour(pasos);
  }  

  fn_generarModal(formGroup: FormGroup){
    let titulo;
    let cuerpo;
    if (formGroup.valid) {
     titulo=this.formModal.get('titulo').value;
      cuerpo=this.formModal.get('cuerpo').value;
     console.log(cuerpo);
     this.serviceProvider.fn_GenerarPopupGenerico(titulo,cuerpo)
    }

    // this.serviceProvider.fn_GenerarPopupGenerico(
    //   'exito',
    //   '¿Esta seguro de que desea eliminar los datos?',
    //   'fn_EliminarCliente',
    //   this,
    //   1
    // );
  }

  fn_EliminarCliente(id) {
    alert('entra' + id);
  }

  fn_ConsumirServicioWeb() {
    console.log(1);
    let oSendData = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    this.serviceProvider.preloaderOn();
    this.serviceProvider
      .post('posts', oSendData)
      .then((data) => {
        console.log(data);
        if (data) {
          this.serviceProvider.fn_GenerarPopupGenerico(
            'advertencia',
            '¿Esta seguro de que desea eliminar los datos?',
            'fn_EliminarCliente',
            this,
            1
          );
        }
      })
      .catch((err) => {
        console.log(err, 'problema');
      })
      .finally(() => {
        this.serviceProvider.preloaderOff();
      });
  }

graficarCirculo(){
c3.generate({
  bindto:"#graficaCircular",
     data: {
        // iris data from R
        columns: [
            ['data1', 30],
            ['data2', 120],
        ],
        colors: {
          data1: '#00782b',
          data2: '#9cc129',
      },
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    }
    
});
}

graficarBarra(){
  c3.generate({
    bindto:"#graficaBarras",
    data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 100, 140, 200, 150, 50]
        ],
        colors: {
          data1: '#00782b',
          data2: '#9cc129',
      },

        
        
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    }
});
 }
}
