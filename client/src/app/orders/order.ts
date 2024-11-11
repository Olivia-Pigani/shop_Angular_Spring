import { Orderline } from './orderline';

export interface Order {

  totalAmount: number;

  tax: number;

  deliveryPrice: number;

  orderLineRequestDtoList: Orderline[];
  
}
