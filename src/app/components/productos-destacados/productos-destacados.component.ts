import { Component } from '@angular/core';
import { Producto } from 'src/app/core/interfaces/producto';
import { ProductoService } from 'src/app/core/services/producto.service';
@Component({
  selector: 'app-productos-destacados',
  templateUrl: './productos-destacados.component.html',
  styleUrls: ['./productos-destacados.component.css']
})
export class ProductosDestacadosComponent {
  productos: Producto[] = [];
  productosList: Producto[]= [];
  constructor(private productosService: ProductoService) {
    this.getProductos()
  }
/*   getProductos(){
    this.productosService.getProductos().subscribe(
      (data) => {
      this.productosList = <any>data;
      this.productos = this.productosList.filter((productos) => this.productosList.indexOf(productos) < 3);
      }
    )
  } */
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
