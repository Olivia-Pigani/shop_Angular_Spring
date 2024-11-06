import { Component, OnInit, Signal, WritableSignal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../basket/basket.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
private authService: AuthService = inject(AuthService);
private basketService:BasketService = inject(BasketService);
public totalItemInBasket:Signal<number> = this.basketService.totalBasketItemQuantity;
public isLoggedIn!: Signal<boolean>;

ngOnInit(): void {
  this.isLoggedIn = this.authService.isLoggedIn.asReadonly();
  console.log(`nb de item dans basket : ${this.totalItemInBasket}`)
}

  public onLogout(){
    this.authService.logout();
    this.ngOnInit() // handle the case if we logout in the /homepage location
  }
}
