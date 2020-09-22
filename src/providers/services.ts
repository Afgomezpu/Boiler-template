import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";

import { URL, WEBSERVICE } from "../config/webservices";
import { throwError } from "rxjs";

@Injectable()
export class ServicesProvider {
  private sUrl: string = URL;
  bPreloader: boolean = false;

  constructor(private http: HttpClient) {}

  public handleError(error: HttpErrorResponse) {
    if (error.status == 404) {
      alert("el servicio no existe");
    } else {
      alert("el servicio tiene un problema con los datos");
    }
    return [];
  }
  public get(inUrl: string, params?: any, token?: any) {
    const httpOptions = {
      params,
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      withCredentials: true,
    };

    return this.http
      .get(this.sUrl + inUrl, httpOptions)
      .pipe(catchError(this.handleError))
      .toPromise();
  }

  public post(inUrl: string, params?: object, token?: string) {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    if (token) {
      httpOptions.headers.append("token", token);
    }

    return this.http
      .post(this.sUrl + inUrl, params, httpOptions)
      .pipe(catchError(this.handleError))
      .toPromise();
  }

  public preloaderOff() {
    this.bPreloader = false;

    if (document.querySelector("#preloader")) {
      document.querySelector("#preloader")!.classList.remove("d-block");
      document.querySelector("#preloader")!.classList.add("d-none");
    }
  }

  public preloaderOn() {
    this.bPreloader = true;

    if (document.querySelector("#preloader")) {
      document.querySelector("#preloader")!.classList.remove("d-none");
      document.querySelector("#preloader")!.classList.add("d-block");
    } else {
      const d1 = document.querySelector("body");
      d1!.insertAdjacentHTML(
        "beforeend",
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
}
