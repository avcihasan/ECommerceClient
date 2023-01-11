import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { ListProductsComponent } from './list-products/list-products.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }


  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple)
  }
  @ViewChild(ListProductsComponent) listProductComponent:ListProductsComponent
createdProduct(createdProduct:CreateProduct){
  this.listProductComponent.getProducts();

}



}
