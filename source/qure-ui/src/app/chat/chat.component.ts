

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
  }

  connect() {
    this.webSocketAPI._connect();
    $("#connected").attr("disabled", true);
    $("#disconnected").attr("disabled", false);
    document.getElementById("activity").innerHTML="<p style='color:green'><b>Available</p>";


  }

  disconnect() {
    this.webSocketAPI._disconnect();
    $("#disconnected").attr("disabled", true);
    $("#connected").attr("disabled", false);
    document.getElementById("activity").innerHTML="<p style='color:red'><b>Not Available</p>";


  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }
  recievedMessage(message) {
    this.convo = JSON.parse(message);
    console.log(message.class);
    this.msg = this.convo.slice(13, this.convo.length - 2);
     $("#convo").append("<tr><td>"+"<button class='btn btn-info' style='float:left'>" + "<h5  style='color:white;'>"  +this.msg + "</h5>" + "<span class='time-left text-muted'>"+this.date+"</span>"+"</button>"+"</tr></td>"); 




  }
}

//js of ui
