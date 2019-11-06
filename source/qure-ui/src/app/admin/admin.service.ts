import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  authenticate(username, password) {

    if (username === "admin" && password === "admin") {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('usernameandpassword', username + ':' + password)
      sessionStorage.setItem('role', 'ADMIN');
      return true;
    } else {
      return false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isUserLoggedIn('ADMIN'))
      return true;

    this.router.navigate(['']);
    return false;

  }
}
