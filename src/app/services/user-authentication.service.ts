import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodManagerService } from './food-manager.service';
import { userModel } from '../shared/models/user';
import { CartManagerService } from './cart-manager.service';
@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  private isLoggedSubject: BehaviorSubject<boolean>;
  private userName: string = '';
  private userNameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(this.userName);
  private emails: string[] = [];
  private passwords: string[] = [];
  private fullNames: string[] = [];
  private userIDS: number[] = [];
  private userID: number = 0;
  allUsers: userModel[] = [];
  constructor(
    private userAPI: FoodManagerService,
    private cartManager: CartManagerService
  ) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(false);
    this.userAPI.getAllUsers().subscribe((users: userModel[]) => {
      this.allUsers = users;
      this.emails = users.map((user) => user.email);
      this.passwords = users.map((user) => user.password);
      this.userIDS = users.map((user) => user.id);
      this.fullNames = users.map((user) => user.name);
    });
  }
  emailExists(email: string): boolean {
    if (this.emails.includes(email)) {
      return true;
    } else {
      return false;
    }
  }
  login(email: string, password: string): number {
    let index: number = this.emails.indexOf(email);
    if (this.emails.includes(email) && password == this.passwords[index]) {
      let userToken = '123456789';
      localStorage.setItem('token', userToken);
      this.userName = this.fullNames[index];
      localStorage.setItem('userName', this.userName);
      this.userNameSubject.next(this.userName);
      this.userID = this.userIDS[index];
      localStorage.setItem('userID', String(this.userID));
      this.isLoggedSubject.next(true);
      return this.allUsers[index].id;
    } else {
      return 0;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userID');
    this.cartManager.logout();
    this.isLoggedSubject.next(false);
    this.userNameSubject.next('');
  }
  get isUserLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  getUserLoggedSubject(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
  getUserNameSubject(): Observable<string> {
    return this.userNameSubject.asObservable();
  }
  getuser(): string {
    return this.userNameSubject.value;
  }
   get getUserName(): string {
     return this.userName;
   }
}
