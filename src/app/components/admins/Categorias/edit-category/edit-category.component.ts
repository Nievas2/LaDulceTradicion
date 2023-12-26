import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/interfaces/Category';

import { Producto } from 'src/app/core/interfaces/producto';
import { AlertsService } from 'src/app/core/services/alerts.service';
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
    image:'',
    Products: [this.producto],
  };
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private loginSvc: LoginService,
    private alertsService: AlertsService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
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
    this.categoryService.getCategoryById(id).subscribe((data) => {
      this.recursos = <any>data;
      this.form.setValue({
        name: data.name,
        image:data.image
      });
    });
  }

  update() {
    this.caterory = {
      id: this.id,
      image:this.form.value.image,
      name: this.form.value.name,
      Products: [this.producto],
    };
    this.categoryService.putCategory(this.caterory, this.id).subscribe(
      (data) => {
        this.alertsService.mostrarMensaje('Categoria actualizada');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
        this.router.navigate(['/admins/categorias']);
      },
      (error) => {
        this.alertsService.mostrarMensaje('Hubo un error');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
      }
    );
  }
}
