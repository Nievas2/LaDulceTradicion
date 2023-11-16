import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProduct } from 'src/app/core/interfaces/imageProduct';
import { ImageProductService } from 'src/app/core/services/image-product.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.css']
})
export class ImageProductComponent {
  miFormulario: FormGroup;

  imageProduct! : ImageProduct;
  admin!: boolean;
  id: number;
constructor( 
  private fb: FormBuilder,
  private router: Router,
  private aRouter: ActivatedRoute,
  private loginSvc: LoginService,
  private imageProductService: ImageProductService){
    this.miFormulario = this.fb.group({
      datos: this.fb.array([this.fb.control('')]),
    });
    
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }


  ngOnInit(): void {
    this.loginSvc.isAdmin.subscribe((isAdmin) => {
      this.admin = isAdmin;
      if (this.admin === false) {
        this.router.navigateByUrl('');
      }
    });
  }
  
  get datos() {
    return this.miFormulario.get('datos') as FormArray;
  }

  agregarInput() {
    this.datos.push(this.fb.control(''));
  }

  eliminarInput(index: number) {
    this.datos.removeAt(index);
  }

  enviarDatos() {
    const datosFormArray = this.miFormulario.get('datos') as FormArray;

    // Utiliza forEach para iterar sobre los datos y enviar al backend
    datosFormArray.controls.forEach((control) => {
      this.imageProduct = {
        id : 0,
        image: control.value,
        Product: this.id
      }
      // Realiza la llamada al backend utilizando tu servicio
      this.imageProductService.postImageProduct(this.imageProduct).subscribe(
        (respuesta) => {
          console.log('Datos enviados con éxito:', respuesta);
        },
        (error) => {
          console.error('Error al enviar datos:', error);
        }
      );
    });
  }
}
