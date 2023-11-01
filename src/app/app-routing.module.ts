import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/Productos/productos/productos.component';
import { EditarComponent } from './components/Productos/editar/editar.component';
import { AgregarComponent } from './components/Productos/agregar/agregar.component';
import { TestsComponent } from './components/tests/tests.component';
import { PaginasSecundariasComponent } from './components/paginas-secundarias/paginas-secundarias.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [ 
  {path:'home',component:HomeComponent},
  {path:'test',component:TestsComponent},
  {path:'productos', component:ProductosComponent},
  {path:'editar/:id', component:EditarComponent},
  {path:'agregar', component:AgregarComponent},
  {path:'pagSec', component:PaginasSecundariasComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
