import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/core/interfaces/producto';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-paginas-secundarias',
  templateUrl: './paginas-secundarias.component.html',
  styleUrls: ['./paginas-secundarias.component.css'],
})
export class PaginasSecundariasComponent {
  id: number;
  producto!: Producto;
  productos!: [Producto];
  productosSelect:Producto[] = [];
  constructor(
    private productoService: ProductoService,
    private aRouter: ActivatedRoute
  ) {
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    this.getProducto();
    this.getProductos();
  }
  getProducto() {
    this.productoService.getProductoById(this.id).subscribe(
      (data) => {
        this.producto = <any>data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getProductos() {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = <any>data;
        this.productos.forEach((element) => {
          if (element.id !== this.id ) {
            this.productosSelect.push(element);
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
