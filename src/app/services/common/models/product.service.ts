import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListProduct } from 'src/app/contracts/list-products';
import { GetProducts } from 'src/app/contracts/get-products';

import { HttpClientService } from '../http-client.service';
import { ListProductImage } from 'src/app/contracts/list-product-image';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClientService) {}

  create(
    product: CreateProduct,
    succesCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.http.post({ controller: 'products' }, product).subscribe(
      (result) => {
        succesCallBack();
      },
      (err: HttpErrorResponse) => {
        const _err: Array<{ key: string; value: Array<string> }> = err.error;
        let msg = '';

        _err.forEach((_errValue, _errindex) => {
          _errValue.value.forEach((value, index) => {
            msg += `${value}<br>`;
          });
        });
        errorCallBack(msg);
      }
    );
  }

  async read(
    page: number = 0,
    size: number = 9,
    succesCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<GetProducts> {
    const data: Observable<GetProducts> = this.http.get<GetProducts>({
      controller: 'products',
      queryString: `Page=${page}&Size=${size}`,
    });

    const data2: GetProducts = await lastValueFrom(data);
    await lastValueFrom(data)
      .then((d) => succesCallBack())
      .catch((err: HttpErrorResponse) => errorCallBack(err.message));

    return data2;
  }

  async delete(id: string) {
    const observable: Observable<any> = this.http.delete<any>(
      { controller: 'products'},
      id
    );

    await lastValueFrom(observable);
  }

  async getImages(id:string, succesCallBack?: () => void):Promise<ListProductImage[]>{
   const getObservable:Observable<ListProductImage[]>=this.http.get<ListProductImage[]>({
      action:"getProductImages",
      controller:"products",

    },id);

    const images:ListProductImage[]=await lastValueFrom(getObservable)
    succesCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.http.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`,
    }, id)

    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  async showCaseImage(imageId:string,productId:string,succesCallBack?:()=>void):Promise<void>{

    const changeShowCaseImageObservable=this.http.get({
      controller:"products",
      action:"ChangeShowcaseProductImage",
      queryString:`imageId=${imageId}&productId=${productId}`

    });

    await firstValueFrom(changeShowCaseImageObservable);
    succesCallBack();
  }


}
