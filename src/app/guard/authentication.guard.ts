import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationStatus } from '../enums/authentication-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthenticationService) { }

  canActivate(): boolean {
    return  true; // this.authService.isAuthenticated();
  }
}
