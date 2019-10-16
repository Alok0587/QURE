import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { resolve, reject } from 'q';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookAppointmentService {

  REST_API_URL: string = "https://jsonplaceholder.typicode.com/users";
 //REST_API_URL: string = "http://localhost:7071/qure/patient";

 constructor(private http: HttpClient) { }

 //1 get the data from component
 newBooking(patientData: any) {
   console.log(patientData);


   //2 send the data to rest api
   //2.1 identify the rest api -- url
   //url=
   //2.2 connect to rest api and send the data using POST method

   let promise = new Promise((resolve, reject) => {

     this.http.post(this.REST_API_URL, patientData)
       .toPromise()
       .then((res) => { //3. get response from rest api
         console.log(res);
         resolve(res); // upon fullfillment
       })
       .catch((err) => { //get the err form rest api
         console.log(err);
         reject(err); // upon failure/rejection
       })
       .finally(() => {
         console.log("ENDS");
       });
   });  


   return promise; //4. send it back to comp
 }

 getBookings() {
  return this.http.get(this.REST_API_URL)
    .pipe(map(res => { //3. get res from rest api
      console.log(res);
      return res; //4. send it back to comp
    }));
}

}