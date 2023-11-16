import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestsComponent } from './components/tests/tests.component';
import { PaginasSecundariasComponent } from './components/paginas-secundarias/paginas-secundarias.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminsComponent } from './components/admins/admins.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { ProductosAdminComponent } from './components/admins/Productos/productosAdmin.component';
import { ProductosComponent } from './components/Productos/productos.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { EditProductsComponent } from './components/admins/Productos/edit-products/edit-products.component';
import { AddProductsComponent } from './components/admins/Productos/add-products/add-products.component';
import { CategoriaComponent } from './components/admins/Categorias/categoria.component';
import { AddCategoryComponent } from './components/admins/Categorias/add-category/add-category.component';
import { EditCategoryComponent } from './components/admins/Categorias/edit-category/edit-category.component';
import { CarouselComponent } from './components/admins/carousel/carousel.component';
import { AddCarouselComponent } from './components/admins/carousel/add-carousel/add-carousel.component';
import { CreatenewcodeComponent } from './components/validationemail/createnewcode/createnewcode.component';
import { ValidationemailComponent } from './components/validationemail/validationemail.component';
import { SubCategoryComponent } from './components/admins/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './components/admins/sub-category/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './components/admins/sub-category/edit-sub-category/edit-sub-category.component';
import { ImageProductComponent } from './components/admins/image-product/image-product.component';
import { AddImageProductComponent } from './components/admins/image-product/add-image-product/add-image-product.component';
import { EditImageProductComponent } from './components/admins/image-product/edit-image-product/edit-image-product.component';


const routes: Routes = [ 
  {path:'',component:HomeComponent},
  {path:'test',component:TestsComponent},
  {path:'productos', component:ProductosComponent},
  {path:'pagsec/:id', component:PaginasSecundariasComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'admins', component:AdminsComponent},
  {path:'contacto', component:ContactanosComponent},
  {path:"crear-codigo", component:CreatenewcodeComponent},
  {
    path: 'verificar-email/:email/:code',component:ValidationemailComponent 
  },
  /* PRODUCTOS */
  {path:'admins/productos', component:ProductosAdminComponent},
  {path:'admins/productos/addproductos/:id', component:AddProductsComponent},
  {path:'admins/productos/editproductos/:id', component:EditProductsComponent},
  /* CATEGORIAS */
  {path:'admins/categorias', component:CategoriaComponent},
  {path:'admins/categorias/addcategorias', component:AddCategoryComponent},
  {path:'admins/categorias/editcategorias/:id', component:EditCategoryComponent},
  /* SUBCATEGORIAS */
  {path:'admins/subcategorias', component:SubCategoryComponent},
  {path:'admins/subcategorias/addsubcategorias', component:AddSubCategoryComponent},
  {path:'admins/subcategorias/editsubcategorias/:id', component:EditSubCategoryComponent},
  /* IMAGEPRODUCT */
  {path:'admins/imageproduct', component:ImageProductComponent},
  {path:'admins/imageproduct/addimageproduct', component:AddImageProductComponent},
  {path:'admins/imageproduct/editimageproduct/:id', component:EditImageProductComponent},
  /* CAROUSEL */
  {path:'admins/carrusel', component:CarouselComponent},
  {path:'admins/carrusel/addcarrusel', component:AddCarouselComponent},

  {path:'categorias/:id', component:ProductsByCategoryComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
