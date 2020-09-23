import { Component, OnInit } from '@angular/core';
import { WEBSERVICE, URL } from '../../config/webservices';
import { ServicesProvider } from '../../providers/services';
import    "../../assets/lib/jquery.enjoyhint.js";
declare var EnjoyHint: any;

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  bPrimeraVezLupa: boolean = !localStorage.getItem("tour") ? true : false;
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

  fn_AbrirTour() {
    //this.serviceProvider.esconder_contenedor_busqueda = false;
    localStorage.setItem("tour", "true");
    this.bPrimeraVezLupa = false;
    var options = {
      nextButton: { className: "myNext", text: "Siguiente" },
      skipButton: { className: "mySkip", text: "Omitir" },
    };

    let pasos = [
      {
        selector: ".fa-search",
        event: "click",
        description:
          "La opción de búsqueda permitirá realizar una búsqueda y abrirá el panel del mismo",
        showNext: true,
        showPrev: true,
        busqueda_realizada: true,
      },
      {
        selector: ".contenedor_pestana_busqueda",
        event: "click",
        description:
          "Otra alternativa para abrir el panel de búsqueda, es haciendo click desde esta pestaña lateral ",
        showNext: true,
        showPrev: true,
        busqueda_realizada: true,
      },

      {
        selector: "#niu",
        event: "click",
        description:
          "Debes escribir el Número de Identificación única (NIU) a buscar",
        showNext: true,
        busqueda_realizada: false,
      },
      {
        selector: "#pertinencia",
        event: "click",
        description:
          "Selecciona la permanencia que tienes con tu servicio Chec",
        showNext: true,
        showPrev: true,
        busqueda_realizada: false,
      },
      {
        selector: "#mes",
        event: "click",
        description:
          "Posteriormente puedes elegir el mes de la facturación a consultar",
        showNext: true,

        showPrev: true,
        busqueda_realizada: false,
      },
      {
        selector: ".contenedor_targetas_conclusion ",
        event: "click",
        description:
          "Si existen coincidencias y datos relacionados con los filtros anteriores, serán mostrados datos adicionales al consumo de energía como los que se muestran en este apartado",
        showNext: true,
        showPrev: true,
        busqueda_realizada: false,
      },

      {
        selector: ".contenedor_gráficas ",
        event: "click",
        description:
          "Es posible ver información de consumo discriminada en los últimos meses según tu filtro de consulta",
        showNext: true,
        showPrev: true,
        busqueda_realizada: false,
      },

      {
        selector: ".container_tarjetas_grid", //#contenedor_tarjetas_categoria
        event: "click",
        description:
          "En este espacio Se mostrarán conclusiones de acuerdo al consumo del usuario agrupadas por su categoría de servicio",
        showNext: true,
        showPrev: true,

        busqueda_realizada: true,
      },
      {
        selector: "#respuesta",
        event: "click",
        description:
          "Para retroalimentar tu experiencia en el resultado de la consulta, puedes seleccionar una opción y en caso de que no estas a conformidad se habilitará una caja de comentarios donde puedes registrar tu observación. Para realizar una nueva búsqueda debes diligenciar este formulario",
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
