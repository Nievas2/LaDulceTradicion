import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-createnewcode',
  templateUrl: './createnewcode.component.html',
  styleUrls: ['./createnewcode.component.css'],
})
export class CreatenewcodeComponent {
  user: any = {};
  finish: boolean = false;
  active: boolean = false;
  emailForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertsService: AlertsService,
    private formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  getUser() {
    const emailControl = this.emailForm.get('email');
    if (emailControl) {
      const email = emailControl.value;
      this.userService.getUserByEmail(email).subscribe(
        (data) => {
          this.user = data;
          console.log(this.user.active);
          
          if (this.user.active == true) {
            console.log("ya activa");
            
            this.alertsService.mostrarMensaje('¡¡Cuenta ya activa!! No requiere un código');
            this.active = true;
            setTimeout(() => {
              this.alertsService.ocultarMensaje();
            }, 5000);
          } else {
            console.log("no esta activo")
            this.createCode(email);
            this.alertsService.mostrarMensaje('¡¡email enviado!!');
            setTimeout(() => {
              this.alertsService.ocultarMensaje();
            }, 1000);
          }
        },
        (error) => {
          this.alertsService.mostrarMensaje('¡¡Hubo un error!!');
          setTimeout(() => {
            this.alertsService.ocultarMensaje();
          }, 1000);
          console.log(error);
        }
      );
    }
  }

  createCode(email: string) {
    this.userService.createCode(email).subscribe(
      (data) => {
        this.finish = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
