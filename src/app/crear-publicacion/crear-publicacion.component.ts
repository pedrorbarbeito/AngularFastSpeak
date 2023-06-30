import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";
import {DefaultResponseI} from "../modelos/responses/defaultResponse.interface";

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent implements OnInit{


  crearPublicacionForm = new FormGroup({
    comunidad : new FormControl(''),
    titulo : new FormControl('', Validators.required),
    texto : new FormControl('', Validators.required),
    link : new FormControl(''),
    descripcion: new FormControl(''),
    foto: new FormControl(''),
    etiqueta: new FormControl('')
  })

  tags: any = [];

  constructor(private router:Router, private api:ApiService) {
  }

  errorStatus: boolean= false;
  successStatus: boolean = false;

  errorMsj: string = "";
  successMsj: string = "";

  crearPublicacion(form:any){
    this.api.crearPublicacion(form).subscribe(data =>{
      console.log(data)
      let dataResponse:DefaultResponseI = data;
      if (dataResponse.message){

        if (this.successStatus || this.errorStatus){
          this.successStatus = false;
          this.errorStatus = false;
        }

        if (dataResponse.message == "Publicación creada correctamente"){
          this.successStatus = true;
          this.successMsj = dataResponse.message;
        } else {
          this.errorStatus = true;
          this.errorMsj = dataResponse.message;
        }

      }
    })
  }

  ngOnInit(){
    this.api.listarEtiquetas()
      .subscribe((response: any) => this.tags = response);
    console.log(this.tags)
  }

}
