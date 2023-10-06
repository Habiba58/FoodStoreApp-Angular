import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartManagerService } from 'src/app/services/cart-manager.service';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { cart } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLogged: boolean = false;
  userCart: cart = new cart();
  @ViewChild('pass') passwordInput: ElementRef = {} as ElementRef;
  constructor(
    private FB: FormBuilder,
    private userAuth: UserAuthenticationService,
    private cartService: CartManagerService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.loginForm = FB.group({
      email: FB.control('', [Validators.required, Validators.email]),
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {

  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  submit(email: string, password: string) {
    let userID: number = this.userAuth.login(email, password);
    this.isLogged = this.userAuth.isUserLogged;
    if (!this.isLogged) {
      this.toastrService.error(
        'Username or Password is incorrect!',
        'Login Failed'
      );
    } else {
      this.cartService.getCartByID(userID).subscribe((cart: cart) => {
        this.cartService.setCartToLocalStorageLogin(cart);
      });
      this.router.navigate(['/Home']);
      this.toastrService.success(
        `Welcome to FoodMine ${this.userAuth.getUserName}!`,
        'Login Success'
      );
    }
  }
  togglePassword() {
    const togglePasswords = document.getElementById('togglePassword');
    const type =
      this.passwordInput.nativeElement.getAttribute('type') === 'password'
        ? 'text'
        : 'password';
    this.passwordInput.nativeElement.setAttribute('type', type);
  }
}
