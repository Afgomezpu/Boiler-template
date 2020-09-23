import { Component, OnInit } from '@angular/core';
import { WEBSERVICE, URL } from '../../config/webservices';
import { ServicesProvider } from '../../providers/services';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  data: object = {};
  constructor(public serviceProvider: ServicesProvider) {
    console.log(URL + WEBSERVICE.LOGIN);
  }

  ngOnInit(): void {
    this.fn_ConsumirServicioWeb();
    setTimeout(() => {
      this.serviceProvider.fn_GenerarToast('exito', 'Muy bien campeón!');
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
}
