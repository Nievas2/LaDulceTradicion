import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProduct } from 'src/app/core/interfaces/imageProduct';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { ImageProductService } from 'src/app/core/services/image-product.service';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-add-image-product',
  templateUrl: './add-image-product.component.html',
  styleUrls: ['./add-image-product.component.css']
})
export class AddImageProductComponent {
  disable : boolean = false;
  miFormulario: FormGroup;
  newId!: number;
  imageProduct! : ImageProduct;
  admin!: boolean;
  id: number;
constructor( 
  private fb: FormBuilder,
  private router: Router,
  private aRouter: ActivatedRoute,
  private loginSvc: LoginService,
  private imageProductService: ImageProductService,
  private alertsService: AlertsService,
  ){
    this.miFormulario = this.fb.group({
      datos: this.fb.array([this.crearFormGroup()])
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    if(this.id == 0){
      this.disable = true
    }
  }


  ngOnInit(): void {
    this.loginSvc.isAdmin.subscribe((isAdmin) => {
      this.admin = isAdmin;
      if (this.admin === false) {
        this.router.navigateByUrl('');
      }
    });
  }  get datos() {
    return this.miFormulario.get('datos') as FormArray;
  }

  agregarInput() {
    this.datos.push(this.crearFormGroup());
  }

  eliminarInput(index: number) {
    this.datos.removeAt(index);
  }
  private crearFormGroup() {
    return this.fb.group({
      image: [''],
      Product: ['']
    });
  }
  enviarDatos() {
    const datosFormArray = this.miFormulario.get('datos') as FormArray;
    console.log(datosFormArray);
    

    // Utiliza forEach para iterar sobre los datos y enviar al backend
    datosFormArray.controls.forEach((control) => {

      if(this.disable){
        this.newId = control.get("Product")?.value
      }else{
        this.newId = this.id
      }
      this.imageProduct = {
        id : 0,
        image: control.get("image")?.value,
        Product: this.newId
      }
      // Realiza la llamada al backend utilizando tu servicio
      this.imageProductService.postImageProduct(this.imageProduct).subscribe(
        (respuesta) => {
          this.alertsService.mostrarMensaje('Imagen Agregada');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
        },
        (error) => {
          this.alertsService.mostrarMensaje('Hubo un error');

          setTimeout(() => {
            this.alertsService.ocultarMensaje();
          }, 4000);
        }
      );
    });
  }
}
