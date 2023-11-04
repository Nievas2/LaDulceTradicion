import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestsComponent } from './components/tests/tests.component';
import { PaginasSecundariasComponent } from './components/paginas-secundarias/paginas-secundarias.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminsComponent } from './components/admins/admins.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { ProductosAdminComponent } from './components/admins/Productos/productos.component';
import { ProductosComponent } from './components/Productos/productos.component';


const routes: Routes = [ 
  {path:'',component:HomeComponent},
  {path:'test',component:TestsComponent},
  {path:'productos', component:ProductosComponent},
  {path:'pagSec', component:PaginasSecundariasComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'admins', component:AdminsComponent},
  {path:'admins/productos', component:ProductosAdminComponent},
 /*  {path:'admins/productos/add', component:add}, */
  {path:'admins/productos/edit/:id', component:ProductosAdminComponent},
  {path:'categorias/:id', component:ProductsByCategoryComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
