import { Component, OnInit } from '@angular/core';
import { CartManagerService } from 'src/app/services/cart-manager.service';
import { FoodManagerService } from 'src/app/services/food-manager.service';
import { cart } from 'src/app/shared/models/cart';
import { Order } from 'src/app/shared/models/order';
import { userModel } from 'src/app/shared/models/user';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  orderDetails: Order = new Order();
  userID: number = 0;
  userCart: cart = new cart();
  constructor(
    private foodManger: FoodManagerService,
    private cartManager: CartManagerService
  ) {}
  ngOnInit(): void {
    this.userID = Number(localStorage.getItem('userID'));
    this.foodManger.getUserByID(this.userID).subscribe((user) => {
      this.orderDetails.name = user.name;
      this.orderDetails.address = user.address;
      this.cartManager.getCartObservable().subscribe((cart:cart)=>{
        this.orderDetails.items=cart.items;
        this.orderDetails.totalPrice=cart.totalPrice;
      });
    });
  }
}
