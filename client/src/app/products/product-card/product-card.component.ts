import { Component } from '@angular/core';
import { Product } from '../product';
import { Input } from '@angular/core'
import { SlicePipe } from '@angular/common'

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

@Input() public product!:Product;

}
