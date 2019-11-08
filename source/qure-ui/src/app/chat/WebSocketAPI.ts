import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ChatComponent} from './chat.component'
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import * as $ from "jquery";


export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8888/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
    checkConnected:boolean;
    flag:boolean=false;
    ;
    appComponent: ChatComponent;
    constructor(appComponent: ChatComponent){
        this.appComponent = appComponent;
    }

    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            this.checkConnected=true;
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.checkConnected=false;

        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        document.getElementById("activity").innerHTML="<b><div class='fa-1x' style='color:red'><i class='fas fa-circle-notch fa-spin'>&nbsp;</i>Currently Not Available </div>";

        setTimeout(() => {
            this._connect();
        }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message) {
        console.log("calling logout api via web socket::sending message");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
        
        this.flag=true;
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);
        if(this.flag==true)
        {
             $("#convo").append("<h4 class='font-italic text-warning'>"+"&nbsp;"+"You:"+"</h4>");
            this.flag=false;

        }
        else{
            $("#convo").append("<h4 class='font-italic' >" +"&nbsp;"+"User:"+"</h4>");
        }
        this.appComponent.recievedMessage(JSON.stringify(message.body));
        

        
    }
}