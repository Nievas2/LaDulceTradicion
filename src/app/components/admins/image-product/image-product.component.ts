import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProduct } from 'src/app/core/interfaces/imageProduct';
import { ImageProductService } from 'src/app/core/services/image-product.service';
import { LoginService } from 'src/app/core/services/login.service';


@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.css']
})
export class ImageProductComponent {
  
  imageProducts: ImageProduct[] = [];
  id: number = 0;
  admin: boolean = false;
  constructor(
    private imageProductService: ImageProductService,
    private router: Router,
    private loginSvc: LoginService,

  ) {
    

    this.getImageProducts();
  }

  ngOnInit(): void {
    this.loginSvc.isAdmin.subscribe((isAdmin) => {
      this.admin = isAdmin;
      if (this.admin === false) {
        this.router.navigateByUrl('');
      }
    });
  }
  getImageProducts() {
    this.imageProductService.getImageProducts().subscribe(
      (res) => {
        this.imageProducts = <any>res;
      },
      (err) => console.log(err)
    );
  }

  deleteImageProduct() {
    this.imageProductService.deleteImageProduct(this.id).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => console.log(err)
    );
  }
  selectId(id: number) {
    this.id = id;
  }
}
