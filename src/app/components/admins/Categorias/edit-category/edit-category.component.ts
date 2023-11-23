import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/interfaces/Category';

import { Producto } from 'src/app/core/interfaces/producto';
import { CategoryService } from 'src/app/core/services/category.service';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent {
  form: FormGroup;
  id: number;
  recursos: any = {};
  admin: boolean = false;

  producto: Producto = {
    id: 0,
    name: '',
    description: '',
    image: '',
    price: 0,
    CategoryName: '',
    ImagesProductAsocciations:[{
      id:0,
      ImageProductId: 0,
      ProductId: 0,
      ImageProduct:{
        id:0,
        image:"",
        Product:0
      }
    }],
    SubCategoryProducts:[{
      id:0,
      SubCategoryId: 0,
      ProductId: 0,
      SubCategory:{
        date:"",
        id: 0,
        price:0,
        Product:0
      }
    }]
  };
  caterory: Category = {
    id: 0,
    name: '',
    Products: [this.producto],
  };
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private loginSvc: LoginService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
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
    this.categoryService.getCategoryById(id).subscribe((data) => {
      this.recursos = <any>data;
      this.form.setValue({
        name: data.name,
      });
    });
  }

  update() {
    this.caterory = {
      id: this.id,
      name: this.form.value.name,
      Products: [this.producto],
    };
    this.categoryService.putCategory(this.caterory, this.id).subscribe(
      (data) => {
        this.router.navigate(['/admins/categorias']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
