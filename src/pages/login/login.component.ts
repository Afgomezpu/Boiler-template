import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WEBSERVICE, URL } from '../../config/webservices';
import { ServicesProvider } from '../../providers/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showcontrasena: boolean = false;
  data: object = {};
  constructor(public formBuilder :FormBuilder,public serviceProvider: ServicesProvider) {
    console.log(URL + WEBSERVICE.LOGIN);
  }

   registerForm=this.formBuilder.group({
     Username:['',  [Validators.required]],
      Password:[
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          )
        ]
      ]
   });

   save(event: Event) {
    event.preventDefault();
    if (!this.registerForm.valid) 
      this.registerForm.markAllAsTouched();
    
  }

  checkcontrasenas(group: FormGroup) {
    // here we have the 'contrasenas' group
    let pass = group.get("contrasena").value;
    let confirmPass = group.get("repetir_contrasena").value;
    return pass === confirmPass ? null : { notSame: true };
  }

  validateAllFormFields(formGroup: FormGroup) {
    this.serviceProvider.validateAllFormFields(formGroup);
  }
  
  fn_submitFormLogin(formGroup: FormGroup) {
    if (formGroup.valid) {
      let oLogin: any = {
        correo: this.registerForm.get("Username").value,
        contrasena: this.registerForm.get("Password").value
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
  

  fn_Showcontrasena() {
    this.showcontrasena = !this.showcontrasena;
  }
  ngOnInit() {

  }
 
}
