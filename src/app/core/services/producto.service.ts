import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Producto } from "../interfaces/producto"
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url='localhost:4001/user';

  constructor(private http: HttpClient) { }


  //get producto 
  getProductos()
  {
    return this.http.get(this.url + "/producto");
  }


  //get un producto
  getUnProducto(id:string){
    return this.http.get<Producto[]>(this.url+"/producto/"+id);
  }


  //agregar producto
  addProductos(producto:Producto)
  {
    return this.http.post(this.url+"/"+ "producto",producto);
  }


  //eliminar
  deleteProducto(id:string){
    return this.http.delete(this.url+"/producto/"+id);
  }

  //modificar producto
  editProducto(id:string, producto:Producto){
    return this.http.put(this.url+"/producto/"+id, producto);
  }


}


