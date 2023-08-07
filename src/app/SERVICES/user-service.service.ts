import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/User';
@Injectable({
  providedIn: 'root'
})

export class UserServiceService  {
  myAppUrl= "http://localhost:8090/";
  
  constructor(private http : HttpClient) { }
  
  login(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}home`, user);
  }
  register(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}user`, user);
  }
  getUser(email: string){
    return this.http.get<User>(`${this.myAppUrl}home?email=${email}`)
  }
  getUsers(){
    return this.http.get<User>(`${this.myAppUrl}user`)
  }
}
