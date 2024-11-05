import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { BasketListComponent } from "../basket-list/basket-list.component";
import { BasketTotalComponent } from "../basket-total/basket-total.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-basket-page',
  standalone: true,
  imports: [NavbarComponent, BasketListComponent, BasketTotalComponent, FooterComponent],
  templateUrl: './basket-page.component.html',
  styleUrl: './basket-page.component.css'
})
export class BasketPageComponent {

}
