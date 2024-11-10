import { Orderline } from './orderline';

export interface Order {

  totalAmount: number;

  orderLineRequestDtoList: Orderline[];
  
}
