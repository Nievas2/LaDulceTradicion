import { Component } from '@angular/core';
import { Dollar } from 'src/app/core/interfaces/dollar';
import { Producto } from 'src/app/core/interfaces/producto';
import { DollarService } from 'src/app/core/services/dollar.service';
import { ProductoService } from 'src/app/core/services/producto.service';
@Component({
  selector: 'app-productos-destacados',
  templateUrl: './productos-destacados.component.html',
  styleUrls: ['./productos-destacados.component.css']
})
export class ProductosDestacadosComponent {
  productos: Producto[] = [];
  productosList: Producto[]= [];
  dollar!: Dollar;
  constructor(private productosService: ProductoService,private dollarService: DollarService,) {
    this.getProductos();
    this.getDollar();
  }

  getDollar() {
    this.dollarService.getDollar().subscribe(
      (data) => {
        this.dollar = <any>data;
      },

      (error) => {
        console.log(error);
      }
    );
  }
  getProductos() {
    this.productosService.getProductos().subscribe(
      (data) => {
        this.productosList = <any>data;
        // Utiliza el método slice para obtener los últimos tres elementos del array
        this.productos = this.productosList.slice(-3);
      }
    );
  }
  

}
