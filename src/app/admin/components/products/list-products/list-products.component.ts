import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-products';
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  AlertifyService,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
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
  ];
  dataSource: MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {

    this.showSpinner(SpinnerType.SquarejellyBox);
    const allProducts:ListProduct[]= await this.productService.getAll(

      () => {
        this.hideSpinner(SpinnerType.SquarejellyBox);
      },
      (errorMessage) => {
        this.alertify.dismiss();
        this.alertify.message(errorMessage, {
          messagePosition: AlertifyMessagePosition.BottomRight,
          messageType: AlertifyMessageType.Error,
        });
      }
    );


    this.dataSource=new MatTableDataSource<ListProduct>(allProducts)
    this.dataSource.paginator = this.paginator;
  }
}
