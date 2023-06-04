import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from './services/ui/custom-toastr.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(public authService: AuthService, private toastr: CustomToastrService, private router: Router, private dynamicLoadComponentService: DynamicLoadComponentService) {
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
loadComponent() {
  this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
}
}
