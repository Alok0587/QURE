import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve, reject } from 'q';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  REST_API_URL: string = "http://localhost:7071/qure/doctors";

  REST_API_URL2: string = "http://localhost:7071/qure/doctors/auth";

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
        sessionStorage.setItem('username', userObj.principal.username)
        sessionStorage.setItem('role', 'DOCTOR')
        return res;
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

  registerDoctor(doctorData: any) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.REST_API_URL, doctorData)
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
  getDoctorByEmail(email) {
    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    console.log(headers);

    console.log("doctor email is ...." + email);
    return this.http.get(this.REST_API_URL + "/" + email, { headers: headers })
      .pipe(map(res => {
        console.log(res);
        console.log("doctor by email")
        return res;
      }))
  }
  getDoctorById(email) {
     return this.getDoctorByEmail(email);
    // console.log("doctor email is ...." + email);
    // return this.http.get(this.REST_API_URL + "/" + email)
    //   .pipe(map(res => {
    //     console.log(res);
    //     console.log("doctor by email")
    //     return res;
    //   }))
  }

  getDoctorBySpecialization(special) {

    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    console.log(headers);
    console.log("special is " + special);

    console.log(special + "12345");
    return this.http.get(this.REST_API_URL, {
      params: {
        specialization: special
      },
      headers: headers
    })
      .pipe(map(res => {
        console.log(res);
        return res;
      }));

  }
  getDoctorBySpecialization2(special) {

    
    console.log("special is " + special);

    console.log(special + "12345");
    return this.http.get(this.REST_API_URL, {
      params: {
        specialization: special
      }
    })
      .pipe(map(res => {
        console.log(res);
        return res;
      }));

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

  deleteDoctor(id: any) {

    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    console.log(headers);

    console.log("id is " + id);
    return this.http.delete(this.REST_API_URL + '/' + id, { headers: headers })
      .pipe(map(res => {
        console.log(res);
        return res;

      }));
  }
  async filterDoctor(city: string, specialization: string) {
    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    console.log("spec and city");
    console.log(specialization);
    console.log(city);


    let _url = this.REST_API_URL;


    if (specialization != "false" && city != "false") {
      _url = _url + "?city=" + city + "&specialization=" + specialization;
    }

    else if (city != "false") {
      _url = _url + "?city=" + city;
    }
    else if (specialization != "false") {
      _url = _url + "?specialization=" + specialization;
    }

    console.log("inside filter Doctor" + specialization + "and" + city)
    console.log("sending to link " + _url);
    return this.http.get(_url, { headers: headers })
      .toPromise()
      .then(async (res: any[]) => {
        console.log(res);
        _url = this.REST_API_URL;
        return await res;
      })
      .catch(err => {
        _url = this.REST_API_URL;
        return (err);

      })

  }

  updateDoctor(doctorData) {

    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });

    let _url = this.REST_API_URL + '/' + doctorData.doctorId;

    let promise = new Promise((resolve, reject) => {
      this.http.put(_url, doctorData, { headers: headers })
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isUserLoggedIn('DOCTOR'))
      return true;

    this.router.navigate(['doctors/login']);
    return false;

  }

}
