import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListProduct } from 'src/app/contracts/list-products';

import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClientService ) {}

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


  async getAll(succesCallBack?: () => void,errorCallBack?: (errorMessage: string) => void):Promise<ListProduct[]>{
  const data:Observable<ListProduct[]>=this.http.get<ListProduct[]>({controller:"products"});

const data2:ListProduct[]=await lastValueFrom(data);
await lastValueFrom(data).then(d=> succesCallBack()).catch((err:HttpErrorResponse)=>errorCallBack(err.message))

    return data2;
  }

}

