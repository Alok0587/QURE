import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.scss']
})
export class DoctorLoginComponent implements OnInit {
  loginForm: FormGroup;
  validLogin = false;
  regStatus:boolean = false;
  dSubscription: Subscription;
  dData: any;

  message: any;

  passwordnew:string;
  passwordconfirm:string;
  isSaved2: boolean;
  emailid:string;
  password:string;

  constructor(private doctorService: DoctorService, public router: Router, private route :ActivatedRoute) {

    if(this.route.snapshot.paramMap.get('regStatus')){
      this.regStatus = true;
    }

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password:new FormControl()
   });
   }

   onForgotHandler(p1,p2)
  {

    console.log(p1+" "+p2);
    if(p1===p2)
    {
      console.log("Passwords match");
      this.password = p1;
    }
    else{
      console.log("Don't match")
    }
    //this.
  }
  async onDoctorUpdateHandler(formData)
  {
    console.log(formData);
   // console.log(formData.value);

    console.log(this.emailid);
    

    var newpass =this.password;
  //obj.id = this.patientId;
  console.log(newpass);

    let res = await this.doctorService.updatePassword(this.emailid,newpass);
    console.log(res);
    if (res) {
      this.isSaved2 = true;
      this.ngOnInit();
    }

  }

   async onSubmitButton2() {
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
    let x = await this.doctorService.authenticate(this.loginForm.value.email, this.loginForm.value.password);
    if (x)
    {
      this.validLogin = true;
      console.log("logged in");
      this.router.navigate(['doctors']);
      console.log("logged in");
      
      
    } else
    {
      this.validLogin = false;
      console.log("CAN'TTTTTTTTTTTTTTTTTTTTTTTTT");
      this.message="Can't login. Please check your credentials.";
   
      
    }
      
  }

  ngOnInit() {
  }

}
