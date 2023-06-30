import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CargarScriptsService} from "../service/cargar-scripts.service";
import {UsersService} from "../service/users.service";
import {faHeart,faHeartBroken, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {ApiService} from "../service/api.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit{

  publicacionList: any = [];
  comentariosList: any = [];

  send = faPaperPlane;

  delete = faTrash;

  usuarioList: any = [];

  search = faSearch;

  upvote = faHeart;

  downvote = faHeartBroken;

  inputValue: string = '';

  inputValueUsuario: string = '';

  tags: any = [];

  currentUserId: string | undefined;

  constructor(private userService: UsersService,private router: Router, private CargarScripts: CargarScriptsService, private api: ApiService) {
    CargarScripts.Carga(["paginaPrincipal"]);

    this.api.usuarioLogueado().subscribe(data =>{
      this.currentUserId = data.message;
    })
  }

  crearComentarioForm = new FormGroup({
    texto: new FormControl(''),
  })

  Redirect() {
    this.router.navigate(["crearPublicacion"])

  }

  Comunidad (){

    this.router.navigate(["crearComunidad"])

  }
  ngOnInit(): void {
    this.userService.getPublicaciones()
      .subscribe((response: any) => this.publicacionList = response);
    this.userService.getUsers()
      .subscribe((response: any) => this.usuarioList = response);
    this.api.listarEtiquetasPubli()
      .subscribe((response: any) => this.tags = response);
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
  onSubmit() {
    localStorage.setItem('comunidad', this.inputValue);
  }
  onSubmitUsuario() {
    localStorage.setItem('usuarioPerfil', this.inputValueUsuario);
  }

  loadInputValue() {

    localStorage.removeItem('followUsuario');
    localStorage.removeItem('usuarioPerfil');
    const savedValue = localStorage.getItem('comunidad');

    if (savedValue) {
      this.inputValue = savedValue;
    }
    this.api.buscarComunidad();

    this.router.navigate(['comunidad'])
  }

  buscarPerfil(id:string){
    localStorage.removeItem('followComunidad');
    localStorage.removeItem('comunidad');
    localStorage.setItem('idPerfil', id);
    this.api.perfil();
  }

  loadPerfil() {

    localStorage.removeItem('followComunidad');
    localStorage.removeItem('comunidad');
    const savedValue = localStorage.getItem('usuarioPerfil');
    if (savedValue) {
      this.inputValueUsuario = savedValue;
    }
    this.api.perfil();

    localStorage.removeItem('idPerfil');
    this.router.navigate(['perfil']);
  }

}
