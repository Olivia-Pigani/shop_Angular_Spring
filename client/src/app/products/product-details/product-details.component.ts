import { Component } from '@angular/core';
import {inject} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

public productId: number = 0  
private route:ActivatedRoute = inject(ActivatedRoute);

constructor(){
  this.productId = Number(this.route.snapshot.params['id'])
}

}
