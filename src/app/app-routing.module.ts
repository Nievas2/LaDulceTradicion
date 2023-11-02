import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/Productos/productos/productos.component';
import { EditarComponent } from './components/admins/Productos/editar/editar.component';
import { AgregarComponent } from './components/admins/Productos/agregar/agregar.component';
import { TestsComponent } from './components/tests/tests.component';
import { PaginasSecundariasComponent } from './components/paginas-secundarias/paginas-secundarias.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminsComponent } from './components/admins/admins.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';

const routes: Routes = [ 
  {path:'',component:HomeComponent},
  {path:'test',component:TestsComponent},
  {path:'productos', component:ProductosComponent},
  {path:'editar/:id', component:EditarComponent},
  {path:'agregar', component:AgregarComponent},
  {path:'pagSec', component:PaginasSecundariasComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'admins', component:AdminsComponent},
  {path:'categorias/:id', component:ProductsByCategoryComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
