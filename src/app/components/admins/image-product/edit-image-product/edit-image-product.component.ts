import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProduct } from 'src/app/core/interfaces/imageProduct';
import { ImageProductService } from 'src/app/core/services/image-product.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-edit-image-product',
  templateUrl: './edit-image-product.component.html',
  styleUrls: ['./edit-image-product.component.css']
})
export class EditImageProductComponent {

  form: FormGroup;
  id: number;
  recursos: any = {};
  admin: boolean = false;
  caterory: ImageProduct = {
    id: 0,
    image:"",
    Product: 0,
  };
  constructor(
    private fb: FormBuilder,
    private imageProductService: ImageProductService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private loginSvc: LoginService
  ) {
    this.form = this.fb.group({
      image: ['', Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    this.getById(this.id);
  }
  ngOnInit(): void {
    this.loginSvc.isAdmin.subscribe((isAdmin) => {
      this.admin = isAdmin;
      if (this.admin === false) {
        this.router.navigateByUrl('');
      }
    });
  }
  getById(id: number) {
    this.imageProductService.getImageProductById(id).subscribe((data) => {
      this.recursos = <any>data;
      this.form.setValue({
        image: data.image,
      });
    });
  }

  update() {
    this.caterory = {
      id: this.id,
      image: this.form.value.image,
      Product: this.id,
    };
    this.imageProductService.putImageProduct(this.caterory, this.id).subscribe(
      (data) => {
        this.router.navigate(['/admins/imageproduct']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
