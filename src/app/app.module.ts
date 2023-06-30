import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from '@angular/common/http';

import {RouterModule} from "@angular/router";
import { PerfilComponent } from './perfil/perfil.component';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { ChatComponent } from './chat/chat.component';
import { CrearComunidadComponent } from './crear-comunidad/crear-comunidad.component';
import { FooterComponent } from './footer/footer.component';


// CARGA DE SCRIPTS
import { CargarScriptsService } from "./service/cargar-scripts.service";
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { AdministradorComponent } from './administrador/administrador.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ComunidadComponent } from './comunidad/comunidad.component';
import { LogoutComponent } from './logout/logout.component';
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { PaginaComunidadComponent } from './pagina-comunidad/pagina-comunidad.component';
import { CrearEtiquetaComponent } from './crear-etiqueta/crear-etiqueta.component';
// FIN CARGA SCRIPTS


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    PerfilComponent,
    CrearComunidadComponent,
    CrearPublicacionComponent,
    ChatComponent,
    FooterComponent,
    PaginaPrincipalComponent,
    EditarUsuarioComponent,
    AdministradorComponent,
    LogoutComponent,
    ComunidadComponent,
    EtiquetaComponent,
    PaginaComunidadComponent,
    CrearEtiquetaComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'login', component: LoginComponent},
      {path:'navbar', component: NavbarComponent},
      {path:'register', component: RegisterComponent},
      {path:'perfil', component: PerfilComponent},
      {path:'crearPublicacion', component: CrearPublicacionComponent},
      {path:'chat', component: ChatComponent},
      {path:'crearComunidad', component: CrearComunidadComponent},
      {path:'', component: PaginaPrincipalComponent},
      {path:'editarUsuario', component: EditarUsuarioComponent},
      {path:'administrador', component: AdministradorComponent},
      {path:'listarcomunidad', component: ComunidadComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'etiqueta', component: EtiquetaComponent},
      {path: 'paginaComunidad', component:  PaginaComunidadComponent},
      {path: 'crearEtiqueta', component: CrearEtiquetaComponent},
      {path: 'comunidad', component:  PaginaComunidadComponent},

    ]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CargarScriptsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

