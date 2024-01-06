import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/interfaces/Category';
import { CategoryService } from 'src/app/core/services/category.service';
import { DollarService } from 'src/app/core/services/dollar.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css'],
})
export class ProductsByCategoryComponent implements OnInit {
  existProducts: boolean = true;
  id: number;
  category!: any;
  options : boolean = true ;
  categories!: any[];
  dollar: any;
  dollar2!: number | null;
  constructor(
    private aRouter: ActivatedRoute,
    private categoryService: CategoryService,
    private dollarService: DollarService,
  ) {
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
    this.getCategories();
   /*  this.getDollar(); */
  }
  ngOnInit(): void {
    this.getCategoryById();
    this.dollarService.dollar.subscribe((dolar)=>{
      this.dollar2 = dolar
    })
  }
  getCategoryById() {
    this.categoryService.getCategoryById(this.id).subscribe(
      (data) => {
        this.category = data.Products;
        if(!this.category.some(Boolean)){
          this.options = false
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }  
  getCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = <any>data;
    },
    (error)=>{
      console.log(error)
    }
    );
  }
}
