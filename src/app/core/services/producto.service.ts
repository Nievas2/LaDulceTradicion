import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Producto } from "../interfaces/producto"
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url='http://localhost:4001/product';
  token!: string | null;

  constructor(private http: HttpClient,private loginService: LoginService,) { 
    this.loginService.token.subscribe(
      (token)=>{
        this.token = token        
    })
  }

  getProductos() {
    return this.http.get<Producto[]>(this.url)
  };
  
  getProductoById(id:number){
    return this.http.get<Producto>(this.url+'/'+id)
  }

  postProducto(product: Producto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url, product,{headers})
  }

  putProducto(product: Producto, id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(this.url+'/'+id, product,{headers})
  }

  deleteProducto(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(this.url+'/'+id,{headers})
  }

}


