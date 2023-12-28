import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Dollar } from 'src/app/core/interfaces/dollar';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DollarService } from 'src/app/core/services/dollar.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-dollar',
  templateUrl: './dollar.component.html',
  styleUrls: ['./dollar.component.css'],
})
export class DollarComponent {
  admin: any;
  form : FormGroup;
  dollar! : number | null;
  constructor(
    private dollarService: DollarService,
    private loginService: LoginService,
    private router : Router,
    private fb :FormBuilder,
    private alertsService : AlertsService
  ) {
    this.form = this.fb.group({
      price: "",
    });
  /*   this.getById() */
  }

  ngOnInit(): void {
    this.loginService.isAdmin.subscribe((isAdmin) => {
      this.admin = isAdmin;
      if (this.admin === false) {
        this.router.navigateByUrl('');
      }
    });
    this.dollarService.dollar.subscribe((data)=>{
      this.dollar = data
      this.form.setValue({
        price: this.dollar,
      });
    })
  }
/*   getById() {
    this.dollarService.getDollar().subscribe((data) => {
      this.dollar = <any> data
      this.form.setValue({
        price: this.dollar.price,
      });
    });
  } */

  update() {
    const precio = this.form.value.price
    this.dollarService.putDollar(precio).subscribe(
      (data) => {
        this.alertsService.mostrarMensaje('Dollar actualizado');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
        window.location.reload();
      },
      (error) => {
        this.alertsService.mostrarMensaje('Hubo un error');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
      }
    );
  }
}
