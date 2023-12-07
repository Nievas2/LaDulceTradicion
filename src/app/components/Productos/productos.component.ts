import { Component } from '@angular/core';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { Producto } from 'src/app/core/interfaces/producto';
import { CategoryService } from 'src/app/core/services/category.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  ListarProducto: Producto[] = [];
  categories!: any[];
  constructor(
    private categoryService: CategoryService,
    private ProductoService: ProductoService,
    private router: Router,
    private userService: UserService
  ) { 
    this.listarProducto();
this.getCategories()
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
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = <any>data;
    },
    (error)=>{
      console.log(error)
    }
    );
  }

}
