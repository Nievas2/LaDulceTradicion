import { Component } from '@angular/core';
import { CarouselService } from 'src/app/core/services/carousel';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent {
  carousel: any;
constructor(private carouselService: CarouselService){
  this.carousel = this.carouselService.imageSources
}
}
