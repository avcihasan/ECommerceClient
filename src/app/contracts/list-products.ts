import { ListProductImage } from "./list-product-image";

export class ListProduct {
  id:string;
  name:string;
  price:number;
  quantity:number;
  sale:boolean;
  createdDate:Date;
  updatedDate:Date;
  productImageFiles?:ListProductImage[];
  imagePath:string;
}
