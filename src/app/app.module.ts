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
import { EditCarouselComponent } from './components/admins/carousel/edit-carousel/edit-carousel.component';
import { EditCategoryComponent } from './components/admins/Categorias/edit-category/edit-category.component';
import { ProductosComponent } from './components/Productos/productos.component';

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
    AddCarouselComponent,
    EditCarouselComponent,
    EditCategoryComponent
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
