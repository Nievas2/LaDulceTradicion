import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/SERVICES/user-service.service';

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

  constructor(private userService: UserServiceService, private router:Router){


    this.checkToken();
    
  }

  login() {

    // Validamos que el usuario ingrese datos
    if (this.email == '' || this.password == '') {
      return console.log("error")
      
    }
  
    // Creamos el body
    const user = {
      email:this.email,
      password: this.password
    }
    console.log(user)
    this.userService.login(user).subscribe({
      next: (token) => {
        this.cerrarSesion = true;
        this.iniciarSesion = false;
        localStorage.setItem('token', token);
        localStorage.setItem('correo', this.email)
        this.getUsuarios();
        
        
      },
      error: (e: HttpErrorResponse) => {
        console.log(e)
     
      }
    })
    
    setTimeout(() => {
      location.reload();
    }, 500);
  }

logOut(){
  this.iniciarSesion= false;
  this.cerrarSesion=true
  localStorage.clear();
  location.reload();
}
//pone el cerrar o iniciar sesion
checkToken(){
  const token = localStorage.getItem("token");
  //verifico que exista un token
  //si existe el token activamos el logOut
  if(token !== null){
    this.cerrarSesion=true;
    this.iniciarSesion=false;
    return true
  }//si no existe se activa el LogIn
  else{
    this.cerrarSesion=false;
    this.iniciarSesion=true;
    return false
  }
}
getUsuarios(){
  this.token = localStorage.getItem('correo')
  const dar =this.userService.getUser(this.token).subscribe(
    (data) => {
      this.userData = data;
      const b =this.userData
      console.log(b)
      const a = this.userData[0]
      localStorage.setItem('rol', a.role)
      console.log(a.role)
    },
    (error) => {
      console.error(error);
    }
  )
}
getUser(email:string){
  let role: any;
  this.userService.getUser(email).subscribe(
    (data) => {
      this.userData = data;
      
    },
    (error) => {
      console.error(error);
    }
  );

  
}
/*
validarAdmin(){
  const dar =this.userService.getUsers().subscribe(
    (data) => {
      this.userData = data;
      const a = this.userData
      const email = localStorage.getItem('correo')
      const adminUser = this.userData.find((email1: string) => email1 === email);
      console.log(adminUser)
      localStorage.setItem('rol', adminUser)
    },
    (error) => {
      console.error(error);
    }
  )
  
}*/



}
