import {Component, OnInit} from '@angular/core';
import {UsersService} from "../service/users.service";
import {Router, ActivatedRoute} from "@angular/router";
import {CargarScriptsService} from "../service/cargar-scripts.service";
import {ApiService} from "../service/api.service";


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  userlist: any = [];

  status:string = "";

  constructor(private userService: UsersService, private router: Router, private CargarScripts: CargarScriptsService, private api: ApiService, private activerouter: ActivatedRoute) {
    console.log('El componente se ha creado');
    CargarScripts.Carga(["administrador"]);
  }


  ngOnInit(): void {
    console.log('El componente se ha inicializado');
    this.userService.getUsers()
      .subscribe((response: any) => this.userlist = response);
  }


  eliminarUsuario(id: any): void {
    this.api.deleteUsuario(id + "").subscribe(() => this.status = 'Delete successful');
  }

  usuarioRegister() {
    this.router.navigate(["listarcomunidad"]);
  }
}
