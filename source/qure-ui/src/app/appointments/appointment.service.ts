import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private REST_API_URL: string = "http://localhost:7071/qure/appointments";
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getAppointmentsByPatientId(id: any) {
    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    console.log(headers);
    return this.http.get(this.REST_API_URL, {
      params: {
        pId: id
      },
      headers: headers

    })
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  getAppointmentsByDoctorId(id: any) {
    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    console.log(headers);
    return this.http.get(this.REST_API_URL, {
      params: {
        dId: id
      },
      headers: headers
    })
      .pipe(map(res => {  // 3. get res from rest api
        console.log(res);
        return res; // 4. send it back to comp
      }));
  }
  createAppointment(appointmentData: any) {
    console.log(appointmentData);
    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    console.log(headers);
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.REST_API_URL, appointmentData, { headers: headers })
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
    //alert("appointment Success");
    return promise;
  }

  getAppointmentById(id) {
    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    console.log(headers);
    console.log("id is " + id);
    return this.http.get(this.REST_API_URL + '/' + id, { headers: headers })
      .pipe(map(async res => {
        console.log(res);
        return await res;
      }));
  }

  deleteAppointment(id: any) {
    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    console.log(headers);

    console.log("id is " + id);
    let promise = new Promise((resolve, reject) => {
      this.http.delete(this.REST_API_URL + '/' + id, { headers: headers })
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
          console.log("ends");
        });
    });
    return promise;
  }

  updateAppointment(appointmentData: any) {
    let uandp = sessionStorage.getItem('usernameandpassword');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(uandp)
    });
    let _url = this.REST_API_URL + '/' + appointmentData.appointmentId;

    let promise = new Promise((resolve, reject) => {
      this.http.put(_url, appointmentData, { headers: headers })
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

  // checkSlot(slot, dId){
  //   let uandp = sessionStorage.getItem('usernameandpassword');
  //   const headers = new HttpHeaders({

  //                                 'Content-Type':  'application/json',
  //                                 'Authorization': 'Basic ' + btoa(uandp)});
  //   console.log(headers);
  //   console.log("slot is " + slot);
  //   return this.http.get(this.REST_API_URL+'/checkslot', {params: {
  //     slot: slot, dId: dId},
  //     headers: headers
  //   })
  //     .pipe( map(async res => {
  //       console.log(res);
  //       return await res;
  //     }));


  // }
}
