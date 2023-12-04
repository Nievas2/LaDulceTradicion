import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css'],
})
export class RecuperarContrasenaComponent {
  form: FormGroup;

  email: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertsService: AlertsService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  recuperar() {
    (this.email = this.form.value.email),
      this.loginService.passwordRecovery(this.email).subscribe(
        (data) => {
          this.alertsService.mostrarMensaje('Correo enviado');

          setTimeout(() => {
            this.alertsService.ocultarMensaje();
          }, 2000);
          
        },
        (error) => {
          this.alertsService.mostrarMensaje('Algo fallo');

          setTimeout(() => {
            this.alertsService.ocultarMensaje();
          }, 2000);
          console.log(error);
        }
      );
  }
}
