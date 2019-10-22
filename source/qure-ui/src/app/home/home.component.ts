import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   openNav() {
    document.getElementById("mySidenav").style.width = "350px";
  }
  
   closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  constructor() { 
  }

  ngOnInit() {
  }

}