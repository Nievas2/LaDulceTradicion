import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselService } from 'src/app/core/services/carousel';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  categories: any[] = [];
  name : string ="";
  admin: boolean = false;
  carousels: any[];
  constructor(
    private carouselService: CarouselService,
    private router: Router,
    private loginSvc: LoginService
  ) {
    this.carousels = this.carouselService.imageSources
  }

  ngOnInit(): void {
    this.loginSvc.isAdmin.subscribe((isAdmin) => {
      this.admin = isAdmin;
      if (this.admin === false) {
        this.router.navigateByUrl('');
      }
    });
  }

  deleteCourseCategory() {
    return this.carouselService.deleteCarousel(this.name).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => console.log(err)
    );
  }
  selectName(name: string) {
    this.name = name;
  }
}
