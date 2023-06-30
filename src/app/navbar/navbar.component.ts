import {Component} from '@angular/core';
import {faComment, faMagnifyingGlass, faUser} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {CargarScriptsService} from "../service/cargar-scripts.service"
import {ApiService} from "../service/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

declare function toggle(): void;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  faComment = faComment;
  faUser = faUser;

  lupa = faMagnifyingGlass;

  buscadorForm = new FormGroup({
    nombre: new FormControl('', Validators.required)
  })

  public logueado = false;

  constructor(private router: Router, private CargarScripts: CargarScriptsService, private api: ApiService) {
    CargarScripts.Carga(["navbarButton"]);

    if (localStorage.getItem('token') != null) {
      this.logueado = true;
    }
  }

  cerrarSesion() {
    this.router.navigate(["logout"])
  }

  Redirect() {
    localStorage.removeItem('idPerfil')
    localStorage.removeItem('usuarioPerfil')
    this.router.navigate(["perfil"])
  }

  Chat() {
    this.router.navigate(["chat"])

  }

  Inicio() {
    this.router.navigate(["/"])
  }
}
