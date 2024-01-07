import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { Producto } from 'src/app/core/interfaces/producto';
import { CategoryService } from 'src/app/core/services/category.service';
import { DollarService } from 'src/app/core/services/dollar.service';
import { Dollar } from 'src/app/core/interfaces/dollar';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  ListarProducto: Producto[] = [];
  categories!: any[];
  dollar!: Dollar;
  dollar2!: number | null;
  constructor(
    private categoryService: CategoryService,
    private ProductoService: ProductoService,
    private router: Router,
    private userService: UserService,
    private dollarService: DollarService,
  ) {
    this.listarProducto();
    this.getCategories();
    
  }
ngOnInit(): void {
 this.dollarService.dollar.subscribe((dolar)=>{
  this.dollar2 = dolar
})
}
  listarProducto() {
    this.ProductoService.getProductos().subscribe(
      (res) => {
        this.ListarProducto = <any>res;
      },
      (err) => console.log(err)
    );
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = <any>data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
