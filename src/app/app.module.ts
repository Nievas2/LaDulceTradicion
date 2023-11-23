import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductosDestacadosComponent } from './components/productos-destacados/productos-destacados.component';
import { PregFrecuentesComponent } from './components/preg-frecuentes/preg-frecuentes.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { BannersComponent } from './components/banners/banners.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestsComponent } from './components/tests/tests.component';
import { PaginasSecundariasComponent } from './components/paginas-secundarias/paginas-secundarias.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminsComponent } from './components/admins/admins.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { CategoriaComponent } from './components/admins/Categorias/categoria.component';
import { CarouselComponent } from './components/admins/carousel/carousel.component';
import { ValidationemailComponent } from './components/validationemail/validationemail.component';
import { CreatenewcodeComponent } from './components/validationemail/createnewcode/createnewcode.component';
import { AddCarouselComponent } from './components/admins/carousel/add-carousel/add-carousel.component';
import { EditCategoryComponent } from './components/admins/Categorias/edit-category/edit-category.component';
import { ProductosComponent } from './components/Productos/productos.component';
import { EditProductsComponent } from './components/admins/Productos/edit-products/edit-products.component';
import { AddCategoryComponent } from './components/admins/Categorias/add-category/add-category.component';
import { AddProductsComponent } from './components/admins/Productos/add-products/add-products.component';
import { ProductosAdminComponent } from './components/admins/Productos/productosAdmin.component';
import { ImageProductComponent } from './components/admins/image-product/image-product.component';
import { SubCategoryComponent } from './components/admins/sub-category/sub-category.component';
import { AddImageProductComponent } from './components/admins/image-product/add-image-product/add-image-product.component';
import { EditImageProductComponent } from './components/admins/image-product/edit-image-product/edit-image-product.component';
import { AddSubCategoryComponent } from './components/admins/sub-category/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './components/admins/sub-category/edit-sub-category/edit-sub-category.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { FormAddProductComponent } from './components/carrito/form-add-product/form-add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductosDestacadosComponent,
    PregFrecuentesComponent,
    ContactanosComponent,
    BannersComponent,
    ProductosComponent,
    ProductosAdminComponent,
    TestsComponent,
    PaginasSecundariasComponent,
    RegisterComponent,
    LoginComponent,
    AdminsComponent,
    ProductsByCategoryComponent,
    CategoriaComponent,
    CarouselComponent,
    ValidationemailComponent,
    CreatenewcodeComponent,
    EditCategoryComponent,
    EditProductsComponent,
    AddCategoryComponent,
    AddCarouselComponent,
    AddProductsComponent,
    ImageProductComponent,
    SubCategoryComponent,
    AddImageProductComponent,
    EditImageProductComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent,
    CarritoComponent,
    FormAddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
