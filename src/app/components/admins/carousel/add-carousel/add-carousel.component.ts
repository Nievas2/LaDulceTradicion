import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselService } from 'src/app/core/services/carousel';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-add-carousel',
  templateUrl: './add-carousel.component.html',
  styleUrls: ['./add-carousel.component.css']
})
export class AddCarouselComponent {
  admin: boolean | undefined;
  fileToUpload: File | null = null;
  image!: Blob;
constructor(private carouselService: CarouselService,
  private router: Router,private loginSvc: LoginService,
  private http: HttpClient,
  ){
}
ngOnInit(): void {
  this.loginSvc.isAdmin.subscribe(
    (isAdmin)=>{
      this.admin = isAdmin
      if(this.admin === false){
        
        this.router.navigateByUrl('');
      }
    }
  )}
postCarousel(image : Blob){
  this.carouselService.postCarousel(image).subscribe((data)=>{
    console.log(data)
  },
  (error)=>{
    console.log(error)
  })
}


handleFileInput(event: any) {
  const files = event.target.files;
  if (files && files.length > 0) {
    this.fileToUpload = files.item(0);
  }
}

uploadImage() {
  if (this.fileToUpload) {
    const formData = new FormData();
    formData.append('imagen', this.fileToUpload, this.fileToUpload.name);

    this.http.post('localhost:4001/carousel/upload', formData)
      .subscribe(
        response => {
          console.log('Imagen subida correctamente', response);
        },
        error => {
          console.error('Error al subir la imagen', error);
        }
      );
  }
}
}
