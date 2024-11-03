import { Component, Input, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { EMPTY, catchError,  } from 'rxjs';
import { ProductCardComponent } from "../product-card/product-card.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { Product } from '../product';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent  {
private productService: ProductService = inject(ProductService);
//public pageTitle: string = 'All products';
//public errorMessage: string = '';
@Input() pageTitle!:string;
@Input() errorMessage!: string ;
@Input() productList!: Product[];


//declarative way : no need of ngOninit and ngOndestroy
// readonly allProducts$ = this.productService.allProducts$
// .pipe(
//   catchError(err=>{
//     this.errorMessage = err;
//     return EMPTY;
//   })
// );

}
