import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/interfaces/Category';
import { CategoryService } from 'src/app/core/services/category.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent {
  categories: Category[] = [];
  id: number = 0;
  admin: boolean = false;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private loginSvc: LoginService
  ) {
    this.getCategories();
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
      (err) => console.log(err)
    );
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.id).subscribe(
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
