import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { GetProducts } from 'src/app/contracts/get-products';
import { ListProduct } from 'src/app/contracts/list-products';
import { SelectProductImageDialogComponent, SelectProductImageState } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  AlertifyService,
} from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private dialogService:DialogService
  ) {
    super(spinner);
  }
  displayedColumns: string[] = [
    'name',
    'price',
    'quantity',
    'sale',
    'createdDate',
    'updatedDate',
    'photos',
    'update',
    'delete',
  ];
  dataSource: MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.SquarejellyBox);
    const allProducts: GetProducts = await this.productService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 9,
      () => {
        this.hideSpinner(SpinnerType.SquarejellyBox);
      },
      (errorMessage) => {
        this.hideSpinner(SpinnerType.SquarejellyBox);

        this.alertify.dismiss();
        this.alertify.message(errorMessage, {
          messagePosition: AlertifyMessagePosition.BottomRight,
          messageType: AlertifyMessageType.Error,
        });
      }
    );

    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }
  async pageChanged() {
    await this.getProducts();
  }
  async ngOnInit() {
    await this.getProducts();
  }


  addProductImage(id:string){
    this.dialogService.openDialog({
      componentType:SelectProductImageDialogComponent,
      data:id,
      options:{
        width:"1400px",

      }
    })

  }
}
