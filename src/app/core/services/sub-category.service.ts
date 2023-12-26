import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCategory } from '../interfaces/subCategory';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private apiUrl = 'https://back-ladulce.fly.dev/subcategory';
  token: any;

  constructor(
    private httpSubCategory: HttpClient,
    private loginService: LoginService,
  ) {
    this.loginService.token.subscribe(
      (token)=>{
        this.token = token        
    })
  }

  getSubCategories() {
    return this.httpSubCategory.get<SubCategory>(this.apiUrl);
  }

  getSubCategoryById(id: number) {
    return this.httpSubCategory.get<SubCategory>(this.apiUrl + '/' + id);
  }

  postSubCategory(subCategory: SubCategory) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpSubCategory.post(this.apiUrl, subCategory, { headers });
  }

  putSubCategory(subCategory: SubCategory, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpSubCategory.put(this.apiUrl + '/' + id, subCategory, {
      headers,
    });
  }

  deleteSubCategory(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpSubCategory.delete(this.apiUrl + '/' + id, { headers });
  }
}
