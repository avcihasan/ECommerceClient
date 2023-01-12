import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create-product';
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  AlertifyService,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent extends BaseComponent implements OnInit {
  constructor(
    private prodcutService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();


  createProduct(
    name: HTMLInputElement,
    price: HTMLInputElement,
    quantity: HTMLInputElement,
    sale: MatCheckbox
  ) {
    this.showSpinner(SpinnerType.Cog);

    let product: CreateProduct = new CreateProduct();
    product.name = name.value;
    product.price = parseFloat(price.value);
    product.quantity = parseInt(quantity.value);
    product.sale = sale.checked;

    this.prodcutService.create(
      product,
      () => {
        this.hideSpinner(SpinnerType.Cog);
        this.alertify.message('Ekleme Başarılı', {
          messageType: AlertifyMessageType.Success,
          messagePosition: AlertifyMessagePosition.TopRight,
        });
        this.createdProduct.emit(product);

      },
      (errorMessage) => {
        this.hideSpinner(SpinnerType.Cog);
        this.alertify.message(errorMessage, {
          messagePosition: AlertifyMessagePosition.TopRight,
          messageType: AlertifyMessageType.Error,
          dismissothers: true,
        });

      }
    );
  }
}
