import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleOrder } from '../../contracts/order/single-order';
import { OrderService } from '../../services/common/models/order.service';
import { BaseDialog } from '../base/base-dialog';
import { DialogService } from 'src/app/services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.css']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService) {
    super(dialogRef)
  }

  singleOrder: SingleOrder;
  orderCode:string;
  totalPrice:number;
  address:string;
  description:string;
  completed:boolean;  

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();

  async ngOnInit(): Promise<void> {
    this.spinner.show(SpinnerType.Cog);
    this.singleOrder = await this.orderService.getOrderById(this.data as string,()=>{
      this.spinner.hide(SpinnerType.Cog);
    },(err)=>{});
    this.dataSource = this.singleOrder.basketItems;
    
    this.orderCode=this.singleOrder.orderCode;
    this.totalPrice=this.singleOrder.totalPrice;
    this.address=this.singleOrder.address;
    this.description=this.singleOrder.description;
    this.completed = this.singleOrder.completed
  }


  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.Cog)
        await this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.Cog)
        this.toastrService.message("Sipariş başarıyla tamamlanmıştır! Müşteriye bilgi verilmiştir.", "Sipariş Tamamlandı!", {
          messageType: ToastrMessageType.Success,
          messagaPosition: ToastrMessagePosition.TopRight
        });
      }
    });
  }

}


export enum OrderDetailDialogState {
  Close, OrderComplete
}
