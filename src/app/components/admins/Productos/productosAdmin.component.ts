import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/core/interfaces/producto';
import { LoginService } from 'src/app/core/services/login.service';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productosAdmin.component.html',
  styleUrls: ['./productosAdmin.component.css']
})
export class ProductosAdminComponent {
  productos: Producto[] = [];
  id : number= 0;
  idAdd : number = 0;
  admin: boolean = false;
  constructor(private productoService: ProductoService, private router: Router,private loginSvc: LoginService,) {
    this.getProductos();
  }
  ngOnInit(): void {
  this.loginSvc.isAdmin.subscribe(
    (isAdmin)=>{
      this.admin = isAdmin
      if(this.admin === false){
        
        this.router.navigateByUrl('');
      }
    }
  )}
  getProductos() {
    this.productoService.getProductos().subscribe(
      (res) => {
        this.productos = <any>res;
        this.idAdd = this.productos[this.productos.length - 1].id;
        this.idAdd = this.idAdd + 1

      },
      (err) => console.log(err)
    );
  }

  deleteProducto() {
    this.productoService.deleteProducto(this.id).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => console.log(err)
    );
  }
  selectId(id: number){
    this.id = id
  }
  redirectEdit(id:number){
    this.router.navigateByUrl('admins/productos/editproductos/' + id);
  }
}
