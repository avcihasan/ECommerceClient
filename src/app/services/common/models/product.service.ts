import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListProduct } from 'src/app/contracts/list-products';
import { GetProducts } from 'src/app/contracts/get-products';

import { HttpClientService } from '../http-client.service';

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
}
