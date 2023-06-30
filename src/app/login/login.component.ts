import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {ResponseI} from "../modelos/responses/response.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private  router:Router, private api:ApiService) {
  }

  errorStatus:boolean = false;
  errorMsj:string = "";

  ngOnInit(): void{
  }

  login(form:any){
    this.api.loginUser(form)
      .subscribe(data =>{
        let dataResponse:ResponseI = data;
        if (dataResponse.token){
          localStorage.setItem('token', dataResponse.token);
          this.router.navigate(['']);
        }
        if (dataResponse.message){
          this.errorStatus = true;
          this.errorMsj = dataResponse.message;
        }
      });
  }

  Redirect (){
    this.router.navigate(["register"])
  }
}
