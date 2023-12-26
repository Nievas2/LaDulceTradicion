import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageProduct } from '../interfaces/imageProduct';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ImageProductService {
  private apiUrl = 'https://back-ladulce.fly.dev/imageproduct';
  token: any;

  constructor(
    private httpImageProduct: HttpClient,
    private loginService: LoginService
  ) {
    this.loginService.token.subscribe(
      (token)=>{
        this.token = token        
    })
  }

  getImageProducts() {
    return this.httpImageProduct.get<ImageProduct>(this.apiUrl);
  }

  getImageProductById(id: number) {
    return this.httpImageProduct.get<ImageProduct>(this.apiUrl + '/' + id);
  }

  postImageProduct(subCategory: ImageProduct) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpImageProduct.post(this.apiUrl, subCategory, { headers });
  }

  putImageProduct(subCategory: ImageProduct, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpImageProduct.put(this.apiUrl + '/' + id, subCategory, {
      headers,
    });
  }

  deleteImageProduct(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpImageProduct.delete(this.apiUrl + '/' + id, { headers });
  }
}
