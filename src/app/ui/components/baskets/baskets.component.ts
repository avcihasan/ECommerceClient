import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
import { CreateOrder } from 'src/app/contracts/order/create-order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class  BasketsComponent  extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService, private basketService: BasketService, private orderService: OrderService, private toastrService: CustomToastrService, private router: Router, private dialogService: DialogService) {
    super(spinner)
  }

  totalPrice:number;
  basketItems: ListBasketItem[];

  async ngOnInit(): Promise<void> { 
    this.showSpinner(SpinnerType.Cog)
    this.basketItems = await this.basketService.get()
    this.updateTotalPrice();
    this.hideSpinner(SpinnerType.Cog)

  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.Cog)
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: UpdateBasketItem = new UpdateBasketItem();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.updateTotalPrice()
    this.hideSpinner(SpinnerType.Cog)
  }

  removeBasketItem(basketItemId: string) {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.Cog);
        await this.basketService.remove(basketItemId);

        var a = $("." + basketItemId)
        $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.Cog));
        $("#basketModal").modal("show");
      }
    });
   
  }

  updateTotalPrice(){
    this.totalPrice=0;
    this.basketItems.forEach(item => {
      this.totalPrice+=(item.price*item.quantity)
    });
  }
  shoppingComplete() {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.Cog);
        const order: CreateOrder = new CreateOrder();
        order.address = "İstanbul";
        order.description = "Ürün Açıklaması ... ";
        await this.orderService.create(order);
        this.hideSpinner(SpinnerType.Cog);
        this.toastrService.message("Sipariş alınmıştır!", "Sipariş Oluşturuldu!", {
          messageType: ToastrMessageType.Info,
          messagaPosition: ToastrMessagePosition.TopRight
        })
        this.router.navigate(["/"]);
      }
    });

}
}
