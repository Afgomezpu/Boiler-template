import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WEBSERVICE, URL } from '../../config/webservices';
import { ServicesProvider } from '../../providers/services';
import { StepperComponent } from '../components/stepper/stepper.component';
import { MatDialog } from '@angular/material/dialog';
declare var particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  data: object = {};
  formLogin: FormGroup;
  showcontrasena: boolean = false;
  constructor(
    public fb: FormBuilder,
    private ServicesProvider: ServicesProvider,
    public Stepper: MatDialog,
    public serviceProvider: ServicesProvider
  ) {
    this.formLogin = fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: [
        '',
        [
          Validators.required,
          /* Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),*/
        ],
      ],
    });
  }

  fn_submitFormLogin(formGroup: FormGroup) {
    if (formGroup.valid) {
      let oLogin: any = {
        correo: this.formLogin.get('email').value,
        contrasena: this.formLogin.get('contrasena').value,
      };
      this.serviceProvider.preloaderOn();
      this.serviceProvider
        .post('posts', oLogin)
        .then((data) => {
          console.log(2);
          this.data = data;
          console.log(data);
          this.serviceProvider.preloaderOff();
        })
        .catch((err) => {
          console.log(err, 'problema');
        })
        .finally(() => {
          this.serviceProvider.preloaderOff();
        });
    } else {
      this.validateAllFormFields(formGroup);
    }
  }

  checkcontrasenas(group: FormGroup) {
    // here we have the 'contrasenas' group
    let pass = group.get('contrasena').value;
    let confirmPass = group.get('repetir_contrasena').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  validateAllFormFields(formGroup: FormGroup) {
    this.ServicesProvider.validateAllFormFields(formGroup);
  }

  fn_stepper() {
    const dialogRef = this.Stepper.open(StepperComponent, {
      data: { nombre: 'andres' },
    });
  }

  fn_Showcontrasena() {
    this.showcontrasena = !this.showcontrasena;
  }
  ngOnInit() {
    if (!this.serviceProvider.fn_CheckisMobile()) {
      particlesJS.load(
        'particles-js',
        '../../assets/data/particles.json',
        function () {
          console.log('callback - particles.js config loaded');
        }
      );
    }
  }
}
