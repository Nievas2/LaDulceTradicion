import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/interfaces/Category';
import { Producto } from 'src/app/core/interfaces/producto';
import { CategoryService } from 'src/app/core/services/category.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  categories: Category[] = [];
  form: FormGroup;
  id: number;
  recursos: any = [];
  admin: boolean = false;
  course: Producto = {
    id: 0,
    name: '',
    description: '',
    image: '',
    price: 0,
    CategoryName: '',
  };
  constructor(
    private fb: FormBuilder,
    private courseService: ProductoService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private categoryService : CategoryService,
    private loginSvc: LoginService,
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
    this.course = {
      id: this.id,
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.image,
      price: this.form.value.price,
      CategoryName: this.form.value.CategoryName,
    };
    this.courseService.postProducto(this.course).subscribe(
      (data) => {
        this.router.navigate(['/admins/productos']);
      },
      (error) => {
        console.log(error);
      }
    );
}
}
