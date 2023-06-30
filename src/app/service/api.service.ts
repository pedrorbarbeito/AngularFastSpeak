import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginI} from "../modelos/login.interface";
import {ResponseI} from "../modelos/responses/response.interface";
import {PublicacionI} from "../modelos/publicacion.Interface";
import {RegisterI} from "../modelos/register.interface";
import {ComunidadI} from "../modelos/comunidad.interface";
import {DefaultResponseI} from "../modelos/responses/defaultResponse.interface";
import {EtiquetaI} from "../modelos/etiqueta.response";
import {Observable} from 'rxjs';
import {ComentarioI} from "../modelos/responses/comentarioResponse.interface";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://127.0.0.1:8000/api"

  username: string = ''
  publicacionId: any;

  constructor(private http: HttpClient) {
    console.log('Servicio HTTP: ')
  }

  getUsers(): any {
    return this.http.get<any>(this.url + '/usuario/list');
  }

  publicacionesUsuario(): any {
    let direccion = this.url + "/publicacion/listar/usuario"
    let token = "";
    let idPerfil = "";
    let comunidad = "";

    if (localStorage.getItem('comunidad')){
      comunidad = localStorage.getItem('comunidad')!;
      const httpHeaders = new HttpHeaders({
        'comunidad': comunidad
      })
      return this.http.get(direccion, {headers: httpHeaders});
    }

    if (localStorage.getItem('idPerfil')){
      token = localStorage.getItem('token')!;
      idPerfil = localStorage.getItem('idPerfil')!;
      const httpHeaders = new HttpHeaders({
        'token': token,
        'idPerfil': idPerfil
      })
      return this.http.get(direccion, {headers: httpHeaders});
    } else {
      token = localStorage.getItem('token')!;
      const httpHeaders = new HttpHeaders({
        'token': token
      })
      return this.http.get(direccion, {headers: httpHeaders});
    }

  }

  publicacionesComunidad(): any {
    let direccion = this.url + "/publicacion/listar/comunidad"
    let comunidad = "";
    comunidad = localStorage.getItem('comunidad')!;
    const httpHeaders = new HttpHeaders({
      'comunidad': comunidad
    })
    return this.http.get(direccion, {headers: httpHeaders});
  }

  perfil(): any {
    let direccion = this.url + "/usuario/perfil"
    let token = "";
    let idPerfil = "";
    let usuarioPerfil = "";
    if (localStorage.getItem('idPerfil')){
      token = localStorage.getItem('token')!;
      idPerfil = localStorage.getItem('idPerfil')!;
      const httpHeaders = new HttpHeaders({
        'token': token,
        'idPerfil': idPerfil
      })
      return this.http.get(direccion, {headers: httpHeaders});
    } else {
      //Comprobacion para el buscador de usuario
      if (localStorage.getItem('usuarioPerfil')){
        token = localStorage.getItem('token')!;
        usuarioPerfil = localStorage.getItem('usuarioPerfil')!;
        const httpHeaders = new HttpHeaders({
          'token': token,
          'usuarioPerfil': usuarioPerfil
        })
        return this.http.get(direccion, {headers: httpHeaders});
      } else {
        token = localStorage.getItem('token')!;
        const httpHeaders = new HttpHeaders({
          'token': token
        })
        return this.http.get(direccion, {headers: httpHeaders});
      }

    }



  }

  loginUser(form: LoginI): Observable<ResponseI> {
    let direccion = this.url + "/login";
    return this.http.post<ResponseI>(direccion, form);
  }

  crearPublicacion(form: PublicacionI): Observable<ResponseI> {
    let direccion = this.url + "/publicacion/crear";
    let token = "";
    token = localStorage.getItem('token')!;
    const httpHeaders = new HttpHeaders({
      'token': token
    })
    return this.http.post<ResponseI>(direccion, form, {headers: httpHeaders});
  }

  register(form: RegisterI): Observable<ResponseI> {
    let direccion = this.url + "/usuario/save";
    return this.http.post<ResponseI>(direccion, form);
  }

  editarPerfil(token: string, datos: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': token});
    return this.http.put(this.url + '/usuario/editarPerfil', datos, {headers: headers});
  }

  // Métodos para la entidad "Comentario"
  crearComentario(form: ComentarioI): Observable<DefaultResponseI> {
    let publicacion = localStorage.getItem('publicacion')!;
    let token = localStorage.getItem('token')!;
    const httpHeaders = new HttpHeaders({
      'publicacion': publicacion,
      'token': token
    })
    return this.http.post<DefaultResponseI>(this.url + `/comentarios/crear`, form, {headers: httpHeaders});
  }

  obtenerComentarios() {
    let publicacion = localStorage.getItem('publicacion')!;
    const httpHeaders = new HttpHeaders({
      'publicacion': publicacion,
    })
    return this.http.get(this.url + "/comentario/listar/porP", {headers: httpHeaders});
  }


  deleteUsuario(id: string): Observable<DefaultResponseI> {
    let direccion = this.url + "/usuario/delete";
    let Options = {
      headers: new HttpHeaders({
        'id': id
      })
    }
    return this.http.delete<DefaultResponseI>(direccion, Options);
  }

  crearComunidad(form: ComunidadI): Observable<ResponseI> {
    let direccion = this.url + "/comunidad/crear";
    let token = "";
    token = localStorage.getItem('token')!;
    const httpHeaders = new HttpHeaders({
      'token': token
    })
    return this.http.post<ResponseI>(direccion, form, {headers: httpHeaders});
  }

  buscarComunidad(): Observable<DefaultResponseI> {
    let direccion = this.url + "/comunidad"
    let comunidad = "";
    comunidad = localStorage.getItem('comunidad')!;
    const httpHeaders = new HttpHeaders({
      'comunidad': comunidad
    })
    return this.http.get<DefaultResponseI>(direccion, {headers: httpHeaders});
  }


  votar(publicacionId: string, voto: string): Observable<any> {
    const headers = {'publicacion': publicacionId.toString(), 'voto': voto};
    return this.http.post<any>(this.url + "/publicacion/votar", null, {headers});
  }



  crearEtiqueta(form: EtiquetaI): Observable<ResponseI> {
    let direccion = this.url + "/etiqueta/crear";
    let token = "";
    token = localStorage.getItem('token')!;
    const httpHeaders = new HttpHeaders({
      'token': token
    })
    return this.http.post<ResponseI>(direccion, form, {headers: httpHeaders});
  }

  chequearFollow(): Observable<DefaultResponseI>{
    let direccion = this.url + "/follow/check";
    let token = "";
    let comunidad = "";
    let followUsuario = "";

    if (localStorage.getItem('followUsuario')){
      followUsuario = localStorage.getItem('followUsuario')!;
    } else {
      followUsuario = "null";
    }

    if (localStorage.getItem('comunidad')){
      comunidad = localStorage.getItem('comunidad')!;
    } else {
      comunidad = "null";
    }

    token = localStorage.getItem('token')!;
    const httpHeaders = new HttpHeaders({
      'token': token,
      'comunidad': comunidad,
      'followUsuario': followUsuario
    })
    return this.http.get<DefaultResponseI>(direccion,{headers: httpHeaders});
  }

  unfollow(): Observable<DefaultResponseI>{
    let direccion = this.url + "/follow/unfollow";
    let token = "";
    let followComunidad = "";
    let followUsuario = "";

    if (localStorage.getItem('followUsuario')){
      followUsuario = localStorage.getItem('followUsuario')!;
    } else {
      followUsuario = "null";
    }

    if (localStorage.getItem('followComunidad')){
      followComunidad = localStorage.getItem('followComunidad')!;
    } else {
      followComunidad = "null";
    }

    token = localStorage.getItem('token')!;
    const httpHeaders = new HttpHeaders({
      'token': token,
      'followComunidad': followComunidad,
      'followUsuario': followUsuario
    })
    return this.http.post<DefaultResponseI>(direccion, null,{headers: httpHeaders});
  }

  follow(): Observable<DefaultResponseI>{
    let direccion = this.url + "/follow/seguir";
    let token = "";
    let followComunidad = "";
    let followUsuario = "";

    if (localStorage.getItem('followUsuario')){
      followUsuario = localStorage.getItem('followUsuario')!;
    } else {
      followUsuario = "null";
    }

    if (localStorage.getItem('followComunidad')){
      followComunidad = localStorage.getItem('followComunidad')!;
    } else {
      followComunidad = "null";
    }

    token = localStorage.getItem('token')!;
    const httpHeaders = new HttpHeaders({
      'token': token,
      'followComunidad': followComunidad,
      'followUsuario': followUsuario
    })
    return this.http.post<DefaultResponseI>(direccion, null,{headers: httpHeaders});
  }


  //Sacar ID del usuario logueado
  usuarioLogueado(): Observable<DefaultResponseI>{
    let direccion= this.url + "/usuario/logueado";
    let token = localStorage.getItem('token')!;
    const httpHeaders = new HttpHeaders({
      'token': token
    });
    return this.http.get<DefaultResponseI>(direccion,{headers: httpHeaders});
  }

  seguidores(): Observable<DefaultResponseI>{
    let direccion= this.url + "/follow/seguidores";
    let comunidad = "";
    let usuarioPerfil = "";

    if (localStorage.getItem('usuarioPerfil')){
      usuarioPerfil = localStorage.getItem('usuarioPerfil')!;
    } else {
      usuarioPerfil = "null";
    }

    if (localStorage.getItem('comunidad')){
      comunidad = localStorage.getItem('comunidad')!;
    } else {
      comunidad = "null";
    }

    const httpHeaders = new HttpHeaders({
      'comunidad': comunidad,
      'usuarioPerfil': usuarioPerfil
    })
    return this.http.get<DefaultResponseI>(direccion,{headers: httpHeaders});
  }

  seguidos(): Observable<DefaultResponseI>{
    let direccion= this.url + "/follow/seguidos";
    let usuarioPerfil = "";
    let idPerfil = "";

    if (localStorage.getItem('idPerfil')){
      idPerfil = localStorage.getItem('idPerfil')!;
    } else {
      idPerfil = "null";
    }

    if (localStorage.getItem('usuarioPerfil')){
      usuarioPerfil = localStorage.getItem('usuarioPerfil')!;
    } else {
      usuarioPerfil = "null";
    }

    if (usuarioPerfil != "null" && idPerfil != "null"){
      usuarioPerfil = "null";
    }

    let token = localStorage.getItem('token')!;
    const httpHeaders = new HttpHeaders({
      'token': token,
      'usuarioPerfil': usuarioPerfil,
      'idPerfil': idPerfil
    })

    return this.http.get<DefaultResponseI>(direccion,{headers: httpHeaders});
  }

  listarEtiquetas(): Observable<DefaultResponseI>{
    let direccion = this.url + "/publicacion/listartags";
    return this.http.get<DefaultResponseI>(direccion);
  }

  listarEtiquetasPubli(): Observable<DefaultResponseI>{
    let direccion = this.url + "/tags/publicacion";
    return this.http.get<DefaultResponseI>(direccion);
  }

  deleteComment(): Observable<DefaultResponseI> {
    const direccion = this.url + '/comentario/delete';
    let eliminarComentarioID = localStorage.getItem('eliminarComentarioID')!;

    const httpHeaders = new HttpHeaders({
      'eliminarComentarioID': eliminarComentarioID
    })
    return this.http.delete<DefaultResponseI>(direccion, {headers: httpHeaders});
  }

}
