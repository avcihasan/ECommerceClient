import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private http: HttpClientService) { }

  async assignRoleEndpoint(roles: string[], code: string, controller: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.http.post({
      controller: "AuthorizationEndpoints"
    }, {
      roles: roles,
      code: code,
      controller: controller
    })

    const promiseData = observable.subscribe({
      next: successCallBack,
      error: errorCallBack
    });

    await promiseData;
  }

  async getRolesToEndpoint(code: string, controller: string, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
    const observable: Observable<any> = this.http.post({
      controller: "AuthorizationEndpoints",
      action: "GetRolesToEndpoint"
    }, {
      code: code,
      controller: controller
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack)
      .catch(errorCallBack);

    return (await promiseData).roles;
  }
}