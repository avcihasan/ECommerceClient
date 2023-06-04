import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateOrder } from '../../../contracts/order/create-order';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClientService) { }

  async create(order: CreateOrder): Promise<void> {
    const observable: Observable<any> = this.http.post({
      controller: "orders"
    }, order);

    await firstValueFrom(observable);
  }
}