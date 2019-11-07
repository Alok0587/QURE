import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-medicine',
  templateUrl: './book-medicine.component.html',
  styleUrls: ['./book-medicine.component.scss']
})
export class BookMedicineComponent implements OnInit {

  medicineList : any[];
  medicineSubscription: Subscription;
  medicineId: string;

  patientId : string;

  medicineBookedData :any;
  
  constructor(private orderService : OrderService,private route: ActivatedRoute ) { }

  ngOnInit() { // lifecycle hook
    console.log("inside ngOnInit");

    this.medicineSubscription = this.orderService.getMedicines()
      .subscribe((res: any[]) => {
        console.log(res);
        this.medicineList = res;
      });

  
    }
    async onBookHandler(medId:string,medicineName:any){

      const _patientId: string = this.route.snapshot.paramMap.get('pid');
      const _appId : string = this.route.snapshot.paramMap.get('appid');


      console.log("PatientID: "+ _patientId+" Appointment Id: "+_appId);
      
      this.medicineBookedData =  {
      
        'medicineId' : medId,
        'appointmentId': _appId,
        'patientId': _patientId,
        'medicineName': medicineName
        

      };
      let res: any = await this.orderService.createOrder(JSON.parse(JSON.stringify(this.medicineBookedData)));
      console.log(res);
    }

}
