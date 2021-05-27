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
    const allowedRoles = next.data.allowedRoles;
    if ((this.authService.isLoggednIn()) && (allowedRoles.includes(this.authService.getrole().toString()))) {
      return true;
    } else if ((this.authService.isLoggednIn()) && (allowedRoles.includes(this.authService.getrole().toString()) === false)) {
      this.router.navigate(['accueil']);
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}
