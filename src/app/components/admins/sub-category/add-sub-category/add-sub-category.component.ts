import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubCategory } from 'src/app/core/interfaces/subCategory';
import { SubCategoryService } from 'src/app/core/services/sub-category.service';
@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent {

  miFormulario: FormGroup;
  subCategory! : SubCategory;
  id: number;
  newId: any;
  /* analiza si esta en !=0 true (para mostrar el input)
  si es == 0 false    */
  disable: boolean = false;
  constructor(private fb: FormBuilder,
    private aRouter: ActivatedRoute, private subCategoryService: SubCategoryService) {
    this.miFormulario = this.fb.group({
      datos: this.fb.array([this.crearFormGroup()])
    });
    
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    if(this.id == 0){
      this.disable = true
    }
  }

  ngOnInit() {

  }

  get datos() {
    return this.miFormulario.get('datos') as FormArray;
  }

  agregarInput() {
    this.datos.push(this.crearFormGroup());
  }

  eliminarInput(index: number) {
    this.datos.removeAt(index);
  }

  enviarDatos() {
    const datosFormArray = this.miFormulario.get('datos') as FormArray;
    
    datosFormArray.controls.forEach((control) => {      
      if(this.disable){
        this.newId = control.get("Product")?.value
      }else{
        this.newId = this.id
      }
      this.subCategory={
        id:0,
        date: control.get("date")?.value,
        price: control.get("price")?.value,
        Product:this.newId
      }
      // Realiza la llamada al backend utilizando tu servicio
      this.subCategoryService.postSubCategory(this.subCategory).subscribe(
        (respuesta) => {
          console.log('Datos enviados con éxito:', respuesta);
        },
        (error) => {
          console.error('Error al enviar datos:', error);
        }
      );
    });
  }

  private crearFormGroup() {
    return this.fb.group({
      date: [''],
      price: [''],
      Product: ['']
    });
  }
}

