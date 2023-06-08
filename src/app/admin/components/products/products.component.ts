import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListProductsComponent } from './list-products/list-products.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { QrcodeReadingDialogComponent } from 'src/app/dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private dialogService: DialogService) {
    super(spinner);
  }


  ngOnInit(): void {

  }
  @ViewChild(ListProductsComponent) listProductComponent:ListProductsComponent;

createdProduct(createdProduct:CreateProduct){
 this.listProductComponent.getProducts();

}
showProductQrCodeReading() {
  this.dialogService.openDialog({
    componentType: QrcodeReadingDialogComponent,
    data: null,
    options: {
      width: "1000px"
    },
    afterClosed: () => { }
  });
}


}
