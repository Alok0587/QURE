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
  message: any;  
  passwordnew:string;
  passwordconfirm:string;
  isSaved2: boolean;
  emailid:string;
  password:string;

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
  async onPatientUpdateHandler(formData)
  {
    //console.log(formData);
   // console.log(formData.value);

    console.log(this.emailid);
    

    var newpass =this.password;
  //obj.id = this.patientId;
  console.log(newpass);

    let res = await this.patientService.updatePassword(this.emailid,newpass);
    console.log(res);
    if (res) {
      this.isSaved2 = true;
      this.ngOnInit();
    }

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
      {
        this.validLogin = false;
        console.log("CAN'TTTTTTTTTTTTTTTTTTTTTTTTT");
        this.message="Can't login. Please check your credentials.";
      
      }
  }

  ngOnInit() {    
  }

}
