  import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {User} from 'src/app/models/User'
import { message } from '../models/message';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { AppartmentService } from '../appartment.service';
import { Booking } from '../models/booking';
import { Chat } from '../models/Chat';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loginOk:Boolean;
  myBookings:Booking[];
  reviewedBookings:Booking[];
  p: number = 1;
  p2:number=1;
  p3:number=1;
  p4:number=1;
  temp:number=0;
  reply:Boolean;
  public testUsr:User;
  ShowMessages:Boolean;
  show:Boolean;
 // myChat:Chat[];
 myChat:Map<number,message[]>=new Map();
  messages:message[] //{[id:number],message[]}
  constructor(public http:UserService,private router :Router,private appHttp:AppartmentService,private route:ActivatedRoute,private messageHttp:MessageService) { }

  ngOnInit(): void {
    this.loginOk=false;
    this.reviewedBookings=new Array();
    this.ShowMessages=false;
    let arr=this.route.snapshot.params.userName.split(":");
    let userN=arr[1];
    this.http.getUser(userN).subscribe(
      data=>{
          this.testUsr=data;
          console.log(data);
          this.appHttp.getBookinsByClientObservable(this.testUsr.userName)
          .subscribe(
            res=>{
                this.myBookings=res;
                console.log(res);
                this.myBookings.forEach(element=>{
                  console.log(element.hasReviewed);
                  if(element.hasReviewed)
                  {
                    console.log(element);
                    this.reviewedBookings.push(element);
                    this.myBookings.filter(
                      obj=>obj!=element);
                 /*   this.myBookings.splice(this.myBookings.indexOf(element))*/
                  }
                })
            }
          )
          this.messageHttp.getAllMessagesByUsr(userN).subscribe(
            result=>{
              console.log(result);
              this.messages=result;
              this.messages.sort((a,b) => (a.app_id > b.app_id) ? 1 : ((b.app_id > a.app_id) ? -1 : 0))
              this.messages.forEach(element => {
                console.log(element.answered);
                if(element.answered==true)
                {
                  this.messages=this.messages.filter(obj=>obj!==element);

                }
              });
          })

  });
  }

  DeleteMessage(id:number){
    this.messageHttp.deleteMessage(id)
  }
  MarkMessage(id:number){
    this.messageHttp.markMessage(id);
    alert("MESSAGE HAS BEEN MARKED SUCCESSFULY")
    window.location.reload();
  }
  Reply(receiver,app_id){
    this.router.navigateByUrl("/chat/:receiver:"+receiver+"/:appartment:"+app_id);
  }
 
  reset(){
    this.reply=false;
  }
  logout():void{
    this.http.logout();
    this.show=false;
    this.router.navigateByUrl("/");

     
  }
  rateAppartment(bookingId:number,id:number,value:number){
    if(value <0 || value >5){
      alert("PLEASE KEEP THE VALUE BETWEEN 0 AND 5")
        return;
    }
    this.appHttp.addReview(this.testUsr.userName,id,value,"no-comment");
    this.http.markBooking(bookingId);
    alert("REVIEW HAS BEEN UPLOADED SUCCESSFULLY THANK YOU")
  }
}
