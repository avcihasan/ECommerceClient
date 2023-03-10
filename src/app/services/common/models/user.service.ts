import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

import { CreateUser } from 'src/app/contracts/users/create-user';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClientService, private toastrService:CustomToastrService) {}

  async create(user:User):Promise<CreateUser>{
   const observable:Observable<CreateUser | User> = this.http.post<CreateUser | User>({
      controller:"users"
    },user);

    return await firstValueFrom(observable) as CreateUser;
  }

  async login(userNameOrEmail:string,password:string,callBackFunction:()=>void):Promise<any>{
    const observable:Observable<any | TokenResponse> = this.http.post<any | TokenResponse>({
      controller:"users",
      action:"Login",
    },{userNameOrEmail,password})

    const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse
    if(tokenResponse){


      localStorage.setItem("accessToken",tokenResponse.token.accessToken)

      this.toastrService.message("Kullanıcı Girişi Başarılı","Giriş Başarılı",{
        messagaPosition:ToastrMessagePosition.BottomFullWidth,
        messageType:ToastrMessageType.Success
      })
    }
    callBackFunction();
  }
}
