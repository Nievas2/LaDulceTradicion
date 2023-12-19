import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoService } from 'src/app/core/services/carrito.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  products!: any[];
  totalGeneral!: number;
  form: FormGroup;
  constructor(
    private carritoService: CarritoService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      envio: ['', Validators.required],
    });
    this.form.setValue({envio: false})
  }
  ngOnInit(): void {
    this.carritoService.carrito.subscribe((carrito) => {
      this.products = carrito;
    });
    this.carritoService.total.subscribe((total) => {
      this.totalGeneral = total;
    });
  }
  enviar(){
    
  }
}
