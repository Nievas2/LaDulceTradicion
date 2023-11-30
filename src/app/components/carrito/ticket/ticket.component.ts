import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/core/services/carrito.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  products!: any[];
  totalGeneral!: number;
  constructor(private carritoService: CarritoService) {}
  ngOnInit(): void {
    this.carritoService.carrito.subscribe((carrito) => {
      this.products = carrito;
    });
    this.carritoService.total.subscribe((total) => {
      this.totalGeneral = total;
    });
  }
}
