import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
//importaciones del modal
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ModalComponent } from '../pages/components/modal/modal.component';
//importación de toast
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';

import { catchError, retry } from 'rxjs/operators';

import { URL, WEBSERVICE } from '../config/webservices';
import { throwError } from 'rxjs';
declare var EnjoyHint: any;
@Injectable()
export class ServicesProvider {
  private sUrl: string = URL;
  bPreloader: boolean = false;
  bPrimeraVezLupa: boolean = !localStorage.getItem('tour') ? true : false;
  constructor(
    private http: HttpClient,
    public modal: MatDialog,
    private toastsService: AngularBootstrapToastsService,
    
  ) {

    
  }

  public handleError(error: HttpErrorResponse) {
    let sMensajeError = '';
    console.log(this, error);
    if (error.status == 404) {
      sMensajeError = 'El servicio al cual se intenta acceder, no existe.';
    } else {
      sMensajeError = 'Ha ocurrido un problema al obtener los datos';
    }
    this.fn_GenerarPopupGenerico('error', sMensajeError);
    throw 'Unable to handle';
  }
  public get(inUrl: string, params?: any, token?: any) {
    const httpOptions = {
      params,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };

    return this.http
      .get(this.sUrl + inUrl, httpOptions)
      .pipe(catchError(this.handleError.bind(this)))
      .toPromise();
  }

  public post(inUrl: string, params?: object, token?: string) {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    if (token) {
      httpOptions.headers.append('token', token);
    }

    return this.http
      .post(this.sUrl + inUrl, params, httpOptions)
      .pipe(catchError(this.handleError.bind(this))) // estose usa para que se pueda usar el this dentro de la funcionhandle error
      .toPromise();
  }

  public preloaderOff() {
    this.bPreloader = false;

    if (document.querySelector('#preloader')) {
      document.querySelector('#preloader')!.classList.remove('d-block');
      document.querySelector('#preloader')!.classList.add('d-none');
    }
  }

  public preloaderOn() {
    this.bPreloader = true;

    if (document.querySelector('#preloader')) {
      document.querySelector('#preloader')!.classList.remove('d-none');
      document.querySelector('#preloader')!.classList.add('d-block');
    } else {
      const d1 = document.querySelector('body');
      d1!.insertAdjacentHTML(
        'beforeend',
        `
        <div id="preloader" class="position-fixed" style="top:0px; z-index:99999999999999999999999;">
          <div class="position-fixed backdrop_preload w-100 h-100vh d-flex justify-content-center align-items-center">
            <div  class="avatar sombra animate__animated animate__heartBeat animate__infinite">
              <img class="logo_circulo" src="./assets/img/brand/logo-RevloG.png">
            </div>
            <div class="text-white texto_cargando animate__animated animate__flash animate__slower animate__infinite">Cargando...</div>
          </div>
        </div>`
      );
    }
  }

  //objetivo: se genera un popup generico para mostar mensajes tipo, "se ha insertado correctamente", " ha ocurrido un error" también puede ejecutar una accion con hacer click

  //titulo: exito | advertencia | error
  //cuerpo: cualquier mensaje ej: se ha insertado con exito
  //para que aparezcan 2 botones, se deben de poner los siguientes 3 parámetros, y se generará un botón con el texto aceptar que llamará a la función y el cerrar, cerrará el modal
  // funcion: funcion a llamar ej:  "fn_EliminarCliente" (sin paréntesis)
  // scope: objetode clase poner siempre this
  //param:  es el valor del parametro. ej:  1
  fn_GenerarPopupGenerico(
    titulo: string,
    cuerpo: string,
    funcion?: any,
    scope?: any,
    param?: any
  ) {
    let json_modal: any = {};
    json_modal.cuerpo = cuerpo;
    if (titulo.toLowerCase() == 'exito' || titulo.toLowerCase() == 'éxito') {
      json_modal.estilo = 'success';
      json_modal.titulo = 'Éxito';
    } else if (titulo.toLowerCase() == 'error') {
      json_modal.estilo = 'danger';
      json_modal.titulo = 'Error';
    } else {
      json_modal.estilo = 'warning';
      json_modal.titulo = 'Advertencia';
    }

    json_modal.component = scope;
    json_modal.funcion = funcion;
    json_modal.param = param;

    const dialogRef = this.modal.open(ModalComponent, {
      data: json_modal,
      height: '324px',
      width: '600px',
    });
  }

  //muestra un toast

  //tipo: exito | advertencia | error
  //mensaje:  puede ser cualquier cosa
  //duracion: duracion en milisegundos
  fn_GenerarToast(tipo: any, mensaje: any, duracion?: number) {
    let json_toast: any = {};
    if (tipo.toLowerCase() == 'exito' || tipo.toLowerCase() == 'éxito') {
      json_toast.title = 'Éxito';
      json_toast.iconClass = 'fas fa-check text-green';
      json_toast.titleClass = 'modal_success_bg';
    } else if (tipo.toLowerCase() == 'error') {
      json_toast.title = 'Error';
      json_toast.iconClass = 'fas fa-exclamation';
      json_toast.titleClass = 'modal_danger_bg';
    } else {
      json_toast.title = 'Advertencia';
      json_toast.iconClass = 'fa fa-exclamation-triangle';
      json_toast.titleClass = 'modal_warning_bg';
    }
    json_toast.text = mensaje;
    json_toast.duration = duracion || 3000;

    this.toastsService.showSimpleToast(json_toast);
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
