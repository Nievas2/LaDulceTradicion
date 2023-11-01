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
import { AgregarComponent } from './components/Productos/agregar/agregar.component';
import { EditarComponent } from './components/Productos/editar/editar.component';
import { ProductosComponent } from './components/Productos/productos/productos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestsComponent } from './components/tests/tests.component';
import { PaginasSecundariasComponent } from './components/paginas-secundarias/paginas-secundarias.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductosDestacadosComponent,
    PregFrecuentesComponent,
    ContactanosComponent,
    BannersComponent,
    AgregarComponent,
    EditarComponent,
    ProductosComponent,
    TestsComponent,
    PaginasSecundariasComponent,
    RegisterComponent,
    LoginComponent
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
