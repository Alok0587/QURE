import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  
  private REST_API_URL: string = "http://localhost:7071/qure/appointments";

  constructor(private http: HttpClient) { }
  createAppointment( appointmentData: any) { // 1. get the data from comp 
    console.log(appointmentData);

    // 2. send the above data to rest api
      // 2.1 identify the rest api url
      // 2.2 send the data using POST method via a REST API Client
     // let _url = this.REST_API_URL + '/' + appointmentData.id;
    let promise = new Promise( (resolve, reject) => {
      this.http.post(this.REST_API_URL, appointmentData)
        .toPromise()
        .then( (res) => { // 3. get the resp from rest api
          console.log(res);
          resolve(res); // upon fullfillment
        })
        .catch( (err) => { // get the err from rest api
          console.log(err);
          reject(err); // upon failure/rejection
        })
        .finally( ( ) => {
          console.log("Ends");
        });
    });
    return promise; // 4. send it back to the component
  }

  getAppointmentsByDoctorId(id) {
    return this.http.get(this.REST_API_URL)
      .pipe( map(res => {  // 3. get res from rest api
        console.log( res);
        return res; // 4. send it back to comp
      }));
  }

  getAppointments() {
    return this.http.get(this.REST_API_URL)
      .pipe( map(res => {  // 3. get res from rest api
        console.log( res);
        return res; // 4. send it back to comp
      }));
  }


  getAppointmentById(id){
    console.log("id is " + id);
    return this.http.get(this.REST_API_URL + '/' + id)
      .pipe( map( res => {
        console.log( res );
        return res;
      }));
  }

  deleteAppointment(id){
    console.log("id is " + id);
    return this.http.delete(this.REST_API_URL + '/' + id)
      .pipe( map( res => {
        console.log( res );
        return res;
      }));
  }

  updateAppointment( appointmentData ) {
    let _url = this.REST_API_URL + '/' + appointmentData.id;
    
    let promise = new Promise( (resolve, reject) => {
      this.http.put( _url , appointmentData)
        .toPromise()
        .then( (res) => { // 3. get the resp from rest api
          console.log(res);
          resolve(res); // upon fullfillment
        })
        .catch( (err) => { // get the err from rest api
          console.log(err);
          reject(err); // upon failure/rejection
        })
        .finally( ( ) => {
          console.log("Ends");
        });
    });
    return promise; // 4. send it back to the component
  }
}