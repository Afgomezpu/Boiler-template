import { Component, OnInit,Input } from '@angular/core';
import { WEBSERVICE, URL } from '../../config/webservices';
import { ServicesProvider } from '../../providers/services';
import {SwiperComponent} from '../components/swiper/swiper.component'
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
    setTimeout(() => {
      this.serviceProvider.fn_GenerarToast('exito', 'Muy bien campeón!');
    }, 5000);
  }

  fn_generarTour(){
    this.serviceProvider.fn_AbrirTour();
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

  
}
