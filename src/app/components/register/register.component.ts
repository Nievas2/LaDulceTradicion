import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  registro: boolean = false;
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    active: true,
    admin: false,
  };
  mostrarContrasena: boolean = false;
  mostrarRepeatContrasena: boolean = false;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private alertsService: AlertsService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      repeatpassword: ['', [Validators.required,Validators.minLength(6)]],
    });
    this.register();
  }

  createUser() {
    if (this.form.value.repeatpassword == this.form.value.password) {
      this.user = {
        id: 0,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone,
        password: this.form.value.password,
        active: true,
        admin: false,
      };

      this.userService.postUser(this.user).subscribe(
        (data) => {
          this.registro = true;
        },
        (error) => {
          this.alertsService.mostrarMensaje('Usuario ya existente');

      setTimeout(() => {
        this.alertsService.ocultarMensaje();
      }, 4000);
        }
      );
    } else {
      this.alertsService.mostrarMensaje('Las contraseñas deben ser iguales');

      setTimeout(() => {
        this.alertsService.ocultarMensaje();
      }, 4000);
    }
  }

  register() {
    this.form.setValue({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      repeatpassword: '',
    });
  }
  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
  toggleMostrarRepeatContrasena() {
    this.mostrarRepeatContrasena = !this.mostrarRepeatContrasena;
  }
}
