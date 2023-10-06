import { cartItem } from './cartItem';

export class cart {
  id:number=0;
  items: cartItem[]=[];
  totalPrice: number=0;
  totalQuantity: number=0;
}
