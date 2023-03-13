import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public authService: AuthService,private toastr:CustomToastrService,private router:Router) {
    authService.identityCheck();
  }

signOut(){
  localStorage.removeItem("accessToken");
  this.authService.identityCheck();
  this.router.navigate([""]);
  this.toastr.message("Çıkış Yapıldı","Çıkış işlemi başarılı",{
    messagaPosition:ToastrMessagePosition.TopRight,
    messageType:ToastrMessageType.Info
  })
}
}
