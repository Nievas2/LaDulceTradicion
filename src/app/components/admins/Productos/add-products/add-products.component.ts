import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/interfaces/Category';
import { ImageProduct } from 'src/app/core/interfaces/imageProduct';
import { Producto } from 'src/app/core/interfaces/producto';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { SubCategoryService } from 'src/app/core/services/sub-category.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent {
  categories: Category[] = [];
  form: FormGroup;
  id: number;
  recursos: any = [];
  admin: boolean = false;
  producto: Producto = {
    id: 0,
    name: '',
    description: '',
    image: '',
    price: 0,
    CategoryName: '',
    ImagesProductAsocciations: [{
      id: 0,
      ImageProductId: 0,
      ProductId: 0,
      ImageProduct:{
        id:0,
        image:"",
        Product:0
      }
    }],
    SubCategoryProducts: [{
      id: 0,
      SubCategoryId: 0,
      ProductId: 0,
      SubCategory:{
        date:"",
        id: 0,
        price:0,
        Product:0
      }
    }],
  };
  constructor(
    private fb: FormBuilder,
    private ProductService: ProductoService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private categoryService: CategoryService,
    private loginSvc: LoginService,
    private subCategoryService: SubCategoryService,
    private alertsService: AlertsService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      CategoryName: ['', Validators.required],
    });
    this.form.setValue({
      name: '',
      description: '',
      image: '',
      price: 0,
      CategoryName: '',
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
   
    this.getCategories();

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.loginSvc.isAdmin.subscribe((isAdmin) => {
      this.admin = isAdmin;
      if (this.admin === false) {
        this.router.navigateByUrl('');
      }
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = <any>res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  add() {
    this.producto = {
      id: this.id,
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.image,
      price: this.form.value.price,
      CategoryName: this.form.value.CategoryName,
      ImagesProductAsocciations: [{
        id: 0,
        ImageProductId: 0,
        ProductId: 0,
        ImageProduct:{
          id:0,
          image:"",
          Product:0
        }
      }],
      SubCategoryProducts: [{
        id: 0,
        SubCategoryId: 0,
        ProductId: 0,
        SubCategory:{
          date:"",
          id: 0,
          price:0,
          Product:0
        }
      }],
    };
    this.ProductService.postProducto(this.producto).subscribe(
      (data) => {
        this.alertsService.mostrarMensaje('Producto creado');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
      },
      (error) => {
        this.alertsService.mostrarMensaje('Hubo un error');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
        console.log(error);
      }
    );
  }

}
