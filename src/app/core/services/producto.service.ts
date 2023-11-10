import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Producto } from "../interfaces/producto"
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url='http://localhost:4001/product';

  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get<Producto[]>(this.url)
  };
  
  getProductoById(id:number){
    return this.http.get<Producto>(this.url+'/'+id)
  }

  postProducto(course: Producto){
    return this.http.post(this.url, course)
  }

  putProducto(course: Producto, id:number){
    return this.http.put(this.url+'/'+id, course)
  }

  deleteProducto(id:number){
    return this.http.delete(this.url+'/'+id)
  }

}


