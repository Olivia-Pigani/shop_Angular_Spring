import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { OrderCardComponent } from "../../orders/order-card/order-card.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [NavbarComponent, OrderCardComponent, FooterComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {
public pageTitle:string = 'My Account';
}
