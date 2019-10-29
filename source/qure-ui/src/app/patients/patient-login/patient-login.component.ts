import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.scss']
})
export class PatientLoginComponent implements OnInit {

  loginForm: FormGroup;
  validLogin = false;
  regStatus:boolean = false;  

  constructor(private patientService: PatientService, private route :ActivatedRoute, private router: Router) {

    if(this.route.snapshot.paramMap.get('regStatus')){
      this.regStatus = true;
    }

    // this.status=this.router.getCurrentNavigation().extras.state.status;
    this.loginForm = new FormGroup({
            // patientId: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmitButton() {
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
    let x = await this.patientService.authenticate(this.loginForm.value.email, this.loginForm.value.password);
    if (x)
    {
      this.validLogin = true;
      console.log("logged in");
      this.router.navigate(['patients']);
      console.log("logged in");
    } else
      this.validLogin = false;
  }

  ngOnInit() {    
  }

}
