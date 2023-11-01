import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/core/interfaces/producto';
import { ProductoService } from 'src/app/core/services/producto.service';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  producto : Producto={
    id:'',
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:''
  }
  constructor(private router:Router, private ProductoService:ProductoService){}

  agregar(){
    this.ProductoService.addProductos(this.producto).subscribe();
 this.router.navigate(['/productos']);
  }



}



