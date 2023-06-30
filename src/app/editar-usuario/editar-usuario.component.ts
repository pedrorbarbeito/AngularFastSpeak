import {Component} from '@angular/core';
import {ApiService} from "../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  username: string ="";
  password: string ="";
  email: string ="";
  foto: string ="";
  descripcion: string="";

  constructor(private api: ApiService, private router: Router) { }

  editarPerfil() {
    const token = localStorage.getItem('token'); // Reemplaza con el token del usuario
    const datos = { username: this.username, password: this.password, email: this.email, foto: this.foto, descripcion: this.descripcion };
    this.api.editarPerfil(token!, datos).subscribe(
      response => {
        console.log(response); // Muestra la respuesta del servidor
      },
      error => {
        console.error(error); // Muestra el error
      }
    );
    this.router.navigate(['perfil']);
  }
}
