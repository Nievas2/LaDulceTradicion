import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto,ProductoService } from 'src/app/SERVICES/producto.service';
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



