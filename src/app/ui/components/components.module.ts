import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    RegisterModule
  ]
})
export class ComponentsModule { }
