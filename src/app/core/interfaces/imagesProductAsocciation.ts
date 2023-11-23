import { ImageProduct } from "./imageProduct";

export interface ImagesProductAsocciations {
    id:number,
    ImageProductId: number,
    ProductId: number,
    ImageProduct : ImageProduct
}