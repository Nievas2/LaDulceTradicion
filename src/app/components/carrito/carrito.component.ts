import { Component, OnInit } from '@angular/core';
import { Dollar } from 'src/app/core/interfaces/dollar';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { DollarService } from 'src/app/core/services/dollar.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  products: any = [];
  totalGeneral!: number;
  isRegistered!: boolean;
  dollar!: Dollar;
  constructor(private dollarService: DollarService,private carritoService : CarritoService,private loginService : LoginService) {
/*   this.getDollar() */
  }
  ngOnInit(): void {
   this.loginService.isRegistered.subscribe((data)=>{
    this.isRegistered = data
   })
    this.carritoService.carrito.subscribe((carrito) => {
      this.products = carrito
    });
    this.carritoService.total.subscribe((total)=>{
      this.totalGeneral = total
    });
    this.actualizarTotalGeneral()
  }
/*   getDollar() {
    this.dollarService.getDollar().subscribe(
      (data) => {
        this.dollar = <any>data;
      },

      (error) => {
        console.log(error);
      }
    );
  } */
  delete(id: number) {
    const indiceAEliminar = id; 
    
    //chequea que exista
    if (indiceAEliminar >= 0 && indiceAEliminar < this.products.length) {
      this.products.splice(indiceAEliminar, 1);
      localStorage.setItem('carrito', JSON.stringify(this.products));
    } else {
      console.log('Índice fuera de rango');
    }
    this.actualizarTotalGeneral();
  }
  updateSubTotal(index: number ){
    if (this.products[index].cant < 1) {
      this.products[index].cant = 1;
    }
    this.products[index].total = this.products[index].price * this.products[index].cant;
    
    this.carritoService.actualizarCarrito(this.products);
    this.actualizarTotalGeneral();
  }
  actualizarTotalGeneral() {
    let totalGeneral2 = 0
    this.products.forEach((element: { total: number; }) => {
      totalGeneral2 = totalGeneral2 + element.total
    });
    this.carritoService.actualizarTotal()
  }
}
