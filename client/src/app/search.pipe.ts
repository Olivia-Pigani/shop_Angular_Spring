import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './products/product';

@Pipe({
  name: 'searchpipe',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(productList: Product[], searchText: string): Product[] {
    if (!searchText) {
      return [];
    }

    const searchTextLowerCase = searchText.toLocaleLowerCase();

    return productList.filter((product) => {
      return product.name.toLocaleLowerCase().includes(searchTextLowerCase);
    });
  }
}
