import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isUserLoggedIn(role: string) {
    if(sessionStorage.getItem('role')===role){
      let user = sessionStorage.getItem('username')
      console.log(!(user === null))
      return !(user === null)
    }
    // let user = sessionStorage.getItem('username')
    // console.log(!(user === null))
    // return !(user === null)
  }

  getLoggedInUser(){
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return user;
  }

  logOut() {
    
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('usernameandpassword')
    sessionStorage.removeItem('role');
  }
}
