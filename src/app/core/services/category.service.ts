import { Injectable } from '@angular/core';
import { Category } from '../interfaces/Category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl= "http://localhost:4001/category"; 
  

  constructor(private httpCategory: HttpClient) { }

  getCategories() {
    return this.httpCategory.get<Category>(this.apiUrl)
  };
  
  getCategoryById(id:number){
    return this.httpCategory.get<Category>(this.apiUrl+'/'+id)
  }

  postCategory(courseCategory: Category){
    return this.httpCategory.post(this.apiUrl, courseCategory)
  }

  putCategory(courseCategory: Category, id:number){
    return this.httpCategory.put(this.apiUrl+'/'+id, courseCategory)
  }

  deleteCategory(id:number){
    return this.httpCategory.delete(this.apiUrl+'/'+id)
  }  
  getCategoriesProduct(CategoryName: string){
    return this.httpCategory.get(this.apiUrl+ "/courses/"+ CategoryName)
  }
}
