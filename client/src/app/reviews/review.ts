// export class Review {

//     #id: number

//     #title: string

//     #description: string

//     #rating: number

//     constructor(_id:number,_title:string,_description:string,_rating:number){
//         this.#id=_id;
//         this.#title=_title;
//         this.#description=_description;
//         this.#rating=_rating
//     }
// }

export interface Review {

    id: number

    title: string

    description: string

    rating: number

}