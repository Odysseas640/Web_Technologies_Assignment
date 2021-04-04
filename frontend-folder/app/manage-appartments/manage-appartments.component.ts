import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import {appartment} from 'src/app/models/appartment';
import { AppartmentService } from '../appartment.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-appartments',
  templateUrl: './manage-appartments.component.html',
  styleUrls: ['./manage-appartments.component.css']
})
export class ManageAppartmentsComponent implements OnInit {

  usr:User
  appartmentList:appartment[];
  p:number=0;
  averageReview:Number;
  constructor(private usrHttp:UserService ,private appHttp:AppartmentService) {       }

  ngOnInit(): void {
    this.usrHttp.getLoggedInUser().subscribe(
      data=>{
        console.log(data);
        this.usrHttp.getUser(data).subscribe(
          res=>
          {
            this.usr=res
            this.appHttp.getAppartmentsByOwnerName(this.usr.userName).subscribe(
              data=>this.appartmentList=data
            );
          }
        )
      }
    )
   
  }
 getAverage(array:number[]):number{
   var average:number=0;
   for(let i=0;i<array.length;i++){
    average=average+array[i];
   }
   average=average/array.length;
   return average;
 }
}
