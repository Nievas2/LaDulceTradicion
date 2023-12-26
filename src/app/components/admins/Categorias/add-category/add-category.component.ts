import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/interfaces/Category';
import { Producto } from 'src/app/core/interfaces/producto';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

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
  category : Category = {
    id: 0,
    name: "",
    image:"",
    Products: [this.producto]
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private categoryService : CategoryService,
    private loginSvc: LoginService,
    private alertsService: AlertsService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    });
    this.form.setValue({
      name: '',
      image:'',
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
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
  add() {
    this.category = {
      id: this.id,
      name: this.form.value.name,
      image:this.form.value.image,
      Products: [this.producto]
    };
    this.categoryService.postCategory(this.category).subscribe(
      (data) => {
        this.alertsService.mostrarMensaje('Categoria creada');

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
        console.log(error);
      }
    );
}
}
