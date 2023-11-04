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
        try {
          this.images = JSON.parse(data);
          if (Array.isArray(this.images)) {
            this.images.forEach((image) => {
              this.getImageSource(image);
            });
          } else {
            console.error('Los datos no son un array');
          }
        } catch (error) {
          console.error('Error al analizar los datos JSON', error);
        }
      },
      (error) => {
        console.error('Ocurrió un error al obtener los datos', error);
      });
      }
    getImageSource(name: string): void {
        this.httpCarousel.get('http://localhost:4001/carousel/images/'+ name, { responseType: 'blob' })
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