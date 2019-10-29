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

  constructor(private doctorService: DoctorService, public router: Router, private route :ActivatedRoute) {

    if(this.route.snapshot.paramMap.get('regStatus')){
      this.regStatus = true;
    }

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password:new FormControl()
   });
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
      this.validLogin = false;
  }

  ngOnInit() {
  }

}
