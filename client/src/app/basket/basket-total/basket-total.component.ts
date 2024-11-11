import { Component, Signal, WritableSignal, inject } from '@angular/core';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';
import { BasketItem } from '../basket-item';
import { AddressFormComponent } from "../../customer/address-form/address-form.component";
import { AddressService } from '../../customer/address.service';
import { Address } from '../../customer/address';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderService } from '../../orders/order.service';
import { Router } from '@angular/router';
import { CustomerService } from '../../customer/customer.service';
import { AuthService } from '../../auth/auth.service';

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
private authService:AuthService = inject(AuthService);
private router:Router = inject(Router);
public basketItemList:Signal<BasketItem[]> = this.basketService.basketItemList.asReadonly();
public customerAddress: Signal<Address | undefined> = toSignal(
  this.addressService.addressDetails$
);
public customerToken:Signal<boolean> = this.authService.isLoggedIn.asReadonly();
public subTotal:Signal<number> = this.basketService.subTotal;
public tax:Signal<number> = this.basketService.TAX;
public deliveryFees:Signal<number> = this.basketService.deliveryFees;
public totalPrice:Signal<number> = this.basketService.totalPrice;
public showAddressForm:boolean = true;
public isAddressVerified: boolean = false;
public isOrderHasBeenMade: boolean = false;

public onCheckoutSubmit():void{

  // if not authentified : go to sign in page
  if(!this.customerToken()){
    this.router.navigate(['/auth/signin'])
  }

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