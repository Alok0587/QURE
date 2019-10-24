import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ChatComponent} from './chat.component'
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import * as $ from "jquery";


export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8888/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
    flag:boolean=false;
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
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
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
            $("#convo").append("<h4 class='font-italic' style='color:blue;'>"+"<i class='fa fa-user-circle-o fa-lg' aria-hidden='true'>"+"</i>"+"&nbsp;"+"You:"+"</h4>");
            this.flag=false;

        }
        else{
            $("#convo").append("<h4 class='font-italic' style='color:blue;' >"+"<i class='fa fa-user-circle-o fa-lg' aria-hidden='true'>"+"</i>"
            +"&nbsp;"+"User:"+"</h4>");
        }
        this.appComponent.recievedMessage(JSON.stringify(message.body));
        

        
    }
}