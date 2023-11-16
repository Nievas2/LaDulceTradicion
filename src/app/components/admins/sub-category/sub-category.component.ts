import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategory } from 'src/app/core/interfaces/subCategory';
import { LoginService } from 'src/app/core/services/login.service';
import { SubCategoryService } from 'src/app/core/services/sub-category.service';


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent {

categories: SubCategory[] = [];
id: number = 0;
admin: boolean = false;
constructor(
  private subcategoryService: SubCategoryService,
  private router: Router,
  private loginSvc: LoginService
) {
  this.getSubCategories();
}

ngOnInit(): void {
  this.loginSvc.isAdmin.subscribe((isAdmin) => {
    this.admin = isAdmin;
    if (this.admin === false) {
      this.router.navigateByUrl('');
    }
  });
}
getSubCategories() {
  this.subcategoryService.getSubCategories().subscribe(
    (res) => {
      this.categories = <any>res;
    },
    (err) => console.log(err)
  );
}

deleteSubCategory() {
  this.subcategoryService.deleteSubCategory(this.id).subscribe(
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