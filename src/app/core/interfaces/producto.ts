import { ImagesProductAsocciations } from "./imagesProductAsocciation";
import { SubCategoryProduct } from "./subCategoryProduct";

export interface Producto{
  id:number;
  name:string;
  description:string;
  price:number;
  image:string;
  CategoryName: string;
  SubCategoryProducts: [SubCategoryProduct],
  ImagesProductAsocciations: [ImagesProductAsocciations]
}
