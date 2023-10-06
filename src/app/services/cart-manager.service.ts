import { Injectable } from '@angular/core';
import { cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { food } from '../shared/models/food';
import { cartItem } from '../shared/models/cartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartManagerService {
  APILink: string = 'http://localhost:3000';
  httpOptions;
  private cart: cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<cart> = new BehaviorSubject(this.cart);
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }
  private setCartToLocalStorage() {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, cartItem) => prevSum + cartItem.price,
      0
    );
    this.cart.totalQuantity = this.cart.items.reduce(
      (prevSum, cartItem) => prevSum + cartItem.quantity,
      0
    );
    let cartJSON = JSON.stringify(this.cart);
    localStorage.setItem('cartLogin', cartJSON);
    this.cartSubject.next(this.cart);
  }

  //gets user cart from database and set it to local storage.
  setCartToLocalStorageLogin(cart: cart) {
    let cartJSON = JSON.stringify(cart);
    localStorage.setItem('cartLogin', cartJSON);
    this.cart = this.getCartFromLocalStorage();
    this.cartSubject.next(this.cart);
  }
  private getCartFromLocalStorage() {
    let cartJson = localStorage.getItem('cartLogin');
    return cartJson ? JSON.parse(cartJson) : new cart();
  }
  logout() {
    let cartJson = localStorage.getItem('cartLogin');
    if (cartJson) {
      localStorage.removeItem('cartLogin');
    }
    this.cart = this.getCartFromLocalStorage();
    this.cartSubject.next(this.cart);
  }
  addToCart(food: food) {
    let Item = this.cart.items.find((item) => item.food.id === food.id);
    if (Item) return;
    this.cart.items.push(new cartItem(food));
    this.setCartToLocalStorage();
  }
  removeFromCart(foodId: number) {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this.setCartToLocalStorage();
  }
  changeQuantity(foodID: number, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === foodID);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }
  clearCart() {
    this.cart = new cart();
    this.setCartToLocalStorage();
  }
  getCartObservable(): Observable<cart> {
    return this.cartSubject.asObservable();
  }
  getCartByID(ID: number): Observable<cart> {
    return this.httpClient.get<cart>(`${this.APILink}/carts/${ID}`);
  }
  addCart(newCart: cart): Observable<cart> {
    return this.httpClient.post<cart>(
      `${this.APILink}/carts`,
      JSON.stringify(newCart),
      this.httpOptions
    );
  }
  editCart(editedCart: cart, cartID: number): Observable<cart> {
    return this.httpClient.put<cart>(
      `${this.APILink}/carts/${cartID}`,
      JSON.stringify(editedCart),
      this.httpOptions
    );
  }
  getAllCarts(): Observable<cart[]> {
    return this.httpClient.get<cart[]>(`${this.APILink}/carts`);
  }
}
