import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { AlertsComponent } from '../alerts/alerts.component';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css'],
})
export class ContactanosComponent {
  form: FormGroup;
  consulta: string = '';
  isRegistered!: boolean;
  token: any;
  enviado: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private alertsService: AlertsService,
    private userService : UserService,
  ) {
    this.form = this.formBuilder.group({
      consulta: ['', Validators.required],
    });

    this.contact();
  }

  ngOnInit(): void {
    this.loginService.isRegistered.subscribe((data) => {
      this.isRegistered = data;
    });
  }
  contact() {
    this.form.setValue({
      consulta: '',
    });
  }
  sendContact() {
    this.consulta = this.form.value.consulta;
    this.token = localStorage.getItem("token")
    const payload = JSON.parse(atob(this.token.split('.')[1]));
    const email  = payload.email
    this.userService.postContact(this.consulta, email ).subscribe(
      (data)=>{
        this.enviado = true
        this.alertsService.mostrarMensaje("Email enviado");

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
    },(error)=>{
      this.alertsService.mostrarMensaje("Hubo un error al enviar el email");

    setTimeout(() => {
      this.alertsService.ocultarMensaje();
    }, 4000);
    
    console.log(error)
    }
    )
  }
}
