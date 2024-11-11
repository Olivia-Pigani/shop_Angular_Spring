import { Component, Signal, inject } from '@angular/core';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';
import { BasketItem } from '../basket-item';
import { AddressFormComponent } from "../../customer/address-form/address-form.component";
import { AddressService } from '../../customer/address.service';
import { Address } from '../../customer/address';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderService } from '../../orders/order.service';

@Component({
  selector: 'app-basket-total',
  standalone: true,
  imports: [CommonModule, AddressFormComponent],
  templateUrl: './basket-total.component.html',
  styleUrl: './basket-total.component.css'
})
export class BasketTotalComponent {
private basketService: BasketService = inject(BasketService);
private addressService:AddressService = inject(AddressService);
private orderService:OrderService = inject(OrderService);
public basketItemList:Signal<BasketItem[]> = this.basketService.basketItemList.asReadonly();
public customerAddress: Signal<Address | undefined> = toSignal(
  this.addressService.addressDetails$
);
public subTotal:Signal<number> = this.basketService.subTotal;
public tax:Signal<number> = this.basketService.TAX;
public deliveryFees:Signal<number> = this.basketService.deliveryFees;
public totalPrice:Signal<number> = this.basketService.totalPrice;
public showAddressForm:boolean = true;
public isAddressVerified: boolean = false;
public isOrderHasBeenMade: boolean = false;

public onCheckoutSubmit():void{
  if(!this.isAddressVerified || !this.customerAddress()){
    return;
  }
  this.orderService.makeAnOrder(this.basketItemList(), this.tax(), this.deliveryFees())
  console.log("order has been made")
  this.isOrderHasBeenMade = true;
}

public isAddressVerifiedChangeStatus():void{
  this.isAddressVerified = !this.isAddressVerified

  if(this.isAddressVerified){
    this.showAddressForm = false;
  }else {
    this.showAddressForm = true;
  }
}

public closeOrderSuccessMsg():void{
  this.isOrderHasBeenMade = false;
}

}