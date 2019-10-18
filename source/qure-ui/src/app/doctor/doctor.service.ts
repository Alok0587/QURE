import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private REST_API_URL: string = "http://localhost:7071/qure/doctors";

  constructor(  private http: HttpClient) { }

  createDoctor( doctorData: any) { 
    console.log(doctorData);

    
    let promise = new Promise( (resolve, reject) => {
      this.http.post(this.REST_API_URL, doctorData)
        .toPromise()
        .then( (res) => { 
          console.log(res);
          resolve(res); 
        })
        .catch( (err) => { 
          console.log(err);
          reject(err); 
        })
        .finally( ( ) => {
          console.log("Ends");
        });
    });
    return promise; 
  }
  getDoctors() {
    return this.http.get(this.REST_API_URL)
      .pipe( map(res => { 
        console.log( res);
        return res; 
      }));
  }

  getDoctorById( id){
    console.log("id is " + id);
    return this.http.get(this.REST_API_URL + '/' + id)
      .pipe( map( res => {
        console.log( res );
        return res;
      }));
  }

  updateDoctor( doctorData ) {
    let _url = this.REST_API_URL + '/' + doctorData.doctorId;
    
    let promise = new Promise( (resolve, reject) => {
      this.http.put( _url , doctorData)
        .toPromise()
        .then( (res) => { 
          console.log(res);
          resolve(res); 
        })
        .catch( (err) => { 
          console.log(err);
          reject(err);
        })
        .finally( ( ) => {
          console.log("Ends");
        });
    });
    return promise; 
  }
  

}

