import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { ProductListComponent } from "../products/product-list/product-list.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, ProductListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
