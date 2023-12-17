import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCategory } from '../interfaces/subCategory';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  
  private apiUrl= "https://back-ladulce.fly.dev/subcategory"; 
  

  constructor(private httpSubCategory: HttpClient) { }

  getSubCategories() {
    return this.httpSubCategory.get<SubCategory>(this.apiUrl)
  };
  
  getSubCategoryById(id:number){
    return this.httpSubCategory.get<SubCategory>(this.apiUrl+'/'+id)
  }

  postSubCategory(subCategory: SubCategory){
    return this.httpSubCategory.post(this.apiUrl, subCategory)
  }

  putSubCategory(subCategory: SubCategory, id:number){
    return this.httpSubCategory.put(this.apiUrl+'/'+id, subCategory)
  }

  deleteSubCategory(id:number){
    return this.httpSubCategory.delete(this.apiUrl+'/'+id)
  }  
}
