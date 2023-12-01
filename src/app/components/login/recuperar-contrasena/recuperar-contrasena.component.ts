import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css'],
})
export class RecuperarContrasenaComponent {
  form: FormGroup;

    email: string = '';

  constructor(private formBuilder: FormBuilder, private loginService : LoginService,) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
    });
  }
  mostrarToast() {
    // Seleccionar el elemento del Toast
    const toastEl = $('#tuToast');
  
    // Activar el Toast
    (toastEl as any).toast('show'); // Usa 'as any' para evitar errores de TypeScript
  }


  recuperar(){

    this.email = this.form.value.email,
    this.loginService.passwordRecovery(this.email).subscribe(
      (data)=>{
        console.log("correo enviado")
        this.mostrarToast()
    },(error)=>{
      console.log(error)
    }
    
    )
    try {
      /* llamada al back */

    } catch {
      /* this.toastr.error("Contraseña o email incorrectos") */

    }
  }
}
