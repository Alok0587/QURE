import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { resolve, reject } from 'q';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  REST_API_URL: string = "http://localhost:7071/qure/patients";

  constructor(private http: HttpClient) { }

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
          reject(err);
        })
        .finally(() => {
          console.log("ENDS");
        });
    });
    return promise;
  }

  getAllPatients() {
    return this.http.get(this.REST_API_URL)
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  getPatientById(id) {
    console.log("id is " + id);
    return this.http.get(this.REST_API_URL + "/" + id)
      .pipe(map(res => {
        console.log(res);
        return res;
      }))
  }

  updatePatient(patientData) {
    let _url = this.REST_API_URL + '/' + patientData.patientId;

    let promise = new Promise((resolve, reject) => {
      this.http.put(_url, patientData)
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
}
