import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageProduct } from '../interfaces/imageProduct';

@Injectable({
  providedIn: 'root'
})
export class ImageProductService {

 
  
  private apiUrl= "http://localhost:4001/imageproduct"; 
  

  constructor(private httpImageProduct: HttpClient) { }

  getSubCategories() {
    return this.httpImageProduct.get<ImageProduct>(this.apiUrl)
  };
  
  getImageProductById(id:number){
    return this.httpImageProduct.get<ImageProduct>(this.apiUrl+'/'+id)
  }

  postImageProduct(subCategory: ImageProduct){
    return this.httpImageProduct.post(this.apiUrl, subCategory)
  }

  putImageProduct(subCategory: ImageProduct, id:number){
    return this.httpImageProduct.put(this.apiUrl+'/'+id, subCategory)
  }

  deleteImageProduct(id:number){
    return this.httpImageProduct.delete(this.apiUrl+'/'+id)
  }  
}
