import {Component, OnInit} from '@angular/core';
import {
  faComment,
  faHeart,
  faHeartBroken,
  faTrash,
  faUser,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {CargarScriptsService} from "../service/cargar-scripts.service";
import {ApiService} from "../service/api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {DefaultResponseI} from "../modelos/responses/defaultResponse.interface";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  faComment = faComment;

  send = faPaperPlane;


  delete = faTrash;

  faUser = faUser;

  faUserPlus = faUserPlus;

  upvote = faHeart;

  downvote = faHeartBroken;

  usuarioList: any = [];

  publicacionList: any = [];

  comentariosList: any = [];

  follow: boolean | undefined;

  perfilLogueado: boolean | undefined;

  currentUserId: string | undefined;

  tags: any = [];

  seguidores: string | undefined;

  seguidos: string | undefined;

  constructor(private route: Router, private CargarScripts: CargarScriptsService, private api:ApiService) {
    CargarScripts.Carga(["perfil"]);

    localStorage.removeItem('followComunidad');
    localStorage.removeItem('comunidad');

    if (localStorage.getItem('token') != null) {
      this.perfilLogueado = true;
    }

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

    this.api.seguidos().subscribe(data =>{
      this.seguidos = data.message;
    })
  }

  crearComentarioForm = new FormGroup({
    texto: new FormControl(''),
  })

  ngOnInit(): void{
    console.log('El componente se ha inicializado');
    this.api.perfil()
      .subscribe((response: any) => this.usuarioList = response);

    this.api.publicacionesUsuario()
      .subscribe((response: any) => this.publicacionList = response);
    this.api.listarEtiquetasPubli()
      .subscribe((response: any) => this.tags = response);
  }

  Redirect() {
    this.route.navigate(["chat"])
  }

  editar() {
    this.route.navigate(["editarUsuario"])

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

  buscarPerfil(id:string){
    localStorage.setItem('idPerfil', id);
    this.api.perfil();
  }

  //comentarios
  comentarios(id:string){
    localStorage.setItem('publicacion', id);
    this.api.obtenerComentarios().subscribe((response: any) => this.comentariosList = response);
  }

  crearComentarios(id:string, form:any){
    localStorage.setItem('publicacion', id);
    this.api.crearComentario(form);
  }

  //Follows

  UnfollowUsuario(id:string){
    localStorage.setItem('followUsuario', id);
    this.api.unfollow().subscribe(data =>{
      let dataResponse:DefaultResponseI = data;
      if (dataResponse.message){
        console.log(dataResponse.message);
      }
    });
    window.location.reload()
  }

  FollowUsuario(id:string){
    localStorage.setItem('followUsuario', id);
    this.api.follow().subscribe(data =>{
      let dataResponse:DefaultResponseI = data;
      if (dataResponse.message){
        console.log(dataResponse.message);
      }
    });
    window.location.reload()

  }

}
