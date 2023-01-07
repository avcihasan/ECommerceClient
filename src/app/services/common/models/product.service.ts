import { Injectable } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create-product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClientService) { }

  create(product:CreateProduct, succesCallBack?:any){
    this.http.post({controller:"products"},product).subscribe(result=>{
      succesCallBack();
    });
  }

}
