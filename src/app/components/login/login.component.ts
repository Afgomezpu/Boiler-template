import { Component, OnInit } from '@angular/core';
import { WEBSERVICE, URL } from "../../../config/webservices";
import { ServicesProvider } from "../../../providers/services";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: object = {};
  constructor(public serviceProvider: ServicesProvider) { 
    console.log(URL + WEBSERVICE.LOGIN);
  }

  ngOnInit(): void {
    this.fn_ConsumirServicioWeb();
  }

  fn_ConsumirServicioWeb() {
    console.log(1);
    let oSendData = {
      title: "foo",
      body: "bar",
      userId: 1,
    };
    this.serviceProvider.preloaderOn();
    this.serviceProvider
      .post("posts", oSendData)
      .then((data) => {
        console.log(2);
        this.data = data;
        console.log(data);
        this.serviceProvider.preloaderOff();
      })
      .catch((err) => {
        console.log(err, "problema");
      })
      .finally(() => {
        this.serviceProvider.preloaderOff();
      });
  }

}
