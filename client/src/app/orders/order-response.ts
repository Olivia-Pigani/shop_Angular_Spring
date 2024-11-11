import { Orderline } from "./orderline";
import { OrderlineResponse } from "./orderline-response";

export interface OrderResponse {

     orderId: number,

     userId: number,

     reference:string,
  
     orderDate: Date,

     taxAmount:number,

     deliveryPrice:number,
    
     totalAmount: number,
  
     orderLineResponseDtoList: OrderlineResponse[]
}
