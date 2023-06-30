import {Component, OnInit} from '@angular/core';
import {UsersService} from "../service/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CargarScriptsService} from "../service/cargar-scripts.service";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.css']
})
export class ComunidadComponent implements OnInit{
  userlist: any = [];

  constructor(private userService: UsersService, private route: Router, private CargarScripts: CargarScriptsService, private api:ApiService, private activerouter: ActivatedRoute) {
    console.log('El componente se ha creado');
    CargarScripts.Carga(["perfil"]);
  }


  ngOnInit(): void {
    console.log('El componente se ha inicializado');
    this.userService.getComunidad()
      .subscribe((response: any) => this.userlist = response);
  }

  usuarioRegister(){
    this.route.navigate(["administrador"]);
  }


}
