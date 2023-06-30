import {Component, OnInit} from '@angular/core';
import {UsersService} from "../service/users.service";
import {Router} from "@angular/router";
import {CargarScriptsService} from "../service/cargar-scripts.service";
import {faHeart, faHeartBroken, faTrash, faUsers} from "@fortawesome/free-solid-svg-icons";
import {ApiService} from "../service/api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {DefaultResponseI} from "../modelos/responses/defaultResponse.interface";

@Component({
  selector: 'app-pagina-comunidad',
  templateUrl: './pagina-comunidad.component.html',
  styleUrls: ['./pagina-comunidad.component.css']
})
export class PaginaComunidadComponent implements OnInit {

  upvote = faHeart;

  faUser = faUsers;

  seguidores: string | undefined;

  delete = faTrash;
  tags: any = [];


  send = faPaperPlane;

  usuarioList: any = [];

  downvote = faHeartBroken;

  commList: any = [];

  publicacionesList: any = [];

  comentariosList: any = [];

  currentUserId: string | undefined;
  follow: boolean | undefined;

  constructor(private userService: UsersService, private route: Router, private CargarScripts: CargarScriptsService, private api: ApiService) {
    CargarScripts.Carga(["paginaPrincipal"]);

    localStorage.removeItem('followUsuario');
    localStorage.removeItem('usuarioPerfil');

    this.api.chequearFollow().subscribe(data =>{
      let dataResponse:DefaultResponseI = data;
      if (dataResponse.message){
        console.log(dataResponse.message);
        this.follow = dataResponse.message == "No lo sigues";
      }
    });


    this.api.usuarioLogueado().subscribe(data =>{
      this.currentUserId = data.message;
    })

    this.api.seguidores().subscribe(data =>{
      this.seguidores = data.message;
    })
  }



  crearComentarioForm = new FormGroup({
    texto: new FormControl(''),
  })

  ngOnInit(): void {
    this.api.buscarComunidad()
      .subscribe((response: any) => this.commList = response);

    this.api.publicacionesComunidad()
      .subscribe((response: any) => this.publicacionesList = response);


    this.api.chequearFollow().subscribe(data =>{
      let dataResponse:DefaultResponseI = data;
      if (dataResponse.message){
        console.log(dataResponse.message);
        this.follow = dataResponse.message == "No lo sigues";
      }
      this.api.listarEtiquetasPubli()
        .subscribe((response: any) => this.tags = response);
    });

    this.userService.getUsers()
      .subscribe((response: any) => this.usuarioList = response);
  }

  Redirect() {
    this.route.navigate(["crearPublicacion"])

  }

  Comunidad() {
    this.route.navigate(["crearComunidad"])

  }

  upvotes = 0;
  downvotes = 0;

  votar(id:string, voto: string): void {
    this.api.votar(id, voto)
      .subscribe(
        respuesta => {
          if (voto === 'upvote') {
            this.upvotes++;
          } else {
            this.downvotes++;
          }
        },
        error => {
          console.log(error);
        }
      );
    window.location.reload()
  }

  //comentarios
  comentarios(id:string){
    localStorage.setItem('publicacion', id);
    this.api.obtenerComentarios().subscribe((response: any) => this.comentariosList = response);
  }

  crearComentarios(id:string, form:any){
    localStorage.setItem('publicacion', id);
    this.api.crearComentario(form).subscribe(
      response => {
        console.log(response); // Manejar la respuesta aquí
      },
      error => {
        console.log(error); // Manejar el error aquí
      }
    );
    window.location.reload()
  }

  //Follows

  UnfollowComunidad(id:string){
    localStorage.setItem('followComunidad', id);
    this.api.unfollow().subscribe(data =>{
      let dataResponse:DefaultResponseI = data;
      if (dataResponse.message){
        console.log(dataResponse.message);
      }
    });
    window.location.reload()
  }

  FollowComunidad(id:string){
    localStorage.setItem('followComunidad', id);
    this.api.follow().subscribe(data =>{
      let dataResponse:DefaultResponseI = data;
      if (dataResponse.message){
        console.log(dataResponse.message);
      }
    });
    window.location.reload()
  }

  eliminarC(id: string) {
    localStorage.setItem('eliminarComentarioID', id);
    console.log("ID del comentario a eliminar: ", id);
    this.api.deleteComment().subscribe(
      response => {
        console.log(response);
        window.location.reload();
      },
      error => {
        console.error(error);
      }
    );
  }

}
