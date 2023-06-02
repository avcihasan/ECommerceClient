import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { FirstValueFromConfig } from 'rxjs/internal/firstValueFrom';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import {
  CustomToastrService,
  ToastrMessagePosition,
  ToastrMessageType,
} from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private http: HttpClientService,
    private toastrService: CustomToastrService
  ) {}

  async login(
    userNameOrEmail: string,
    password: string,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.http.post<
      any | TokenResponse
    >(
      {
        controller: 'auth',
        action: 'login',
      },
      { userNameOrEmail, password }
    );
    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);

      this.toastrService.message(
        'Kullanıcı girişi başarıyla sağlanmıştır.',
        'Giriş Başarılı',
        {
          messageType: ToastrMessageType.Success,
          messagaPosition: ToastrMessagePosition.TopRight,
        }
      );
    }

    callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void):Promise<any> {
    const observable: Observable<any | TokenResponse> = this.http.post(
      { controller: 'auth', action: 'refreshTokenLogin' },
      { refreshToken: refreshToken }
    );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
    }

    callBackFunction();
  }
}
