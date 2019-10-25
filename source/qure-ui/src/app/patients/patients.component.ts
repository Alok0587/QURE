import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from './patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointments/appointment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DoctorService } from '../doctors/doctor.service';
import {AddAppointmentComponent} from '../appointments/add-appointment/add-appointment.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patientData: any;
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

    this.searchForm = new FormGroup({
      // Step2: Create Form Control
      city: new FormControl(),
      specialization: new FormControl()
    });
  }

  ngOnInit() {
    const _patientId: string = this.route.snapshot.paramMap.get('id');



    this.patientSubscription = this.patientService.getPatientById(_patientId)
      .subscribe((res: any) => {
        console.log(res);
        this.patientData = res;
      });

    this.appointmentSubscription = this.appointmentService.getAppointmentsByPatientId(_patientId)
      .subscribe((res: any[]) => {
        console.log(res);
        this.appointmentList = res;
      });
  }

  async onViewHandler(appId) {

    console.log(appId);
    this.appointmentSubscription2 = await this.appointmentService.getAppointmentById(appId)
      .subscribe((res: any) => {
        console.log(res);
        this.appointmentData = res;
      });
    //this.duplicateAppointmentData = JSON.parse(JSON.stringify(this.appointmentData));
  }

  // onBookAppointmentHandler(pId: any){
  //   this.router.navigate(['appointments/' + pId])
  // }

  async onSearchDoctorHandler(pid) {
    console.log(pid+"Patient id"+this.searchForm.value.city);
    this.doctorList = await this.doctorService.filterDoctor(this.searchForm.value.city,this.searchForm.value.specialization);

    

  }
  async onDeleteHandler(aId: any) {
    let res = await this.appointmentService.deleteAppointment(aId)
      .subscribe((res: any[]) => {
        console.log(res);
        this.appointmentList = res;
      });
    console.log(res);
  }
  async onUpdateHandler(formData) {

    let res = await this.appointmentService.updateAppointment(this.duplicateAppointmentData)
    console.log(res); // 2. get the resp from service
  }

  onBookPatientHandler(id) {
    console.log("Id: " + id);

    this.router.navigate(['patients/bookmedicine/', id]);
  }

  onEditHandler() {

    this.duplicatePatientData = JSON.parse(JSON.stringify(this.patientData));
    console.log(this.duplicatePatientData);
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
    }
  }
  onSelectHandler(dId)
  {
    console.log(dId);

    this.addAppointment.onDoctorSelect(dId);
    const _patientId_: string = this.route.snapshot.paramMap.get('id');

    console.log(_patientId_);
    this.router.navigate(['/appointments',_patientId_]);

    //this.router.navigate()
  }

}
