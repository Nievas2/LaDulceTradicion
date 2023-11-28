import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public carrito: Observable<any[]> = this.carritoSubject.asObservable();
  total = new BehaviorSubject<number>(0);
  
  constructor() {
    const storedCart = localStorage.getItem('carrito');
    const carrito = storedCart ? JSON.parse(storedCart) : [];
    this.total.next(0)

    this.carritoSubject.next(carrito);
  }

  agregarAlCarrito(item: any) {
    const carritoActual = this.carritoSubject.value;

    const nuevoCarrito = [...carritoActual, item];
    
    this.actualizarCarrito(nuevoCarrito);
  }

  eliminarDelCarrito(indice: number) {
    const carritoActual = this.carritoSubject.value;

    if (indice >= 0 && indice < carritoActual.length) {
      carritoActual.splice(indice, 1);

      this.actualizarCarrito(carritoActual);
    }
  }

  actualizarCarrito(carrito: any[]) {
    this.carritoSubject.next(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.actualizarTotal()
  }
  actualizarTotal(){
    this.total.next(0)
    this.carritoSubject.value.forEach(element => {
      this.total.next( element.total + this.total.getValue())
    });
  }
  
}
