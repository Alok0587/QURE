import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { BookAppointmentService } from './book-appointment.service';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styles: []
})
export class BookAppointmentComponent implements OnInit {
  bookingList: any[];
  patientSubscription: Subscription;

  constructor(private patientserviceService: BookAppointmentService) { }

  ngOnInit() {
    this.patientSubscription = this.patientserviceService.getBookings()
    .subscribe( ( res: any[]) => {
      console.log(res);
      this.bookingList = res;
    });
  }

}
