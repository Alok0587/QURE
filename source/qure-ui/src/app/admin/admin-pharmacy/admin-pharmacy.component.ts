import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/ordermedicines/order.service';

@Component({
  selector: 'app-admin-pharmacy',
  templateUrl: './admin-pharmacy.component.html',
  styleUrls: ['./admin-pharmacy.component.scss']
})
export class AdminPharmacyComponent implements OnInit {
  
  orderId:string;
  medicineId:string;
  medicineList: any[];
  orderList:any[];
  orderSubscription: Subscription;
  medicineData: any;
  orderData: any;
  showOrders: boolean;
  showMedicines:boolean;
  constructor(private orderService: OrderService, private route: ActivatedRoute, public router: Router) {
    this.showOrders = false;
    this.showMedicines = false;
  }

  ngOnInit() {
  }

  async viewOrders()
  {
    
    this.orderSubscription = await this.orderService.getOrders()
      .subscribe( (res: any) => { 
        console.log( res );
        this.orderList = res;
      });
      this.showOrders = true;
      this.showMedicines = false;
  }

  async viewMedicines()
  {
    
    this.orderSubscription = await this.orderService.getMedicines()
      .subscribe( (res: any) => { 
        console.log( res );
        this.medicineList = res;
      });
      this.showOrders = false;
      this.showMedicines = true;
  }

  async onOrderViewHandler(orderId){

    console.log(orderId);
    this.orderSubscription = await this.orderService.getOrderById(orderId)
      .subscribe( (res: any) => { 
        console.log( res );
        this.orderData = res;
        console.log("order data  "+this.orderData);
      });


   
    //this.duplicateAppointmentData = JSON.parse(JSON.stringify(this.appointmentData));
  }

  async onMedicineViewHandler(medicineId){

   
    console.log(medicineId);
    this.orderSubscription = await this.orderService.getMedicineById(medicineId)
      .subscribe( (res: any) => { 
        console.log( res );
        this.medicineData = res;
      });


   //licateAppointmentData = JSON.parse(JSON.stringify(this.appointmentData));
  }
   async onOrderDeleteHandler(orderId)
{
  let res = await this.orderService.deleteOrder(orderId)
    .subscribe((res: any[]) => {
      console.log(res);
      
    });
    console.log(res);

}
 async onMedicineDeleteHandler(medicineId)

{
  let res = await this.orderService.deleteMedicine(medicineId)
  .subscribe((res: any[]) => {
    console.log(res);
    
  });
  console.log(res);
}

}
