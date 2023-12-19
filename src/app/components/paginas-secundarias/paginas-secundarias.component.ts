import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dollar } from 'src/app/core/interfaces/dollar';
import { Producto } from 'src/app/core/interfaces/producto';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { DollarService } from 'src/app/core/services/dollar.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-paginas-secundarias',
  templateUrl: './paginas-secundarias.component.html',
  styleUrls: ['./paginas-secundarias.component.css'],
})
export class PaginasSecundariasComponent implements OnInit {
  id: number;
  form!: FormGroup;
  optionExist: boolean = false;
  price : number  = 0
  producto: any = {
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
  isRegistered: any;
  carrito: any[] = [];
  dollar!: Dollar;
  constructor(
    private productoService: ProductoService,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private carritoService: CarritoService,
    private alertsService: AlertsService,
    private dollarService: DollarService,
  ) {
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      cant: ['', Validators.required],
      option: ['', this.options ? Validators.required : []],
    });
    this.getDollar();
  }
  async ngOnInit() {
    this.loginService.isRegistered.subscribe((isRegistered) => {
      this.isRegistered = isRegistered;
    });
    await this.getProducto();

    this.form = this.fb.group({
      cant: ['', Validators.required],
      option: ['', this.options ? Validators.required : []],
    });
    this.getProductos();
    this.carritoService.carrito.subscribe((carrito) => {
      this.carrito = carrito;
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.producto.SubCategoryProducts.forEach((element: { SubCategory: { date: any; price: number; }; }) => {
        if(element.SubCategory.date == this.form.value.option){
          this.price = element.SubCategory.price
        }
      });
      if(this.price == 0){
        this.price = this.producto.price * this.dollar.price
      }
      // Recolecta los datos y agrégalo al array de objetos en localStorage
      const subtotal = this.price * this.form.value.cant;
      const datos = {
        id: this.producto.id,
        cant: this.form.value.cant,
        option: this.form.value.option,
        name: this.producto.name,
        image: this.producto.image,
        price: this.price,
        total: subtotal,
      };
      this.checkCarrito(datos);
      console.log(this.optionExist);
      if (!this.optionExist) {
        this.carritoService.agregarAlCarrito(datos);
        this.alertsService.mostrarMensaje('Producto agregado con exito');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
      } else {
        this.alertsService.mostrarMensaje('Producto Ya existente es necesario que tenga categorias distintas');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
      }
    }
  }
  getDollar() {
    this.dollarService.getDollar().subscribe(
      (data) => {
        this.dollar = <any>data;
      },

      (error) => {
        console.log(error);
      }
    );
  }
  checkCarrito(product: any) {
    this.optionExist = false;
    this.carrito.forEach((element) => {
      if (element.id == product.id) {
        console.log(this.producto.SubCategoryProducts);
        if (element.option == product.option) {
          this.optionExist = true;
        }
      }
    });
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
