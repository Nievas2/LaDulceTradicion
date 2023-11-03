import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselService } from 'src/app/core/services/carousel';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  token: string | null = null;
  admin : boolean = false;
  register : boolean = false;
  image : any ={};
constructor(private loginService:LoginService, private router: Router,private carouselService: CarouselService){
/*   this.carouselService.getCarousel().subscribe((data)=>{
    console.log(data);
    this.image = <any>data
  },
  (error)=>{
    console.log(error)
  }) */
}
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
  console.log(this.carouselService.imageSources);
  
  
}
}
