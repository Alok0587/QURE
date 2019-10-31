import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})

export class AdminloginComponent implements OnInit {

  loginForm: FormGroup;
  validLogin: boolean = false;

  constructor(public router: Router, private adminService: AdminService) {
    this.loginForm = new FormGroup({

      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmitButton() {
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
    let x = await this.adminService.authenticate(this.loginForm.value.email, this.loginForm.value.password);
    if (x)
    {
      this.validLogin = true;
      console.log("logged in");
      this.router.navigate(['/adminlogin/admin']);
      console.log("logged in");
    } else
      this.validLogin = false;
  }

  ngOnInit() {
  }

}
