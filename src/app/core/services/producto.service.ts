import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Producto } from "../interfaces/producto"
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url='http://localhost:4001';

  constructor(private http: HttpClient) { }


  //get producto 
  getProductos()
  {
    return this.http.get(this.url + "/product");
  }


  //get un producto
  getUnProducto(id:string){
    return this.http.get<Producto[]>(this.url+"/product/"+id);
  }


  //agregar producto
  addProductos(producto:Producto)
  {
    return this.http.post(this.url+"/"+ "product",producto);
  }


  //eliminar
  deleteProducto(id:string){
    return this.http.delete(this.url+"/product/"+id);
  }

  //modificar producto
  editProducto(id:string, producto:Producto){
    return this.http.put(this.url+"/product/"+id, producto);
  }


}


