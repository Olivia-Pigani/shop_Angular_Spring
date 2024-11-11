import { Review } from '../reviews/review';

export interface Product {
  id: number;

  name: string;

  description: string;

  image: string;

  availableQuantity: number;

  price: number;

  reviews?: Review[];
}
