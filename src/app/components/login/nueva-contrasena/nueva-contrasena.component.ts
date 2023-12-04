import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.component.html',
  styleUrls: ['./nueva-contrasena.component.css'],
})
export class NuevaContrasenaComponent {
  form: FormGroup;
  email: string;
  code: string;
  newPassword: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertsService: AlertsService,
    private aRouter: ActivatedRoute,
    private router : Router
  ) {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      repeatpassword: ['', Validators.required],
    });
    this.code = String(aRouter.snapshot.paramMap.get('code'));

    this.email = String(aRouter.snapshot.paramMap.get('email'));
  }

  newPasswordForm() {
    if (this.form.value.password == this.form.value.repeatpassword) {
      /* llamada al back para cambiarla */

      this.newPassword = this.form.value.password;
      this.loginService
        .createPassword(this.email, this.code, this.newPassword)
        .subscribe(
          (data) => {
            this.alertsService.mostrarMensaje('Contraseña actualizada');

            setTimeout(() => {
              this.alertsService.ocultarMensaje();
              this.router.navigateByUrl('');
            }, 1000);
          },
          (error) => {
            this.alertsService.mostrarMensaje('Algo salio mal');

          setTimeout(() => {
            this.alertsService.ocultarMensaje();
          }, 2000);
            console.log(error);
          }
        );
    } else {
      console.log('son diferentes');
      this.alertsService.mostrarMensaje('Las contraseñas deben ser iguales');

          setTimeout(() => {
            this.alertsService.ocultarMensaje();
          }, 2000);
    }
  }
}
