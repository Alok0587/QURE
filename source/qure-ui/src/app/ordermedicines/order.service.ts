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

  getOrders() {
    return this.http.get(this.REST_URL_BOOK)
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

  getOrderById(oid)
  {
    console.log("id is " + oid);
    return this.http.get(this.REST_URL_BOOK + "/" +oid)
      .pipe(map(res => {
        console.log(res);
        return res;
      }))

  }

  getMedicineById(mid)
  {
    console.log("id is " + mid);
    return this.http.get(this.REST_API_URL + "/" + mid)
      .pipe(map(res => {
        console.log(res);
        return res;
      }))

  }
  getOrdersByPatient(patientId)
  {
    console.log(patientId);
    return this.http.get(this.REST_URL_BOOK + "/" +patientId)
      .pipe(map(res => {
        console.log(res);
        return res;
      }))

  }
  deleteMedicine(medicineId: any) {
    console.log("id is " + medicineId);
    return this.http.delete(this.REST_API_URL + '/' + medicineId)
      .pipe(map(res => {
        console.log(res);
        return res;
       
      }));

  }
  deleteOrder(orderId: any) {
    console.log("id is " + orderId);
    return this.http.delete(this.REST_URL_BOOK + '/' + orderId)
      .pipe(map(res => {
        console.log(res);
        return res;
       
      }));

  }


}
