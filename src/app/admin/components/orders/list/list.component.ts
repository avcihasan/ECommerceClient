import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { OrderService } from '../../../../services/common/models/order.service';
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  AlertifyService,
} from 'src/app/services/admin/alertify.service';
import { ListOrder } from 'src/app/contracts/order/list-order';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'orderCode',
    'userName',
    'totalPrice',
    'createdDate',
    'completed',
    'viewdetail',
    'delete',
  ];
  dataSource: MatTableDataSource<ListOrder> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders() {
    this.showSpinner(SpinnerType.Cog);

    const allOrders: { totalOrderCount: number; orders: ListOrder[] } =
      await this.orderService.getAllOrders(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.Cog),
        (errorMessage: any) =>
          this.alertifyService.message(errorMessage.message, {
            dismissothers: true,
            messageType: AlertifyMessageType.Error,
            messagePosition: AlertifyMessagePosition.TopRight,
          })
      );
    this.dataSource = new MatTableDataSource<ListOrder>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;
  }

  async pageChanged() {
    await this.getOrders();
  }

  async ngOnInit() {
    await this.getOrders();
  }

  showDetail(id: string) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id,
      options: {
        width: '750px',
      },
    });
  }
}
