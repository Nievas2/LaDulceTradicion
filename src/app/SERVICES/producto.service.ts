import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url='http://localhost:8090';

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

export interface Producto{
  id:string;
  nombre?:string;
  descripcion?:string;
  precio?:string;
  imagen?:string;
}

