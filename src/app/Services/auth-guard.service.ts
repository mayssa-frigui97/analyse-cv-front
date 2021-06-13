import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // const allowedRoles = next.data.allowedRoles;
    if ((this.authService.isLoggednIn()) ) {
      console.log("isLoggednIn:",this.authService.isLoggednIn())
      // this.router.navigate(['accueil']);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if (this.authService.isLoggednIn()) { return true; }
  //   this.router.navigate([''], { queryParams: { redirect: state.url }, replaceUrl: true });
  //   return false;
  // }

}
//&& (allowedRoles.includes(this.authService.getrole().toString())) && (allowedRoles.includes(this.authService.getrole().toString()) === false)

