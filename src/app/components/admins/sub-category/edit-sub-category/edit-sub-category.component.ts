import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/core/interfaces/subCategory';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { LoginService } from 'src/app/core/services/login.service';
import { SubCategoryService } from 'src/app/core/services/sub-category.service';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent {

  form: FormGroup;
  id: number;
  recursos: any = {};
  admin: boolean = false;
  caterory: SubCategory = {
    id: 0,
    date: '',
    Product: 0,
    price:0
  };
  constructor(
    private fb: FormBuilder,
    private categoryService: SubCategoryService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private loginSvc: LoginService,
    private alertsService: AlertsService,
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      price: ['', Validators.required],
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
    this.categoryService.getSubCategoryById(id).subscribe((data) => {
      this.recursos = <any>data;
      this.form.setValue({
        date:data.date,
        price: data.price,
      });
    });
  }

  update() {
    this.caterory = {
      id: this.id,
      date:this.form.value.date,
      price: this.form.value.price,
      Product: this.id,
    };
    this.categoryService.putSubCategory(this.caterory, this.id).subscribe(
      (data) => {
        this.alertsService.mostrarMensaje('Sub categoria Actualizada');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
        this.router.navigate(['/admins/subcategorias']);
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
