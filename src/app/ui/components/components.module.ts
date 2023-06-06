import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ProductsModule } from './products/products.module';
import { BasketsComponent } from './baskets/baskets.component';
import { BasketsModule } from './baskets/baskets.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { PasswordResetModule } from './password-reset/password-reset.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    RegisterModule,
    ProductsModule,
    UpdatePasswordModule,
    PasswordResetModule
    // LoginModule
  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
