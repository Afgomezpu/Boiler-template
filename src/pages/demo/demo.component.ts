import { Component, OnInit } from '@angular/core';
import { WEBSERVICE, URL } from '../../config/webservices';
import { ServicesProvider } from '../../providers/services';
//./../assets/lib/jquery.enjoyhint.js
//import '../../assets/lib/jquery.enjoyhint.js';
declare var EnjoyHint: any;

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  bPrimeraVezLupa: boolean = !localStorage.getItem('tour') ? true : false;
  data: object = {};
  constructor(public serviceProvider: ServicesProvider) {
    console.log(URL + WEBSERVICE.LOGIN);
  }

  ngOnInit(): void {
    this.fn_ConsumirServicioWeb();
    setTimeout(() => {
      this.serviceProvider.fn_GenerarToast('exito', 'Muy bien campeón!');
      this.fn_AbrirTour();
    }, 5000);
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
      .post('post5', oSendData)
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

  fn_AbrirTour() {
    //this.serviceProvider.esconder_contenedor_busqueda = false;
    localStorage.setItem('tour', 'true');
    this.bPrimeraVezLupa = false;
    var options = {
      nextButton: { className: 'myNext', text: 'Siguiente' },
      skipButton: { className: 'mySkip', text: 'Omitir' },
    };

    let pasos = [
      {
        selector: '#card',
        event: 'click',
        description:
          'La opción de búsqueda permitirá realizar una búsqueda y abrirá el panel del mismo',
        showNext: true,
        showPrev: true,
        busqueda_realizada: true,
      },
      {
        selector: '.titulo',
        event: 'click',
        description:
          'Otra alternativa para abrir el panel de búsqueda, es haciendo click desde esta pestaña lateral ',
        showNext: true,
        showPrev: true,
        busqueda_realizada: true,
      },
    ];
    var enjoyhint_script_data = pasos;
    /*var enjoyhint_script_data = pasos.filter(
      (paso) => !paso.busqueda_realizada == !this.dashboardService.bCheckData
    );*/

    var enjoyhint_instance = null;
    enjoyhint_instance = new EnjoyHint(options);
    enjoyhint_instance.setScript(enjoyhint_script_data);
    enjoyhint_instance.runScript();
    /*
    setTimeout(() => {
      document.querySelectorAll(".myNext").forEach(function (el) {
        el.innerHTML = "Siguiente";
      });
    });*/
  }
}
