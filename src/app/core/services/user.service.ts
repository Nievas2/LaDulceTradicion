import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class UserService  {

  private apiUrl="https://back-ladulce.fly.dev/user"
  token!: string | null;

  constructor(private httpUser: HttpClient, private loginService : LoginService) { 
    this.loginService.token.subscribe(
      (token)=>{
        this.token = token        
    })
  }
  
  postTicket(email:string, mensage : string){
    const requestBody = { email,mensage }; 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    return this.httpUser.post(this.apiUrl+"/ticket",requestBody,{headers})
  }
  patchAdmins(userId:number){
    const requestBody = { userId }; 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    return this.httpUser.patch(this.apiUrl+"/admins",requestBody,{headers})
  }
  getUsers(){
   const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    
    return this.httpUser.get(this.apiUrl,{headers})
  }
  getUser(id: number){
    return this.httpUser.get(this.apiUrl+"/"+ id)
  }
  getCourseCategory(){
    return this.httpUser.get(this.apiUrl+"/category")
  }
  postUser(user: User){
    return this.httpUser.post(this.apiUrl, user);
  }
  createCode(email:string):Observable<any>{
    const requestBody = { email }; 
    return this.httpUser.post(this.apiUrl+ "/createnewcode", requestBody)
  }
  putUser(user: User, id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    const userSelected= user
    const idSelected= id
    return this.httpUser.put(this.apiUrl+'/'+idSelected, userSelected,{headers})
  }
  deleteUser(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${this.token}`
    });
    return this.httpUser.delete(this.apiUrl+'/'+id,{headers})
  }
  getUserByEmail(email:string){
    const emailSelected = email
    return this.httpUser.get(this.apiUrl+"/email/"+ emailSelected)
  }
  validateCode(email:string, code:string){
    return this.httpUser.get(this.apiUrl+"/verificar-email/"+email+"/"+code)
  }
  postContact ( mensage: string, email:string){
    const requestBody = { mensage }; 
    return this.httpUser.post(this.apiUrl+ "/contact/" + email, requestBody)
  }

}
