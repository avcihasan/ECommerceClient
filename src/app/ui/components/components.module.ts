import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ProductsModule } from './products/products.module';
import { BasketsComponent } from './baskets/baskets.component';
import { BasketsModule } from './baskets/baskets.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    RegisterModule,
    ProductsModule
    // LoginModule
  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
