import { Component } from '@angular/core';
import { ProductoService, Producto } from 'src/app/core/services/producto.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  ListarProducto: Producto[] = [];
  verificacion:boolean= false;
  ListarUser: User[]=[];
  role:any;
  token:any;
  userData:any ={};
  
  IsAdmin:boolean =false;
  valorRole:any =localStorage.getItem('rol');
  constructor(
    private ProductoService: ProductoService,
    private router: Router,
    private userService: UserService
  ) { 
    this.listarProducto();

  }

  listarProducto() {
    this.ProductoService.getProductos().subscribe(
      (res) => {
      
        this.ListarProducto = <any>res;
      },
      (err) => console.log(err)
    );
  }
  eliminar(id:string) {
    this.ProductoService.deleteProducto(id).subscribe(
      (res) => {
        console.log('equipo eliminado');
        this.listarProducto();
      },
      (err) => console.log(err)
    );
  }
  editar(id:string) {
    this.router.navigate(['/editar/' + id]);
  }


}
