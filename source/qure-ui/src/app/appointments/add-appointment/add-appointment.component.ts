import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../appointment.service';
import { DoctorService } from 'src/app/doctors/doctor.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  
  // appointmentList: any[];
  appointmentSubscription: Subscription;
  doctorList: any[];

  appointmentForm: any;
  appId: string;
  bookForm: FormGroup;
  searchForm: FormGroup;
  doctorId: any;
  appointmentData={
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    price: 500,
    time: ""

  }



  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, public router: Router, private doctorService: DoctorService) {
    
   }

  ngOnInit() {
    // const _dId = this.onReturn();
    // const patientId: string = this.route.snapshot.paramMap.get('id');
    const _patientId: string = sessionStorage.getItem('userId');
    console.log(_patientId)
    this.bookForm= new FormGroup({
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

  //   this.appointmentForm = new FormGroup({
  //     // Step2: Create Form Control
  //     doctorId: new FormControl('', [
  //       Validators.required,
        
  //     ]),
  //     patientId: new FormControl('', [
  //       Validators.required,
        
  //     ]),
  //     time: new FormControl('', [
  //       Validators.required,
        
  //     ]),
  //     date: new FormControl('', [
  //       Validators.required,
        
  //     ])

  //   // let user = sessionStorage.getItem('userId');
  // })
}
  async onSearchDoctorHandler() {
    let pid = sessionStorage.getItem('userId');
    console.log(pid+" city id "+this.searchForm.value.city);
    console.log(pid+" sped is id "+this.searchForm.value.specialization);
    this.doctorList = await this.doctorService.filterDoctor(this.searchForm.value.city,this.searchForm.value.specialization);
    console.log("doctors list" + this.doctorList);

    

  }
  onSelectHandler(dId)
  {
    // console.log(dId);
    console.log(this.bookForm.value.patientId);
    this.doctorId=dId;
    this.appointmentData.doctorId=dId;
    this.appointmentData.patientId=sessionStorage.getItem('userId');
    console.log(this.appointmentData.doctorId);
    console.log(this.appointmentData.patientId);
    // this.addAppointment.onDoctorSelect(dId);
    // this.bookForm.value.patientId = sessionStorage.getItem('userId');
    // this.bookForm.value.doctorId = dId;
    // this.newAppointmentData.doctorId=dId;
    // console.log(_patientId_);
    // this.router.navigate(['/appointments',_patientId_]);

    //this.router.navigate()
  }







  

  //  onReturn()
  // {
  //   return this.appId;
  // }

  async onBookHandler(bookForm: any){
    console.log(bookForm);
    console.log(bookForm.value);
    bookForm.value.doctorId=this.doctorId;
    bookForm.value.patientId=sessionStorage.getItem('userId');
    
    let res: any = await this.appointmentService.createAppointment(bookForm.value);


    console.log(res);
    // this.router.navigate(['/patients'])

 
  }

  onClickButton()
  {
    let id=this.bookForm.value.patientId;
    this.router.navigate(['/patients',id])
  }
}
