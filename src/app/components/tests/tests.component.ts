import { Component } from '@angular/core';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent {
  productos = [
    {
      id_Producto: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      precio: 100
      
    },
    {
      id_Producto: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripción del producto 2',
      precio: 200
    },
    {
      id_Producto: 3,
      nombre: 'Producto 3',
      descripcion: 'Descripción del producto 3',
      precio: 300
    },
  ]
}

