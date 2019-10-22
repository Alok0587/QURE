import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private REST_API_URL: string = "http://localhost:7071/qure/medicines";

  private REST_URL_BOOK : string = "http://localhost:7071/qure/bookmedicines";

  constructor(private http: HttpClient) { }

  getMedicines() {
    return this.http.get(this.REST_API_URL)
      .pipe(map(res => { 
        console.log(res);
        return res; 
      }));
  }

  createOrder(medicineData: any) {
    console.log(medicineData+" In order service file");

    let promise = new Promise((resolve, reject) => {

      this.http.post(this.REST_URL_BOOK, medicineData)
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
