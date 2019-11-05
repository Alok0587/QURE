import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription, pipe } from 'rxjs';
import { AppointmentService } from '../appointment.service';
import { DoctorService } from 'src/app/doctors/doctor.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  // appointmentList: any[];
  appointmentSubscription: Subscription;
  doctorList: any[];
  appointmentList: any[];
  appointmentSubscription2: Subscription;
  slotList: any;
  appointmentForm: any;
  appId: string;
  minDate: any;
  bookForm: FormGroup;
  searchForm: FormGroup;
  doctorId: any;
  selDate: any;
  appointmentData = {
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    price: 500,
    time: ""

  }



  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, public router: Router, private doctorService: DoctorService) {
    this.slotList = ['9', '10', '17', '18', '19', '21'];
    // console.log(this.startDate.getDate());
  }

  ngOnInit() {
    // const _dId = this.onReturn();
    // const patientId: string = this.route.snapshot.paramMap.get('id');
    // let startDate = new Date();
    // console.log(startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear());
    // this.minDate = (startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear());
    // // let todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    // this.minDate = startDate;
    // let today: Date = new Date(Date.now());
    // console.log(today);
    // // console.log(this.minDate);


    const _patientId: string = sessionStorage.getItem('userId');
    console.log(_patientId)
    this.bookForm = new FormGroup({
      //step2; create Form Control
      patientId: new FormControl(_patientId, Validators.required),
      doctorId: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required), //step5: add validators
      appointmentDate: new FormControl('', [
        Validators.required

      ]),
      price: new FormControl('500', Validators.required)
    });

    this.searchForm = new FormGroup({
      // Step2: Create Form Control
      city: new FormControl('false', Validators.required),
      specialization: new FormControl('false', Validators.required)
    });
  }
  async onSearchDoctorHandler() {
    let pid = sessionStorage.getItem('userId');
    console.log(pid + " city id " + this.searchForm.value.city);
    console.log(pid + " sped is id " + this.searchForm.value.specialization);
    this.doctorList = await this.doctorService.filterDoctor(this.searchForm.value.city, this.searchForm.value.specialization);
    console.log("doctors list" + this.doctorList);

  }


  onSelectHandler(dId) {
    this.appointmentService.getAppointmentsByDoctorId(dId)
      .subscribe((res: any[]) => {
        console.log(res);
        this.appointmentList = res;
      });

    console.log(this.bookForm.value.patientId);
    this.doctorId = dId;
    this.appointmentData.doctorId = dId;
    this.appointmentData.patientId = sessionStorage.getItem('userId');
    console.log(this.appointmentData.doctorId);
    console.log(this.appointmentData.patientId);

  }




  showSlot() {
    // console.log(this.bookForm.value.appointmentDate);
    this.slotList = ['9', '10', '17', '18', '19', '21'];
    console.log("in show Slot. date=" + this.selDate.val());
    this.appointmentList.forEach(appointment => {
      this.slotList.forEach(slot => {
        if (appointment.time == slot && this.selDate.val() === appointment.appointmentDate) {
          console.log("inside");
          const index: number = this.slotList.indexOf(slot);
          this.slotList.splice(index, 1);
        }
      });
    });
    console.log(this.slotList);
  }


  async onBookHandler(bookForm: any) {
    console.log(bookForm);
    console.log(bookForm.value);
    bookForm.value.doctorId = this.doctorId;
    bookForm.value.patientId = sessionStorage.getItem('userId');

    let res: any = await this.appointmentService.createAppointment(bookForm.value);


    console.log(res);
    // this.router.navigate(['/patients'])


  }

  onClickButton() {
    let id = this.bookForm.value.patientId;
    this.router.navigate(['/patients', id])
  }

  checkDate() {
    this.selDate = $("#appointmentDate");
    console.log("in check date. date=" + this.selDate.val());
    let d = this.selDate.val();
    console.log("date0=" + d[0]);
    let yy: number = 0;
    let mm: number = 0;
    let dd: number = 0;
    yy = Number(d[0] + d[1] + d[2] + d[3]); mm = Number(d[5] + d[6]); dd = Number(d[8] + d[9]);
    let dateObj = new Date(yy, mm - 1, dd);
    console.log("dateObj=" + dateObj + "----" + yy + " " + mm + " " + dd);
    var fullDate = new Date()
    console.log("today=" + fullDate);
    let tt: number = dateObj.getTime();
    let td: number = fullDate.getTime();
    console.log("curDate=" + tt);
    console.log("todays daye=" + td);
    console.log("befpre");
    console.log("gg" + (tt < td));
    console.log(tt);
    console.log(td);

    if ((tt < td) == true) {
      console.log("beforeeee");
      $("#appointmentDate").val('');
      $("#dateErr").text("Enter a valid date, of future please.");
    }
   // else {
     // $("#dateErr").text("");

    //}
    
    else if(tt-td>5304911023){
      console.log("more than 3 months = "+(tt-td));
      $("#appointmentDate").val('');
      $("#dateErr").text("Enter a valid date, not later than 3 months please.");
    }
    else{
    $("#dateErr").text("");
    }
  }
  }


