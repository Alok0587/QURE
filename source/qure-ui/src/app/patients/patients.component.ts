import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from './patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointments/appointment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DoctorService } from '../doctors/doctor.service';
import { AddAppointmentComponent } from '../appointments/add-appointment/add-appointment.component';
import { ConcatSource } from 'webpack-sources';
import { OrderService } from '../ordermedicines/order.service';

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
  slotList: any;
  selDate: any;


  appointmentList: any[];
  appointmentSubscription: Subscription;

  appointmentSubscription2: Subscription;

  
  orderList: any[];
  medicineId: any;
  
  duplicateAppointmentData: any;
  appointmentData: any;
  appId: string;
  doctorData: any;
  showOrders: boolean = false;
  showAppointments : boolean = false;


  constructor(private orderService: OrderService,private addAppointment: AddAppointmentComponent, private appointmentService: AppointmentService, private doctorService: DoctorService, private patientService: PatientService, private route: ActivatedRoute, public router: Router) {
    this.slotList = ['9', '10', '17', '18', '19', '21'];

  }

  async ngOnInit() {
    // const _patientId: string = this.route.snapshot.paramMap.get('id');
    let pEmail = sessionStorage.getItem('username');

    this.patientSubscription = this.patientService.getPatientByEmail(pEmail)
      .subscribe(async (res: any) => {
        console.log(res);
        this.patientData = await res;
        console.log("current Patient is" + this.patientData.patientId);
        await this.onViewAppointmentList();

      });
    // console.log("here I am");
    //   console.log(this.patientData.patientId);
    // console.log("here I am");
    // console.log("here I am 2");
    // console.log(this.patientData.value.patientId);
    // console.log("here I am 3");
    // console.log(this.patientData.patientId);
    // console.log("here I am 4");


  }

  async onViewAppointmentList() {
    this.appointmentSubscription = this.appointmentService.getAppointmentsByPatientId(this.patientData.patientId)
      .subscribe(async (res: any[]) => {
        console.log(res);
        this.appointmentList = await res;
      });
      this.showOrders = false;
      this.showAppointments = true;
  }
  async viewOrderList(pid)
  {
    console.log(pid);
    this.patientSubscription = this.orderService.getOrdersByPatient(pid)
    .subscribe(async (res: any[]) => {
      console.log(res);
      this.orderList = await res;
     
    });
    // for(var order of orderList)
    // {
    //   this.medicineId = order.medicineId; 
    //   console.log(this.medicineId);

    // }
    this.showOrders = true;
    this.showAppointments = false;
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
    // console.log("duplicate is " + this.duplicateAppointmentData);
  }

  // onBookAppointmentHandler(pId: any){
  //   this.router.navigate(['appointments/' + pId])
  // }


  async onDeleteHandler(aId: any) {
    await this.appointmentService.deleteAppointment(aId);
    await this.onViewAppointmentList();
  }

  async onUpdateHandler(formData) {
    console.log("inside update app" + this.duplicateAppointmentData);
    let res = await this.appointmentService.updateAppointment(this.duplicateAppointmentData);
    this.onViewAppointmentList();
  }

  checkDate() {
    this.selDate = $("#appointmentDate");
    console.log("in check date2. date=" + this.selDate.val());
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

    if ((tt < td) == true) {
      console.log("beforeeee");
      $("#appointmentDate").val('');
      $("#dateErr").text("Enter a valid Date");
    }
    else {
      $("#dateErr").text("");

    }

  }

  showSlot() {
    this.slotList = ['9', '10', '17', '18', '19', '21'];
    console.log("in show Slot. date=" + this.selDate.val());
    this.appointmentList.forEach(appointment => {
      this.slotList.forEach(slot => {
        if (appointment.time == slot && this.selDate.val() === appointment.appointmentDate) {
          console.log("inside")
          const index: number = this.slotList.indexOf(slot);
          this.slotList.splice(index, 1);
        }
      });
    });
    console.log(this.slotList);
  }



  ngOnDestroy() {
    this.patientSubscription.unsubscribe();

  }

}
