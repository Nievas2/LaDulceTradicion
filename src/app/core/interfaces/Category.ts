import { Producto } from "./producto";
export interface Category{
    id: number;
    name: string;
    image:string;
    Products: [Producto];
}