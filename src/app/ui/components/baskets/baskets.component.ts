import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';
declare var $: any;
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class  BasketsComponent  extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService, private basketService: BasketService) {
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

  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.Cog);
    await this.basketService.remove(basketItemId);

    var a = $("." + basketItemId)
    $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.Cog));
   
  }

  updateTotalPrice(){
    this.totalPrice=0;
    this.basketItems.forEach(item => {
      this.totalPrice+=(item.price*item.quantity)
    });
  }


}
