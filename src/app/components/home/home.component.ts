import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  token: string | null = null;
  admin : boolean = false;
  register : boolean = false;
constructor(private loginService:LoginService, private router: Router,){}
ngOnInit(): void {
  this.loginService.token.subscribe(
    (token) => {
      this.token = token;
    }
  )
  this.loginService.isAdmin.subscribe(
    (isAdmin)=>{
      this.admin = isAdmin
    }
  )
  this.loginService.isRegistered.subscribe(
    (isRegistered)=>{
      this.register = isRegistered
    }
  )
  
  
}
}
