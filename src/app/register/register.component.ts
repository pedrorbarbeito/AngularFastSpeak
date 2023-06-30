import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CargarScriptsService} from "../service/cargar-scripts.service";
import {ResponseI} from "../modelos/responses/response.interface";
import {ApiService} from "../service/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterResponseI} from "../modelos/responses/registerResponse.interface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    foto: new FormControl('',Validators.required)
  })

  constructor( private router:Router, private CargarScripts:CargarScriptsService, private api:ApiService) {
    CargarScripts.Carga(["navbarButton"]);
  }

  Redirect (){
    this.router.navigate(["login"])
  }

  error1 = "Ya hay una cuenta creada con el correo indicado";
  error2 = "No ha indicado los campos requeridos";

  errorStatus:boolean = false;
  errorMsj:string = "";

  register(form:any){
    this.api.register(form)
      .subscribe(data =>{
        let dataResponse:RegisterResponseI = data;
        if (dataResponse.message){
          console.log(dataResponse.message);
          if (dataResponse.message == this.error1 || dataResponse.message == this.error2 ){
            this.errorStatus = true;
            this.errorMsj = dataResponse.message;
          } else {
            this.router.navigate(['login'])
          }
        }
      });
  }


}
