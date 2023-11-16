import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubCategory } from 'src/app/core/interfaces/subCategory';
import { SubCategoryService } from 'src/app/core/services/sub-category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent {
  miFormulario: FormGroup;
  subCategory! : SubCategory;
  id: number;
  constructor(private fb: FormBuilder,
    private aRouter: ActivatedRoute, private subCategoryService: SubCategoryService) {
    this.miFormulario = this.fb.group({
      datos: this.fb.array([this.crearFormGroup()])
    });
    
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
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
      this.subCategory={
        id:0,
        date: control.get("date")?.value,
        price: control.get("price")?.value,
        Product:this.id
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
      price: ['']
    });
  }
}
