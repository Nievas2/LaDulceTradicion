import { Component } from '@angular/core';
import { ProductoService, Producto } from 'src/app/SERVICES/producto.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/SERVICES/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/interface/User';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  faInfoCircle = faInfoCircle;
  ListarProducto: Producto[] = [];
  verificacion:boolean= false;
  ListarUser: User[]=[];
  role:any;
  token:any;
  userData:any ={};
  
  IsAdmin:boolean =false;
  valorRole:any =localStorage.getItem('rol');
  constructor(
    private ProductoService: ProductoService,
    private router: Router,
    private userService: UserServiceService
  ) { 
    this.checkAdmin();
    this.listarProducto();

  }

  listarProducto() {
    this.ProductoService.getProductos().subscribe(
      (res) => {
      
        this.ListarProducto = <any>res;
      },
      (err) => console.log(err)
    );
  }
  eliminar(id:string) {
    this.ProductoService.deleteProducto(id).subscribe(
      (res) => {
        console.log('equipo eliminado');
        this.listarProducto();
      },
      (err) => console.log(err)
    );
  }
  editar(id:string) {
    this.router.navigate(['/editar/' + id]);
  }
  getUser(email:string){
    let role: any;
    this.userService.getUser(email).subscribe(
      (data) => {
        this.userData = data;
        
      },
      (error) => {
        console.error(error);
      }
    );
  
    
    
  }

  checkAdmin(){
    this.token = localStorage.getItem('correo');
    this.getUser(this.token);
    const roles = localStorage.getItem('rol')
    //console.log(this.role,this.ListarUser)
    if(roles ==="ADMIN"){
      this.IsAdmin = true;
      return
    }else{
      this.IsAdmin = false;
      return 
    }
  
  }
  
  validarAdmin(){
    const dar =this.userService.getUsers().subscribe(
      (data) => {
        this.userData = data;
        const a = this.userData
        const email = localStorage.getItem('correo')
        const adminUser = this.userData.find((email1: string) => email1 === email);
        console.log(adminUser)
        localStorage.setItem('rol', adminUser)
      },
      (error) => {
        console.error(error);
      }
    )
    
  }

}
