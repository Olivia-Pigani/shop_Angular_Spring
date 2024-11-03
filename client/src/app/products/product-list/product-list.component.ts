import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { EMPTY, Observable, Subscription, catchError, tap,  } from 'rxjs';
import { ProductCardComponent } from "../product-card/product-card.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy{
private readonly productService: ProductService = inject(ProductService);
private readonly route:ActivatedRoute = inject(ActivatedRoute);
private sub!: Subscription;

public pageTitle: string = '';
public errorMessage: string = '';
public productList$!: Observable<Product[]>;

@Input() dataToDisplay!: string;

ngOnInit(): void {
  //must take the param as an observable to switch from category to another
  this.sub = this.route.params.subscribe(params => {
    if (this.dataToDisplay === 'categoryProduct') {
      const categoryName: string = params['categoryName'];
      this.displayProducts(categoryName);
    } else if (this.dataToDisplay === 'allProducts') {
      this.displayProducts();
    }
  });
}
ngOnDestroy(): void {
  if (this.sub) {
    this.sub.unsubscribe();
  }
}

public displayProducts(categoryName?: string): void{

  if(!categoryName){

  //declarative way : no need of ngOninit and ngOndestroy
    this.productList$ = this.productService.allProducts$
    .pipe(
      catchError(err=>{
        this.errorMessage = err;
        return EMPTY;
      }),
      tap(()=>{
        this.pageTitle = 'All Products'
      })
    );
    }
   else if(categoryName) {

    this.productList$ = this.productService.getProductByCategoryName(categoryName)
    .pipe(
      catchError(err=>{
        this.errorMessage = err;
        return EMPTY;
      }),
      tap(()=>{
        this.pageTitle = `product of type ${categoryName}`;
      })
    )
  }
}}

