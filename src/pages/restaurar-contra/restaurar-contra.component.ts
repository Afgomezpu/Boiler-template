import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
import { Router, ActivatedRoute } from '@angular/router';
import { WEBSERVICE, URL } from '../../config/webservices';

@Component({
  selector: 'app-restaurar-contra',
  templateUrl: './restaurar-contra.component.html',
  styleUrls: ['./restaurar-contra.component.scss'],
})
export class RestaurarContraComponent implements OnInit {
  data: object = {};
  formRestaurar: FormGroup;
  showcontrasena: boolean = false;
  constructor(
    public fb: FormBuilder,
    private ServicesProvider: ServicesProvider,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formRestaurar = fb.group(
      {
        contrasena: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
            ),
          ],
        ],
        repetir_contrasena: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
            ),
          ],
        ],
      },
      { validator: this.checkcontrasenas }
    );
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
  fn_submitformRestaurar(formGroup: FormGroup) {
    if (formGroup.valid) {
      let oRestaurar: any = {
        contrasena: this.formRestaurar.get('contrasena').value,
        token: this.activatedRoute.snapshot.params.idtoken,
      };
      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.post('posts', oRestaurar)
        .then((data) => {
          console.log(2);
          this.data = data;
          console.log(data);
          this.ServicesProvider.preloaderOff();
        })
        .catch((err) => {
          console.log(err, 'problema');
        })
        .finally(() => {
          this.ServicesProvider.preloaderOff();
        });
    } else {
      this.validateAllFormFields(formGroup);
    }
  }
  fn_Showcontrasena() {
    this.showcontrasena = !this.showcontrasena;
  }

  ngOnInit(): void {}
}
