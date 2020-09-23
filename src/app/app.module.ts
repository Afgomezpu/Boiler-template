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

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

/*import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
*/
@NgModule({
  declarations: [AppComponent, LoginComponent, DemoComponent, ModalComponent],
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
