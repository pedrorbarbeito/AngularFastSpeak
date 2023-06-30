import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";
import {DefaultResponseI} from "../modelos/responses/defaultResponse.interface";

@Component({
  selector: 'app-crear-comunidad',
  templateUrl: './crear-comunidad.component.html',
  styleUrls: ['./crear-comunidad.component.css']
})
export class CrearComunidadComponent implements OnInit {

  crearComunidadForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    banner: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private api: ApiService) {

  }


  errorStatus: boolean = false;
  successStatus: boolean = false;

  errorMsj: string = "";
  successMsj: string = "";

  crearComunidad(form: any) {
    this.api.crearComunidad(form).subscribe(data => {
      console.log(data)
      let dataResponse: DefaultResponseI = data;
      if (dataResponse.message) {

        if (this.successStatus || this.errorStatus) {
          this.successStatus = false;
          this.errorStatus = false;
        }

        if (dataResponse.message == "Comunidad creada correctamente") {
          this.successStatus = true;
          this.successMsj = dataResponse.message;
        } else {
          this.errorStatus = true;
          this.errorMsj = dataResponse.message;
        }
      }
    })
  }


  ngOnInit() {
  }

}
