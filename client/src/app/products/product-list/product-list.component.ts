import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { EMPTY, Subscription, catchError, tap } from 'rxjs';
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
private sub!:Subscription;

private productService: ProductService = inject(ProductService);


ngOnInit(): void {
  this.sub = this.productService.getAllProducts()
  .pipe(
    catchError(err=>{
      this.errorMessage = err;
      return EMPTY;
    })
  ).subscribe({
    next:(data)=>this.productList = data,
    error: (err) => this.errorMessage = err
  });
}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}



}
