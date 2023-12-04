import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { AlertsComponent } from '../alerts/alerts.component';
import { AlertsService } from 'src/app/core/services/alerts.service';


@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css'],
})
export class ContactanosComponent {
  form: FormGroup;
  consulta: string = '';
  isRegistered!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private alertsService: AlertsService
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
    console.log(this.consulta);
    this.alertsService.mostrarMensaje("funciona");

    // Puedes ocultar el mensaje después de un tiempo (por ejemplo, 5 segundos)
    setTimeout(() => {
      this.alertsService.ocultarMensaje();
    }, 2000);
  }
}
