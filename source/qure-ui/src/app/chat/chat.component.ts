

import { Component } from '@angular/core';
import { WebSocketAPI } from './WebSocketAPI';
import * as $ from "jquery";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  

  title = 'angular8-springboot-websocket';

  webSocketAPI: WebSocketAPI;
  name: string;
  convo: string;
  msg: string;

  date: string = new Date().toLocaleString();
  parser: string[];
  
  ngOnInit() {

    this.webSocketAPI = new WebSocketAPI(new ChatComponent());
    this.webSocketAPI._connect();
    document.getElementById("activity").innerHTML="<b><div class='fa-1x' style='color:green'><i class='fas fa-circle-notch fa-spin'>&nbsp;</i>Available </div>";


  }

  // connect() {
  //   this.webSocketAPI._connect();
  //   $("#connected").attr("disabled", true);
  //   $("#disconnected").attr("disabled", false);
  //   this.delay(1000);
  //   document.getElementById("activity").innerHTML="<p style='color:green'><b>Available</p>";
  //   console.log("connection started after loading the html page");


  // }

  disconnect() {
    this.webSocketAPI._disconnect();
    document.getElementById("activity").innerHTML="<p style='color:red'><b>Not Available</p>";


  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }
  recievedMessage(message) {
    this.convo = JSON.parse(message);
    console.log(message.class);
    this.msg = this.convo.slice(13, this.convo.length - 2);
     $("#convo").append("<tr><td>"+"<button type= 'button' class='btn' style='float:left; background-color:#566573 ' >" + "<h5  style='color:white;'>"  +this.msg + "</h5>" + "<span class='time-left text-muted'>"+this.date+"</span>"+"</button>"+"</tr></td>"); 

  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}
}

//js of ui
