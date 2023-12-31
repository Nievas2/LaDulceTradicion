import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/interfaces/login';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginError = '';

  form: FormGroup;
  user: any = {};
  loginData: LoginData = {
    email: '',
    password: '',
  };
  mostrarContrasena: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private loginSvc: LoginService,
    private router: Router,
    private alertsService: AlertsService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.register();
  }

  ngOnInit(): void {}
  register() {
    this.form.setValue({
      email: '',
      password: '',
    });
  }

  login() {
    this.loginData = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    try {
      this.loginSvc.login(this.loginData).subscribe(
        (data) => {
          this.alertsService.mostrarMensaje('¡¡Se ha logueado con exito!!');
          setTimeout(() => {
            this.alertsService.ocultarMensaje();
            this.router.navigateByUrl('');
          }, 4000);

          this.form.reset();
        },

        (error) => {
          this.userSvc.getUserByEmail(this.loginData.email).subscribe(
            (data) => {
              this.user = data;
            },
            (error) => {}
          );
          if (this.user.active != true) {
            this.alertsService.mostrarMensaje('Su cuenta no esta activa');
            setTimeout(() => {
              this.alertsService.ocultarMensaje();
            }, 4000);
          } else {
            this.alertsService.mostrarMensaje(
              'Contraseña o email incorrectos '
            );
            setTimeout(() => {
              this.alertsService.ocultarMensaje();
            }, 4000);
          }
        }
      );
    } catch {
      this.alertsService.mostrarMensaje('Contraseña o email incorrectos');

      setTimeout(() => {
        this.alertsService.ocultarMensaje();
      }, 4000);
    }
  }
  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}
