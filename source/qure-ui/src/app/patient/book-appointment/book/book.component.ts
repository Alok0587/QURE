import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookAppointmentService } from '../book-appointment.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styles: []
})
export class BookComponent implements OnInit {

  //step1: create Form Group
  bookForm: FormGroup;
  isSaved: boolean = false;


  constructor( private patientserviceService: BookAppointmentService) {
    this.bookForm= new FormGroup({
      //step2; create Form Control
      name: new FormControl('', Validators.required), //step5: add validators
      age: new FormControl('', [
                                Validators.required,
                                Validators.min(18) 
                              ]),
      slot: new FormControl('', Validators.required)
    });
   }

   async onBookHandler(){
    console.log(this.bookForm);
    console.log(this.bookForm.value);
    1//send data to service
    let res: any = await this.patientserviceService.newBooking(this.bookForm.value);
    2//get the response from service

    console.log(res);

    if(res && res.message){
      this.isSaved = true;
    }
  }

  ngOnInit() {
  }

}