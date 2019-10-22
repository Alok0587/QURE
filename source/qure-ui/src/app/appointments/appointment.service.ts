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
    return this.http.get(this.REST_API_URL, {params: {
      pId: id}
    })
      .pipe(map(res => {  // 3. get res from rest api
        console.log(res);
        return res; // 4. send it back to comp
      }));
  }
}
