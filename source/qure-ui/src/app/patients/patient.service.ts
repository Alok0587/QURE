import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve, reject } from 'q';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  REST_API_URL: string = "http://localhost:7071/qure/patients";

  REST_API_URL2: string = "http://localhost:7071/qure/patients/auth";

  constructor(private authenticationService: AuthenticationService, private http: HttpClient, private router: Router) { }

  async authenticate(username, password) {

    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });
    sessionStorage.setItem('usernameandpassword', username + ':' + password)

    console.log("email " + username);
    console.log("pass " + password);
    await this.http.post(this.REST_API_URL2, {}, { headers: headers })
      .toPromise()
      .then((res) => {
        let user = JSON.stringify(res);
        let userObj = JSON.parse(user);
        console.log("response: " + JSON.stringify(res));
        console.log("username: " + userObj.principal.username);
        console.log(userObj.authorities[0].authority);
        if(userObj.authorities[0].authority==='ROLE_PATIENT'){
        sessionStorage.setItem('username', userObj.principal.username)
        sessionStorage.setItem('role', 'PATIENT')
        // console.log(userObj.principal.role);
        return true;
        }
        else return false;
      })
      .catch((err) => {
        console.log(err);
        alert("Can't login. Please check your credentials.");
      
        return err;
      });

    // if (username === "athul" && password === "password") {
    //   sessionStorage.setItem('username', username)
    //   return true;
    // } else {
    //   return false;
    // }
    return true;
  }



  registerPatient(patientData: any) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.REST_API_URL, patientData)
        .toPromise()
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          alert("Can't register. Profile already exists.")
        
          reject(err);
        })
        .finally(() => {
          console.log("ENDS");
        });
    });
    return promise;
  }

  // getAllPatients() {
  //   return this.http.get(this.REST_API_URL)
  //     .pipe(map(res => {
  //       console.log(res);
  //       return res;
  //     }));
  // }

  getPatientByEmail(email) {
    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    console.log(headers);
    console.log("email is " + email);
    console.log("email is " + email);
    return this.http.get(this.REST_API_URL + "/" + email, { headers: headers })
      .pipe(map(res => {
        console.log(res);
        return res;
      }))
  }
  updatePassword(email,password)
  {
    let _url = this.REST_API_URL ;

    console.log(email+"   "+password);
    let usrObj={
      'email': email,
      'password': password
    }

    let promise = new Promise((resolve, reject) => {
      this.http.put(_url, usrObj)
        .toPromise()
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
        .finally(() => {
          console.log("Ends");
        });
    });
    return promise;
  }

  updatePatient(patientData) {
    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    let _url = this.REST_API_URL + '/' + patientData.patientId;

    let promise = new Promise((resolve, reject) => {
      this.http.put(_url, patientData, { headers: headers })
        .toPromise()
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
        .finally(() => {
          console.log("ENDS");
        });
    });

    return promise;
  }

  async forgotPassword(email,otp){
    let forgotpass={
      'email': email,
      'phone': otp
    }

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.REST_API_URL+'/forgot', forgotpass)
        .toPromise()
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
        .finally(() => {
          console.log("ENDS");
        });
    });
    return promise;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isUserLoggedIn('PATIENT'))
      return true;

    this.router.navigate(['patients/login']);
    return false;

  }
}
