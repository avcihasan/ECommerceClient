import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateProductComponent } from './create-product/create-product.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { ListProductsComponent } from './list-products/list-products.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:ProductsComponent}
    ]),
    MatSidenavModule,MatFormFieldModule,MatInputModule,MatCheckboxModule,MatButtonModule,
    MatTableModule,MatPaginatorModule,
    MatToolbarModule
  ]
})
export class ProductsModule { }
