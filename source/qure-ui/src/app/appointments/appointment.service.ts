import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(this.REST_API_URL, {
      params: {
        pId: id
      }
    })
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  createAppointment(appointmentData: any) {
    console.log(appointmentData);
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.REST_API_URL, appointmentData)
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
    alert("appointment Success");
    return promise;
  }

  getAppointmentById(id) {
    console.log("id is " + id);
    return this.http.get(this.REST_API_URL + '/' + id)
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  deleteAppointment(id: any) {

    console.log("id is " + id);
    return this.http.delete(this.REST_API_URL + '/' + id)
      .pipe(map(res => {
        console.log(res);
        return res;
        console.log("lkdjslf");
      }));
  }

  updateAppointment(appointmentData) {
    let _url = this.REST_API_URL + '/' + appointmentData.id;

    let promise = new Promise((resolve, reject) => {
      this.http.put(_url, appointmentData)
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
}
