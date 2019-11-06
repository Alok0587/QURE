import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }

  isUserLoggedIn(role: string) {
    if (sessionStorage.getItem('role') === role) {
      let user = sessionStorage.getItem('username')
      console.log(!(user === null));
      return !(user === null);
    }
    // let user = sessionStorage.getItem('username')
    // console.log(!(user === null))
    // return !(user === null)
  }

  getLoggedInUser() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null));
    return user;
  }

  logOut() {

    sessionStorage.removeItem('username')
    sessionStorage.removeItem('usernameandpassword')
    sessionStorage.removeItem('role');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ((this.isUserLoggedIn('PATIENT')||this.isUserLoggedIn('DOCTOR'))){
      return true;
    }

    this.router.navigate(['']);
    return false;

  }
}
