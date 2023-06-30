import {ApiService} from "./service/api.service";
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService],
})


export class AppComponent implements OnInit{
  title = 'AngularProyectoRS';
  userlist: any = [];

  constructor(private userService: ApiService) {
    console.log('El componente se ha creado');
  }

  ngOnInit(): void {

    console.log('El componente se ha inicializado');
    this.userService.getUsers()
      .subscribe((response: any) => this.userlist = response);
  }
}
