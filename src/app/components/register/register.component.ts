import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartManagerService } from 'src/app/services/cart-manager.service';
import { FoodManagerService } from 'src/app/services/food-manager.service';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { cart } from 'src/app/shared/models/cart';
import { userModel } from 'src/app/shared/models/user';
import { passwordMatch } from 'src/app/validators/passwordsMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('ConfirmPassword') confirmpasswordInput: ElementRef =
    {} as ElementRef;
  @ViewChild('Password') passwordInput: ElementRef = {} as ElementRef;
  cart!: cart;
  registerForm: FormGroup;
  constructor(
    private FB: FormBuilder,
    private foodManager: FoodManagerService,
    private userAuth: UserAuthenticationService,
    private toastrService: ToastrService,
    private router: Router,
    private cartManager: CartManagerService
  ) {
    this.registerForm = FB.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required]],
        address: ['', [Validators.required, Validators.minLength(10)]],
      },
      { validators: [passwordMatch] }
    );
  }
  ngOnInit(): void {}
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get address() {
    return this.registerForm.get('address');
  }
  togglePassword() {
    const togglePasswords = document.getElementById('togglePassword');
    const type =
      this.passwordInput.nativeElement.getAttribute('type') === 'password'
        ? 'text'
        : 'password';
    this.passwordInput.nativeElement.setAttribute('type', type);
  }
  toggleConfirmPassword() {
    const togglePasswords = document.getElementById('togglePassword');
    const type =
      this.confirmpasswordInput.nativeElement.getAttribute('type') ===
      'password'
        ? 'text'
        : 'password';
    this.confirmpasswordInput.nativeElement.setAttribute('type', type);
  }
  submit() {
    let newUser = <userModel>this.registerForm.value;

    let emailExists: boolean = this.userAuth.emailExists(newUser.email);
    if (!emailExists) {
      this.foodManager.addNewUser(newUser).subscribe((user: userModel) => {
        this.cart=new cart();
        this.cart.id = user.id;
        this.cartManager.addCart(this.cart).subscribe((cart: cart) => {
          this.router.navigate(['/']);
          this.toastrService.success(
            `Please login with your newly genarted account!`,
            'Registarion Success'
          );
        });
      });
    } else {
      this.toastrService.error('Email Already Exists', 'Registeration Failed');
    }
  }
}
