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
  category: Category= {
    id: 0,
    name: "",
    image:"",
    Products: [{
      id: 0,
      name: '',
      description: '',
      image: '',
      price: 0,
      CategoryName: '',
      
      ImagesProductAsocciations: [
        {
          id: 0,
          ImageProductId: 0,
          ProductId: 0,
          ImageProduct: {
            id: 0,
            image: '',
            Product: 0,
          },
        },
      ],
      SubCategoryProducts: [
        {
          id: 0,
          SubCategoryId: 0,
          ProductId: 0,
          SubCategory: {
            date: '',
            id: 0,
            price: 0,
            Product: 0,
          },
        },
      ],
    }]
  };
  name!:any;
  productCategory : any =
    [{
      Products: [{
        id: 0,
        name: '',
        description: '',
        image: '',
        price: 0,
        CategoryName: '',
        
        ImagesProductAsocciations: [
          {
            id: 0,
            ImageProductId: 0,
            ProductId: 0,
            ImageProduct: {
              id: 0,
              image: '',
              Product: 0,
            },
          },
        ],
        SubCategoryProducts: [
          {
            id: 0,
            SubCategoryId: 0,
            ProductId: 0,
            SubCategory: {
              date: '',
              id: 0,
              price: 0,
              Product: 0,
            },
          },
        ],
      }]
    }]
  ;
  options : boolean = true ;
  categories!: any;
  dollar: any;
  dollar2!: number | null;
  constructor(
    private aRouter: ActivatedRoute,
    private categoryService: CategoryService,
    private dollarService: DollarService,
  ) {
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
    this.getCategories();
    
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
        this.category = <any>data;
        this.getProductoCategory(this.category.name);

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
  getProductoCategory(name : string){
    this.categoryService.getCategoriesProduct(name).subscribe(
      (data)=>{
        this.productCategory = data
    },
    (error)=>{
      console.log(error)
    }
    )
  }
}
