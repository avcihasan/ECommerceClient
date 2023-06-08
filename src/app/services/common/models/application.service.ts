import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { Controller } from 'src/app/contracts/application-configuration/controller';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClientService) { }

  async getAuthorizeDefinitionEndpoints() {
    const observable: Observable<Controller[]> = this.http.get<Controller[]>({
      controller: "ConfigurationServices"
    });

    return await firstValueFrom(observable);
  }
}