import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products/product.service';
import { ProductDetailsComponent } from '../products/product-details/product-details.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ProductListComponent,
    ProductDetailsComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly productService: ProductService = inject(ProductService);
  public categoryName: string = '';

  constructor() {
    this.categoryName = String(this.route.snapshot.params['categoryName']);
  }

  ngOnInit(): void {
    console.log(this.categoryName);
  }
}
