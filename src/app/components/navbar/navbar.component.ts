import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  email: string = '';
  password: string = '';
  ListarUser:any;
  confirmPassword:string='';
  cerrarSesion: boolean=false;
  iniciarSesion: boolean=true;
  userData:any ={};
  token:any;

  constructor(private userService: UserService, private router:Router){


    
  }

  
logOut(){
  this.iniciarSesion= false;
  this.cerrarSesion=true
  localStorage.clear();
  location.reload();
}

}
