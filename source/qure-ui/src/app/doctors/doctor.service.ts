import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve, reject } from 'q';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  REST_API_URL: string = "http://localhost:7071/qure/doctors";
  constructor(private http: HttpClient) { }

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
          reject(err);
        })
        .finally(() => {
          console.log("ENDS");
        });
    });
    return promise;
  }
  getDoctorById(id) {
    console.log("id is " + id);
    return this.http.get(this.REST_API_URL + "/" + id)
      .pipe(map(res => {
        console.log(res);
        return res;
      }))
  }

  getDoctorBySpecialization(special) {

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
  deleteDoctor(id: any) {

    console.log("id is " + id);
    return this.http.delete(this.REST_API_URL + '/' + id)
      .pipe(map(res => {
        console.log(res);
        return res;
       
      }));
  }
  filterDoctor(city,specialization)
  {
    let _url = this.REST_API_URL + "/?city=" + city + "&?specialization=" + specialization;

    return this.http.get(_url)
      .toPromise()
      .then((res: any[]) => {
        console.log(res);
        return res;
      })
      .catch(err => {
        return (err);

      })
  }

  updateDoctor(doctorData) {
    let _url = this.REST_API_URL + '/' + doctorData.doctorId;

    let promise = new Promise((resolve, reject) => {
      this.http.put(_url, doctorData)
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
