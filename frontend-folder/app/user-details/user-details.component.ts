import { Component, OnInit } from '@angular/core';
import{ User } from "src/app/models/User";
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { UserService } from '../user.service';
import { AppartmentService } from '../appartment.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  current:User;

  constructor(private route: ActivatedRoute,private userHttp:UserService,private appHttp:AppartmentService) { }

  ngOnInit(): void {
    let arr=this.route.snapshot.params.userName.split(":");
    let userN=arr[1];
    this.userHttp.getUser(userN).subscribe(
      data=>{
          this.current=data;
          console.log(data);
      }
  );
  }
  confirmRequest(){
    this.userHttp.confirmRequest(this.current.userName);
  }
  GetUserApps(){
    this.appHttp.getAppartmentsByOwnerNameBlob(this.current.userName).subscribe(
      res=>{
        console.log(res);
        saveAs(res,"")
      }
    );
  }
  GetUserAppsXML(){
    this.appHttp.getAppartmentsByOwnerNameBlobXML(this.current.userName).subscribe(
      res=>{
        console.log(res);
        saveAs(res,"")
      }
    );
  }
  GetUserReviews(){
    this.appHttp.getReviewByOwnerName(this.current.userName).subscribe(
      res=>{
        saveAs(res,"");
      }
    )
  }
  GetUserReviewsXML(){
    this.appHttp.getReviewByOwnerNameXML(this.current.userName).subscribe(
      res=>{saveAs(res,"")}
    );
  }
  getConducterRevies(){
    this.appHttp.getReviewsByConductor(this.current.userName).subscribe(
      res=>{
        saveAs(res,"");
      }
    )
  }
  getConducterReviesXML(){
    this.appHttp.getReviewsByConductorXml(this.current.userName).subscribe(
      res=>{
        saveAs(res,"");
      }
    )
  }
  getBookingsHost(){
    this.appHttp.getBookingsByHost(this.current.userName).subscribe(
      res=>{
        saveAs(res,"");
      }
    )
  }
  getBookingsHostXML(){
    this.appHttp.getBookingsbyHostXML(this.current.userName).subscribe(
      res=>{
        saveAs(res,"");
      }
    )
  }
  getBookingsClient(){
    this.appHttp.getBookingsByClient(this.current.userName).subscribe(
      res=>saveAs(res,"")
    );
  }
  getBookingsClientXML(){
    this.appHttp.getBookingsByClientXML(this.current.userName).subscribe(
      res=>saveAs(res,"")
    );
  }
}
