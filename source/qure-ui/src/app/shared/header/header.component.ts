import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/patients/patient.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.authenticationService.logOut();
    this.router.navigate(['']);
  }

}
