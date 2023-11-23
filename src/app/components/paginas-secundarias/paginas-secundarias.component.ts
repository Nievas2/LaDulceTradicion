import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/core/interfaces/producto';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-paginas-secundarias',
  templateUrl: './paginas-secundarias.component.html',
  styleUrls: ['./paginas-secundarias.component.css'],
})
export class PaginasSecundariasComponent implements OnInit {
  id: number;
  form!: FormGroup;
  producto: Producto = {
    id: 0,
    name: '',
    description: '',
    image: '',
    price: 0,
    CategoryName: '',
    ImagesProductAsocciations: [
      {
        id: 0,
        ImageProductId: 0,
        ProductId: 0,
        ImageProduct: {
          id: 0,
          image: '',
          Product: 0,
        },
      },
    ],
    SubCategoryProducts: [
      {
        id: 0,
        SubCategoryId: 0,
        ProductId: 0,
        SubCategory: {
          date: '',
          id: 0,
          price: 0,
          Product: 0,
        },
      },
    ],
  };
  productos!: [Producto];
  productosSelect: Producto[] = [];
  options: boolean = true;
  constructor(
    private productoService: ProductoService,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      cant: ['', Validators.required],
      option: ['', this.options ? Validators.required : []],
    });
  }
  async ngOnInit() {
    await this.getProducto(); // Espera a que getProducto() se complete
    this.form = this.fb.group({
      cant: ['', Validators.required],
      option: ['', this.options ? Validators.required : []],
    });
    this.getProductos()
  }
  onSubmit() {
    if (this.form.valid) {
      // Recolecta los datos y agrégalo al array de objetos en localStorage
      const datos = {
        cant: this.form.value.cant,
        option: this.form.value.option,
      };
      console.log(datos);
      // Obtén el carrito del localStorage (asegúrate de parsear si es necesario)
      //const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      // Agrega el nuevo objeto al carrito
      //carrito.push(datos);

      // Guarda el carrito actualizado en localStorage
      //localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }
  optionsC() {
    return this.options;
  }
  async getProducto() {
    try {
      const data = await this.productoService
        .getProductoById(this.id)
        .toPromise();
      this.producto = <any>data;

      if (!this.producto.SubCategoryProducts.some(Boolean)) {
        this.options = false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  getProductos() {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = <any>data;
        this.productos.forEach((element) => {
          if (element.id !== this.id) {
            this.productosSelect.push(element);
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
