import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription, pipe } from 'rxjs';
import { AppointmentService } from '../appointment.service';
import { DoctorService } from 'src/app/doctors/doctor.service';
import * as $ from 'jquery';
import { PatientService } from 'src/app/patients/patient.service';
@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  // appointmentList: any[];
  // appointmentSubscription: Subscription;
  doctorList: any[];
  appointmentList: any[];
  slotList: any; 
  searchForm: FormGroup;
  selDate: any;
  patientData: any;
  appointmentData = {
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    price: 500,
    time: "",
    patientName: "",
    doctorName: ""
  }



  constructor(private patientService: PatientService, private appointmentService: AppointmentService, 
    private route: ActivatedRoute, public router: Router, private doctorService: DoctorService) {

  }

  async ngOnInit() {
    let pEmail = sessionStorage.getItem('username');
    this.patientData = this.patientService.getPatientByEmail(pEmail)
      .subscribe(async (res: any) => {
        console.log(res);
        this.patientData = await res;
        console.log("current Patient is" + this.patientData.patientId);
      });


    const _patientId: string = sessionStorage.getItem('userId');
    console.log(_patientId);  

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

  onSelectHandler(doctor) {
    this.appointmentService.getAppointmentsByDoctorId(doctor.doctorId)
      .subscribe((res: any[]) => {
        console.log(res);
        this.appointmentList = res;
      });
    
    this.appointmentData.doctorId = doctor.doctorId;
    this.appointmentData.doctorName = doctor.name;

    this.appointmentData.patientName = this.patientData.name;
    this.appointmentData.patientId = sessionStorage.getItem('userId');
  }

  showSlot() {
    this.slotList = ['9', '10', '17', '18', '19', '20'];    
    this.appointmentList.forEach(appointment => {
      this.slotList.forEach(slot => {
        if(appointment.appointmentStatus==0){
        if (appointment.time == slot && this.selDate.val() === appointment.appointmentDate) {         
          const index: number = this.slotList.indexOf(slot);
          this.slotList.splice(index, 1);
        }
      }
      });
    });
  }


  async onBookHandler(bookForm: any) {
    let res: any = await this.appointmentService.createAppointment(this.appointmentData);
  }

  onClickButton() {
    let id = sessionStorage.getItem('userId');
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


