import { Component, OnInit,Input } from '@angular/core';
import { WEBSERVICE, URL } from '../../config/webservices';
import { ServicesProvider } from '../../providers/services';
import {SwiperComponent} from '../components/swiper/swiper.component'
import * as c3 from "c3";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
//./../assets/lib/jquery.enjoyhint.js
//import '../../assets/lib/jquery.enjoyhint.js';
declare var EnjoyHint: any;


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})

export class DemoComponent implements OnInit {
  
  data: object = {};
  constructor(public serviceProvider: ServicesProvider,public Swiper: MatDialog,) {
    
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
