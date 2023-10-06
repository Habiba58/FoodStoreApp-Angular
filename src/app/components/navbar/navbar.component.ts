import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartManagerService } from 'src/app/services/cart-manager.service';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { cart } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cart: cart = new cart();
  cartNumber: number = 0;
  userID: number = 0;
  userName: string | null = '';
  isLogged: boolean = false;
  constructor(
    private cartManager: CartManagerService,
    private userAuth: UserAuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cartManager.getCartObservable().subscribe((cart: cart) => {
      this.cart = cart;
      this.cartNumber = cart.totalQuantity;
    });
    this.userAuth.getUserLoggedSubject().subscribe(() => {
      this.isLogged = this.userAuth.isUserLogged;
      this.userName = this.userAuth.getUserName;
    });
    this.userName = localStorage.getItem('userName');
  }
  logout() {
    this.userID = Number(localStorage.getItem('userID'));
    this.cartManager
      .editCart(this.cart, this.userID)
      .subscribe((cart: cart) => {
        this.userAuth.logout();
        this.router.navigate(['/']);
      });
  }
}
