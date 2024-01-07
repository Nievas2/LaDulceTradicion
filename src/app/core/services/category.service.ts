import { Injectable } from '@angular/core';
import { Category } from '../interfaces/Category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl= "https://back-ladulce.fly.dev/category"; 
  token!: string | null;
  

  constructor(private httpCategory: HttpClient,private loginService: LoginService,) { 
    this.loginService.token.subscribe(
      (token)=>{
        this.token = token        
    })
  }

  getCategories() {
    return this.httpCategory.get<Category>(this.apiUrl)
  };
  
  getCategoryById(id:number){
    return this.httpCategory.get<Category>(this.apiUrl+'/'+id)
  }

  postCategory(Category: Category){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    return this.httpCategory.post(this.apiUrl, Category,{headers})
  }

  putCategory(Category: Category, id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    return this.httpCategory.put(this.apiUrl+'/'+id, Category,{headers})
  }

  deleteCategory(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    return this.httpCategory.delete(this.apiUrl+'/'+id,{headers})
  }  
  getCategoriesProduct(CategoryName: string){
    return this.httpCategory.get(this.apiUrl+ "/product/"+ CategoryName)
  }
}
