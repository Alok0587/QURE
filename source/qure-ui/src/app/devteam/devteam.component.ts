import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devteam',
  templateUrl: './devteam.component.html',
  styleUrls: ['./devteam.component.scss']
})
export class DevteamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    window.scrollTo(0, 0);
    }
}
