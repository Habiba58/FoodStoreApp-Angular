import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodCradDetailsComponent } from './components/food-crad-details/food-crad-details.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path:'register',component:RegisterComponent},
  {
    path: 'Search/:searchTerm',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'foodDetails/:fID',
    component: FoodCradDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'tag/:tag', component: HomeComponent, canActivate: [authGuard] },
  { path: 'cartPage', component: CartComponent, canActivate: [authGuard] },
  { path: 'Home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
