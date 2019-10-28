import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from './patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointments/appointment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DoctorService } from '../doctors/doctor.service';
import {AddAppointmentComponent} from '../appointments/add-appointment/add-appointment.component';
import { ConcatSource } from 'webpack-sources';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patientData: any;
  pData: any;
  duplicatePatientData: any;
  patientSubscription: Subscription;
  patientId: string;
  isSaved2: boolean = false;
  searchForm: FormGroup;
  doctorList: any[];


  appointmentList: any[];
  appointmentSubscription: Subscription;

  appointmentSubscription2: Subscription;

  duplicateAppointmentData: any;
  appointmentData: any;
  appId: string;
  doctorData: any;

  constructor(private addAppointment: AddAppointmentComponent,private appointmentService: AppointmentService,private doctorService:DoctorService,  private patientService: PatientService, private route: ActivatedRoute, public router: Router) {

    
  }

  async ngOnInit() {
    // const _patientId: string = this.route.snapshot.paramMap.get('id');
    let pEmail = sessionStorage.getItem('username');

    this.patientSubscription = this.patientService.getPatientByEmail(pEmail)
      .subscribe(async (res: any) => {
        console.log(res);
        this.patientData = await res;
        console.log("current Patient is"+ this.patientData.patientId);
      });
      console.log("here I am");
  }
  
  async onViewAppointmentList(){
    this.appointmentSubscription = this.appointmentService.getAppointmentsByPatientId(this.patientData.patientId)
      .subscribe(async (res: any[]) => {
        console.log(res);
        this.appointmentList = await res;
      });
  }

  onEditHandler() {
    this.duplicatePatientData = JSON.parse(JSON.stringify(this.patientData));
    console.log(this.duplicatePatientData);
    console.log("inside onEdit handler");
  }

  async onPatientUpdateHandler(formData) {
    console.log(formData);
    console.log(formData.value);

    var obj = formData.value;
    obj.id = this.patientId;

    let res = await this.patientService.updatePatient(this.duplicatePatientData);
    console.log(res);
    if (res) {
      this.isSaved2 = true;
      this.ngOnInit();
    }
  }

  onBookAppointmentHandler(pId) {
    console.log("Id: " + pId);
    sessionStorage.setItem('userId', this.patientData.patientId)
      let user = sessionStorage.getItem('userId');
      console.log("userId" + user);

    this.router.navigate(['patients/appointments/', pId]);
  }




  onBookPatientHandler(pId) {
    console.log("Id: " + pId);

    this.router.navigate(['patients/bookmedicine/', pId]);
  }


  async onViewHandler(appointmentData) {
    console.log(appointmentData);
    this.duplicateAppointmentData = JSON.parse(JSON.stringify(appointmentData));
    console.log("duplicate is " + this.duplicateAppointmentData);    
  }

  // onBookAppointmentHandler(pId: any){
  //   this.router.navigate(['appointments/' + pId])
  // }


  async onDeleteHandler(aId: any) {
    this.appointmentService.deleteAppointment(aId);
    this.onViewAppointmentList();
  }
  
  async onUpdateHandler(formData) {
    console.log("inside update app" + this.duplicateAppointmentData);
    let res = await this.appointmentService.updateAppointment(this.duplicateAppointmentData);
    this.onViewAppointmentList();
  }

  
  
  ngOnDestroy() {
    this.patientSubscription.unsubscribe();
    // this.appointmentSubscription.unsubscribe();
    // this.appointmentSubscription.unsubscribe();

}

}
