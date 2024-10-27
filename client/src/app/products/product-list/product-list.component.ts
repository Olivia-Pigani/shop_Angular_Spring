import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Subscription, tap } from 'rxjs';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {

public pageTitle: string = 'All products';
public errorMessage: string = '';
public productList: Product[] = [];
public selectedProductId:number = 0;
private sub!:Subscription;

private productService: ProductService = inject(ProductService);


ngOnInit(): void {
  this.sub = this.productService.getAllProducts()
  .pipe(
    tap(()=>console.log('component operator'))
  ).subscribe((data)=>this.productList = data);
}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}

}
