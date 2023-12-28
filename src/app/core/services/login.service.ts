import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../interfaces/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "https://back-ladulce.fly.dev"
  token = new BehaviorSubject<string | null>(null);
  isAdmin = new BehaviorSubject<boolean>(false);
  isRegistered = new BehaviorSubject<boolean>(false);
  codigo = new BehaviorSubject<object>({});
  token2 : string = ""
  constructor(private http: HttpClient) {
    this.token.next(localStorage.getItem('token'));

    if (this.token.value != null) 
    {
      const helper = new JwtHelperService();
      this.token2 = this.token.value.toString()
      const decodedToken = helper.decodeToken(this.token2);
      this.codigo.next(decodedToken)
      if (decodedToken != null && decodedToken.isAdmin == true) {
        this.isAdmin.next(true);
        this.isRegistered.next(true);
      } else {
        this.isAdmin.next(false);
        this.isRegistered.next(true);
      }
    } else {
      this.isAdmin.next(false);
      this.isRegistered.next(false);
    } 
    
  }
  login(data: LoginData): Observable<any> {
    return new Observable((observer) => {
      this.http.post<any>(this.url +"/auth", data).subscribe(
        (userData) => {
          this.token.next(userData.token);
          const helper = new JwtHelperService();
          this.token2 = this.token.value!.toString();
          const decodedToken = helper.decodeToken(this.token2);
          this.codigo.next(decodedToken);
          if (decodedToken != null && decodedToken.isAdmin == true) {
            this.isAdmin.next(true);
            this.isRegistered.next(true);
          } else {
            this.isAdmin.next(false);
            this.isRegistered.next(true);
          }
          localStorage.setItem('token', userData.token);
          observer.next(userData);
          observer.complete();
        },
        (errorData) => {
          observer.error(errorData); // Manejar el error
        }
      );
    });
  }
  passwordRecovery(email:string){
    const requestBody = { email }; 
    return this.http.post(this.url+"/user/passwordrecovery",requestBody)
  }
  createPassword(email:string, code: string, password: string){
    const requestBody = { password }; 
    return this.http.patch(this.url+"/user/newpassword/"+code + "/"+ email , requestBody )
  }
}
