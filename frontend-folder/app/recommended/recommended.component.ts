import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AppartmentService } from '../appartment.service';
import { CollaborationService } from '../collaboration.service';
import { User } from '../models/User';
import { appartment } from '../models/appartment';
import { DatePipe } from '@angular/common';

declare var ol: any;

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
 map:any;
  usr:User;
  startD:String;
  endD:String;
  appList:appartment[];
  constructor(private datePipe:DatePipe,private userHttp:UserService,private appHttp:AppartmentService,private colabHttp:CollaborationService) { }
 
  ngOnInit(): void {
    this.startD=new Date().toString();
    this.startD=this.datePipe.transform(this.startD,'dd-MM-yyyy');
    const today =  new Date();
    let tomorrow=new Date(today.setDate(today.getDate() + 1));
    this.endD=this.datePipe.transform(tomorrow,'dd-MM-yyyy');
    this.userHttp.getLoggedInUser().subscribe(
      data=>{
        this.userHttp.getUser(data).subscribe(
          res=>this.usr=res
        )
        this.colabHttp.getRecomended(data).subscribe(
          result=>{
            this.appList=result;
            console.log(result);
          }
        )
      }
    )
  }

  
}
