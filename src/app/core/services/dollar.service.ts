import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DollarService {
  private apiUrl= "http://localhost:4001/dollar"; 
  token!: string | null;
  constructor(private httpDollar: HttpClient,private loginService: LoginService,) {
    this.loginService.token.subscribe(
      (token)=>{
        this.token = token        
    })
   }
   putCategory(price:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    return this.httpDollar.put(this.apiUrl + '/update',price,{headers})
  }
  getDollar(){
    return this.httpDollar.get(this.apiUrl)
  }
}
