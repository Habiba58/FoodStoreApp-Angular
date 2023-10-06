import { Component, OnInit } from '@angular/core';
import { CartManagerService } from 'src/app/services/cart-manager.service';
import { cart } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: cart=new cart();
  constructor(private cartManager:CartManagerService){}
  ngOnInit(): void {
   this.cartManager.getCartObservable().subscribe((cart:cart)=>{
    this.cart=cart;
   });
  }
  removeFromCart(foodId:number){
    this.cartManager.removeFromCart(foodId);
  }
  changeCartItemQuantity(foodID:number,quantity:string){
    let quantityNumber=Number(quantity);
    this.cartManager.changeQuantity(foodID,quantityNumber);
  }

}
