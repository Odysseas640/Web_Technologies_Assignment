import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {User} from 'src/app/models/User';
import {message} from 'src/app/models/message';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { appartment } from '../models/appartment';
import { AppartmentService } from '../appartment.service';
import { MessageService } from '../message.service';
import { allowedNodeEnvironmentFlags } from 'process';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-exchange',
  templateUrl: './message-exchange.component.html',
  styleUrls: ['./message-exchange.component.css']
})
export class MessageExchangeComponent implements OnInit {

  SenderUsn:String;
  ReceiverUsn:String;
  messageText:String;
  Date:String;
  p:number =1;
  curApp:appartment;
  com_history:message[];
  constructor(private route: ActivatedRoute,private userhttp:UserService,private httpC:HttpClient,private appHtttp:
    AppartmentService, private messageHttp:MessageService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.Date=new Date().toString();
    this.Date=this.datePipe.transform(this.Date,'dd-MM-yyyy');
    console.log(this.Date)
    //let input=this.route.snapshot.params.sender;
    //this.SenderUsn=input.split(":")[2];
    ///////////////////////////
    let input=this.route.snapshot.params.receiver;
    this.ReceiverUsn=input.split(":")[2];
    input=this.route.snapshot.params.appartment;
    let appId=input.split(":")[2];
      this.httpC.get("https://localhost:8443/api/user/UserName",{ responseType: 'text'}).subscribe(
        data=>{
          this.SenderUsn=data;
          console.log(this.SenderUsn,this.ReceiverUsn); 
          this.messageHttp.getAllByDuplexAndAppartment(appId,this.SenderUsn,this.ReceiverUsn).subscribe(
            res=>{
              console.log(res);
              this.com_history=res;
              const uniqueSet=new Set(res);
              this.com_history=[...uniqueSet];
            }
          );
          }
          );
    this.appHtttp.getAppartmentById(appId).subscribe(
      data=>{
        this.curApp=data
        console.log(data);
      }
    ) ;
   
  }
  Send_Message(){
    this.messageHttp.sendMessage(this.ReceiverUsn,this.SenderUsn,this.messageText,this.Date,this.curApp.id);
    alert("Your message has been sent")
    let m=new message();
    m.senderUsn=this.SenderUsn;
    m.receiverUsn=this.ReceiverUsn;
    m.date=this.Date;
    m.text=this.messageText;
    m.appId=this.curApp.id;
    m.answered=false;
    window.location.reload();
  }
  Delete_Message(id){
    this.messageHttp.deleteMessage(id);
    alert("Message Deleted Successfully");
    window.location.reload()
  }
  
}
