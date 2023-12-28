import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { BehaviorSubject } from 'rxjs';
import { Dollar } from '../interfaces/dollar';

@Injectable({
  providedIn: 'root',
})
export class DollarService {
  private apiUrl = 'https://back-ladulce.fly.dev/dollar';
  token!: string | null;
  dollar = new BehaviorSubject<number | null>(0);
  back! : Dollar
  constructor(
    private httpDollar: HttpClient,
    private loginService: LoginService
  ) {
    this.loginService.token.subscribe((token) => {
      this.token = token;
    });
    this.getDollar()

  }
  putDollar(price: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    const body = { price: price };

    return this.httpDollar.put(this.apiUrl + '/update/1', body, { headers });
  }

  getDollar() {
    
    return this.httpDollar.get(this.apiUrl).subscribe(
      (data)=>{
        this.back = <any>data
        this.dollar.next(this.back.price)
    });
    
  }
}
