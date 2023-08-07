import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { UserServiceService } from 'src/app/SERVICES/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword:string='';
  constructor(private userService: UserServiceService, private router:Router){}



  
  addUser() {

    // Validamos que el usuario ingrese valores
    if (this.email == '' || this.password == '' || this.confirmPassword == '') {
      
      return console.log("faltan datos");
    }

    // Validamos que las password sean iguales
    if (this.password != this.confirmPassword) {
      
      return console.log("no son iguales las contraseñas");;
    }

    // Creamos el objeto
    const user = {
      email:this.email,
      password: this.password
    }

    this.userService.register(user).subscribe({
      next: (v) => {
    
        console.log(`El usuario fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['']);
      },
      error: (e: HttpErrorResponse) => {
        console.log("fallo")
        return console.log(e)
      }
    })
  }
}
