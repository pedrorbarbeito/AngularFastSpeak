import { Component } from '@angular/core';
import {DefaultResponseI} from "../modelos/responses/defaultResponse.interface";
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-crear-etiqueta',
  templateUrl: './crear-etiqueta.component.html',
  styleUrls: ['./crear-etiqueta.component.css']
})
export class CrearEtiquetaComponent {

  crearEtiquetaForm = new FormGroup({
    nombre : new FormControl(''),
    descripcion : new FormControl(''),
  })

  constructor(private router:Router, private api:ApiService) {

  }
  errorStatus: boolean= false;
  successStatus: boolean = false;

  errorMsj: string = "";
  successMsj: string = "";

  crearEtiqueta(form:any){
    this.api.crearEtiqueta(form).subscribe(data =>{
      console.log(data)
      let dataResponse:DefaultResponseI = data;
      if (dataResponse.message){

        if (this.successStatus || this.errorStatus){
          this.successStatus = false;
          this.errorStatus = false;
        }

        if (dataResponse.message == "Etiqueta creada correctamente"){
          this.successStatus = true;
          this.successMsj = dataResponse.message;
        } else {
          this.errorStatus = true;
          this.errorMsj = dataResponse.message;
        }

      }
    })
  }

}
