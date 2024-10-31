import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { ProductListComponent } from "../products/product-list/product-list.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, ProductListComponent, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
