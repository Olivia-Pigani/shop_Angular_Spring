import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {inject} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Subscription, catchError, tap } from 'rxjs';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { HttpErrorService } from '../../utils/http-error.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy{

public productId: number = 0;
public product : Product | null = null;
public errorMessage:string = "";
private sub!:Subscription;
private productService: ProductService = inject(ProductService);
private route:ActivatedRoute = inject(ActivatedRoute);

constructor(){
  this.productId = Number(this.route.snapshot.params['id'])
}

ngOnInit(): void {
  this.sub = this.productService.getProductById(this.productId)
  .pipe(
    catchError(err=>{
      this.errorMessage = err;
      return EMPTY;
    })
  )
  .subscribe({
    next: data=>this.product = data,
    error: err=>this.errorMessage = err
    
  });
}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}

}
