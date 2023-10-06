import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(  private authService: UserAuthenticationService
              , private router:Router
              , private toastr:ToastrService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isUserLogged)
      return true;
    else{
     this.toastr.error(
      'You Must Login First',
      'Navigation Failed'
     )
      this.router.navigate(['/']);
      return false;
    }
     
  };

}

