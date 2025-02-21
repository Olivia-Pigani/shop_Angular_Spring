import {
  Component,
  Signal,
  WritableSignal,
  effect,
  inject,
} from '@angular/core';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';
import { BasketItem } from '../basket-item';
import { AddressFormComponent } from '../../customer/address-form/address-form.component';
import { AddressService } from '../../customer/address.service';
import { Address } from '../../customer/address';
import { OrderService } from '../../orders/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-basket-total',
  standalone: true,
  imports: [CommonModule, AddressFormComponent],
  templateUrl: './basket-total.component.html',
  styleUrl: './basket-total.component.css',
})
export class BasketTotalComponent {
  private basketService: BasketService = inject(BasketService);
  private addressService: AddressService = inject(AddressService);
  private orderService: OrderService = inject(OrderService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public basketItemList: Signal<BasketItem[]> =
    this.basketService.basketItemList.asReadonly();
  public customerAddress: WritableSignal<Address> =
    this.addressService.customerAddress;
  public customerToken: Signal<boolean> =
    this.authService.isLoggedIn.asReadonly();
  public subTotal: Signal<number> = this.basketService.subTotal;
  public tax: Signal<number> = this.basketService.TAX;
  public deliveryFees: Signal<number> = this.basketService.deliveryFees;
  public totalPrice: Signal<number> = this.basketService.totalPrice;
  public showAddressForm: boolean = true;
  public isAddressVerified: boolean = false;
  public isOrderHasBeenMade: boolean = false;

  e = effect(() => {
    console.log(this.customerAddress());
  });

  public onCheckoutSubmit(): void {
    // if not authentified : go to sign in page
    if (!this.customerToken()) {
      this.router.navigate(['/auth/signin']);
    }

    if (!this.isAddressVerified || !this.customerAddress() || this.showAddressForm) {
      return;
    }

    this.orderService.makeAnOrder(this.basketItemList(),this.tax(),this.deliveryFees());
    console.log('order has been made');
    this.isOrderHasBeenMade = true;
  }

  public isAddressVerifiedChangeStatus(): void {
    if (!this.customerAddress()) {
      return;
    }
    this.isAddressVerified = !this.isAddressVerified;

    if (this.isAddressVerified) {
      this.showAddressForm = false;
    } else {
      this.showAddressForm = true;
    }
  }

  public closeOrderSuccessMsg(): void {
    this.isOrderHasBeenMade = false;
  }
}
