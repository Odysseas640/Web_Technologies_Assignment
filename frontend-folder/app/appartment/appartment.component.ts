import { Component, OnInit } from '@angular/core';
import {User} from 'src/app/models/user'
import {UserService} from 'src/app/user.service'
import { AppartmentService } from '../appartment.service';
import {appartment} from 'src/app/models/appartment';
import { Observable } from 'rxjs';
import { review } from '../models/review';
import { ImageModel } from '../models/ImageModel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appartment',
  templateUrl: './appartment.component.html',
  styleUrls: ['./appartment.component.css']
})
export class AppartmentComponent implements OnInit {

  p: number = 1;
  usr:User;
  Country:String="";

  neighborhood:String="";
  City:String="";
  location:String="Select neighborhood,city,country";
  wifi:Boolean;
  pets:Boolean;
  appartmentTypes:String[]=["private flat","shared room","full house"]
  desiredType:String;
  parking:Boolean;
  ac:Boolean;
  smoking:Boolean;
  tv:Boolean;
  elevator:Boolean;
  allApartments:appartment[]=new Array();
  input1:Observable<appartment[]>;
  show:Boolean;
  startD:String;
  endD:String;
  maxCost:Number
  collection=[];
  capacity:number;
  Pictures: Record<number,ImageModel>;
  imageList:ImageModel[]

  constructor(private router : Router, private userhttp:UserService,private apphttp:AppartmentService,private http:HttpClient) {
    //this.apphttp.getAllAppartments().subscribe(data => this.allApartments=data);
   }

  ngOnInit(): void {
    this.usr=this.userhttp.getLastUsr();
    this.show=false;
    this.maxCost=999999999;
    this.desiredType="nada" ; //default // no preferenece
  }

  formatDate(inputDate:String){
    let Arr=inputDate.split("-");
    console.log(Arr[2])
    let day=Arr[2];
    let month=Arr[1];
    let year=Arr[0];
    var result:String;
    if(day.charAt(0)=='0')
      result=day.charAt(1).toString();
    else
      result=day
    result=result+"-";
    if(month.charAt(0)=='0')
      result+=month.charAt(1).toString();
    else result+=month
  
    result=result+"-"+year;
    console.log(result);
    return result;
  }
  byLocation():void{
    var splitted=this.location.split(",");
    this.neighborhood=splitted[0];
    this.City=splitted[1];
    this.Country=splitted[2];    
    this.startD=this.formatDate(this.startD.toString());
    this.endD=this.formatDate(this.endD.toString())
    this.router.navigateByUrl("search/:startD:"+this.startD
    +"/:endD:"+this.endD+"/:capacity:"+this.capacity
    +"/:country:"+this.Country+"/:city:"+this.City+"/:neighborhood:"+this.neighborhood+
    "/:wifi:false/:tv:false/:pets:false/:parking:false/:desiredType:none/:ac:false/:smoking:false/:elevator:false/:maxCost:9999999"); 
  }
  getAverage(array: review[]):number{
    var average:number=0;
    console.log(array)
    for(let i=0;i<array.length;i++){
     average+=array[i].number;
    }
    average=average/array.length;
    if(isNaN(average))
      return 0;
    return average;
  }

}
