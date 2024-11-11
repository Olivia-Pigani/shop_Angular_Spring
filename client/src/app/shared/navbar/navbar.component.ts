import { Component, EffectRef, OnInit, Signal, WritableSignal, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../basket/basket.service';
import { Product } from '../../products/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../products/product.service';
import { SearchPipe } from '../../search.pipe';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive,CommonModule,SearchPipe,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
private authService: AuthService = inject(AuthService);
private basketService:BasketService = inject(BasketService);
private productService:ProductService = inject(ProductService);
private router:Router = inject(Router);
public totalItemInBasket:Signal<number> = this.basketService.totalBasketItemQuantity;
public isLoggedIn!: Signal<boolean>;
public searchText:string = '';
public productList!:Product[];

ngOnInit(): void {

  this.productService.allProducts$
  .subscribe((data)=>{
    this.productList = data;
  })

  this.isLoggedIn = this.authService.isLoggedIn.asReadonly();
  console.log(`nb de item dans basket : ${this.totalItemInBasket}`)
}

  public onLogout(){
    this.authService.logout();
    this.ngOnInit() // handle the case if we logout in the /homepage location
  }

  public onProductSelected(productId:number):void{
    this.router.navigate(['/details', productId]).then(() => {
      window.location.reload();
    });
    
  }
}
