// import { Review } from '../reviews/review';

import { Review } from "../reviews/review";

// export class Product {
//   #id: number;

//   #name: string;

//   #description: string;

//   #image: string;

//   #availableQuantity: number;

//   #price: number;

//   #reviews?: Review[];

//   constructor(
//     _id: number,

//     _name: string,

//     _description: string,

//     _image: string,

//     _availableQuantity: number,

//     _price: number,

//     _reviews: Review[]
//   ) {
//     (this.#id = _id),
//       (this.#name = _name),
//       (this.#description = _description),
//       (this.#image = _image),
//       (this.#availableQuantity = _availableQuantity),
//       (this.#price = _price);
//       (this.#reviews = _reviews);
//   }

//   get id() {
//     return this.#id;
//   }

//   get name() {
//     return this.#name;
//   }

//   get description() {
//     return this.#description;
//   }

//   get image() {
//     return this.#image;
//   }

//   get availableQuantity() {
//     return this.#availableQuantity;
//   }

//   get price() {
//     return this.#price;
//   }

//   set name(newName: string) {
//     this.#name = newName;
//   }

//   set description(newDescription: string) {
//     this.#description = newDescription;
//   }

//   set image(newImage: string) {
//     this.#image = newImage;
//   }

//   set availableQuantity(newAvailableQuantity: number) {
//     this.#availableQuantity = newAvailableQuantity;
//   }

//   set price(newPrice: number) {
//     this.#price = newPrice;
//   }
// }


export interface Product {
  id: number;

  name: string;

  description: string;

  image: string;

  availableQuantity: number;

  price: number;

  reviews?: Review[];
}