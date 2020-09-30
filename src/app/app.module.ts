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
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatPaginatorIntlEsp } from '../traductions/matPaginatorIntl';
//import { MomentDateAdapter } from "@angular/material-moment-adapter";

import { CommonModule } from '@angular/common';
import { SwiperComponent } from '../pages/components/swiper/swiper.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'

import {MatButtonModule} from '@angular/material/button';

import {MatDialogModule} from '@angular/material/dialog';

import {MatInputModule} from '@angular/material/input';
import { SidenavComponent } from '../pages/components/sidenav/sidenav.component';
import { ToolbarComponent } from '../pages/components/toolbar/toolbar.component';
import { StepperComponent } from '../pages/components/stepper/stepper.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { RestaurarContraComponent } from '../pages/restaurar-contra/restaurar-contra.component';




@NgModule({
  declarations: [AppComponent, LoginComponent, DemoComponent, ModalComponent, SwiperComponent, SidenavComponent, ToolbarComponent, StepperComponent, PageNotFoundComponent, RestaurarContraComponent],
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
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatStepperModule
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
