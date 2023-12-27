import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  products!: any[];
  totalGeneral!: number;
  form: FormGroup;
  mensage: string = '';
  token!: any;
  constructor(
    private carritoService: CarritoService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private loginService: LoginService,
    private alertsService : AlertsService,
  ) {
    this.form = this.formBuilder.group({
      envio: ['', Validators.required],
    });
    this.form.setValue({ envio: false });
  }
  ngOnInit(): void {
    this.carritoService.carrito.subscribe((carrito) => {
      this.products = carrito;
      if (this.products.length == 0) {
        this.router.navigateByUrl('');
      }
    });
    this.carritoService.total.subscribe((total) => {
      this.totalGeneral = total;
    });
    this.loginService.codigo.subscribe((data) => {
      this.token = data;
    });
  }
  enviar() {
    let prod = '';
    let cant = '';
    let precio = '';
    let opcion = '';
    let subtotal = '';
    let contador = 0;
    let env = "";
    this.products.forEach((element) => {
      if (contador > 0) {
       /*  prod = prod + ', ' + element.name;
        cant = cant + ', ' + element.cant;
        precio = precio + ', ' + element.price;
        opcion = opcion + ', ' + element.opcion;
        subtotal = subtotal + ', ' + element.total; */
        contador = contador + 1;
      prod = element.name;
      cant = element.cant;
      precio = element.price;
      opcion = element.opcion;
      subtotal = element.total;
        env ="<br>" + env + "<br>-------<br>" +
      'Productos: ' +
      prod +
      ',' +
      '<br>' +
      'cantidades: ' +
      cant +
      ',' +
      '<br>' +
      'Precios: ' +
      precio +
      ',' +
      '<br>' +
      'Opcionales: ' +
      opcion +
      ',' +
      '<br>' +
      'Subtotales: ' +
      subtotal +
      ',' +
      '<br>' 
      }else{
      contador = contador + 1;
      prod = element.name;
      cant = element.cant;
      precio = element.price;
      opcion = element.opcion;
      subtotal = element.total;
      env = 
      'Productos: ' +
      prod +
      ',' +
      '<br>' +
      'cantidades: ' +
      cant +
      ',' +
      '<br>' +
      'Precios: ' +
      precio +
      ',' +
      '<br>' +
      'Opcionales: ' +
      opcion +
      ',' +
      '<br>' +
      'Subtotales: ' +
      subtotal +
      ',' +
      '<br>' 
      }
    });
    /* env =
      'Productos: ' +
      prod +
      ',' +
      '<br>' +
      'cantidades: ' +
      cant +
      ',' +
      '<br>' +
      'Precios: ' +
      precio +
      ',' +
      '<br>' +
      'Opcionales: ' +
      opcion +
      ',' +
      '<br>' +
      'Subtotales: ' +
      subtotal +
      ',' +
      '<br>' +
      'Total: ' +
      this.totalGeneral +
      ',' +
      '<br>' +
      'Envio: ' +
      this.form.value.envio; */
    console.log(env);
    env = env +
    '<br>' + 
    'Total: ' +
    this.totalGeneral +
    ',' +
    '<br>' +
    'Envio: ' +
    this.form.value.envio;
    this.userService.postTicket(this.token.email, env).subscribe(
      (data)=>{
        this.alertsService.mostrarMensaje('Email enviado');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
      console.log(data)
    }, ( error)=>{
      this.alertsService.mostrarMensaje('Algo salio mal');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
      console.log(error)
    })
  }
}
