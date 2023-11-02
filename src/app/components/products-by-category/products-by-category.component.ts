import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/interfaces/Category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css'],
})
export class ProductsByCategoryComponent implements OnInit {
  existCourses: boolean = true;
  id: number;
  category!: any;
  constructor(
    private aRouter: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.getCategoryById();
  }
  getCategoryById() {
    this.categoryService.getCategoryById(this.id).subscribe(
      (data) => {
        this.category = data.Products;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
