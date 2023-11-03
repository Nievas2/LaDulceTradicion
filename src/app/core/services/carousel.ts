import { Injectable } from '@angular/core';
import { Category } from '../interfaces/Category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

    private apiUrl= "http://localhost:4001/carousel/images"; 
    images: string[] = []; // Arreglo para almacenar los nombres de las imágenes
  imageSources: string[] = []; // Arreglo para almacenar las fuentes de las imágenes codificadas en base64


    constructor(private httpCarousel: HttpClient) { 
        this.getImages();
    }
  
    getImages(): void {
        this.httpCarousel.get('http://localhost:4001/carousel', { responseType: 'text' })
          .subscribe((data) => {
            // Maneja los datos como texto
            this.images = <any>data;
            this.images.forEach(imageName => {
              this.getImageSource(imageName);
            },
            (error: any)=>{
                console.log(error)
            }
            );
          })
      }
    getImageSource(name: string): void {
        this.httpCarousel.get('http://localhost:4001/carousel/images/1698938865468-mina.png', { responseType: 'blob' })
          .subscribe((blob: any) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64data = reader.result as string;
              this.imageSources.push(base64data);
            };
            reader.readAsDataURL(blob);
          });
      }
}