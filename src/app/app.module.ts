import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//declaraciones componentes
import { LoginComponent, DemoComponent } from '../pages/index.pages';
import { ModalComponent } from '../pages/components/modal/modal.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServicesProvider } from '../providers/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* importaciones material*/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularBootstrapToastsModule } from 'angular-bootstrap-toasts';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatPaginatorIntlEsp } from '../traductions/matPaginatorIntl';
//import { MomentDateAdapter } from "@angular/material-moment-adapter";

import { CommonModule } from '@angular/common';
import { SwiperComponent } from '../pages/components/swiper/swiper.component';


import {MatButtonModule} from '@angular/material/button';

import {MatDialogModule} from '@angular/material/dialog';

import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [AppComponent, LoginComponent, DemoComponent, ModalComponent, SwiperComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularBootstrapToastsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
  ],

  providers: [
    ServicesProvider,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEsp },
    /*{
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },*/
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
