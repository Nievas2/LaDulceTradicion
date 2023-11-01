import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Producto } from 'src/app/core/interfaces/producto';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent  implements OnInit{
  producto : Producto={
    id: '',
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:''
  }
  productoEdit:any ={};
  constructor(private router:Router, 
    private ProductoService:ProductoService,
    private ActivatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute){}
    ngOnInit(): void {
    const id_entrada = <string>this.ActivatedRoute.snapshot.params['id'];
    console.log('id de entrada: '+ id_entrada);
      if(id_entrada){
        this.ProductoService.getUnProducto(id_entrada).subscribe(
          (data) => {
            this.productoEdit = data;
            
          },
          (error) => {
            console.error(error);
          }
        )
      }
    }

  editar(){
    this.ProductoService.editProducto(this.producto.id,this.producto).subscribe(
      res=>{
        console.log(res);
      
    },
    err=>console.log(err)
    );
    this.router.navigate(['/productos'])
  }

}
