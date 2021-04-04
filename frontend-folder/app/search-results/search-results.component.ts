import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AppartmentService } from '../appartment.service';
import { appartment } from '../models/appartment';
import { review } from '../models/review';
import { CollaborationService } from '../collaboration.service';
//import { Console } from 'console';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  wifi:Boolean=false;
  showReqs=true;
  pets:Boolean=false;
  appartmentTypes:String[]=["private flat","shared_room","full house","none"]
  desiredType:String="none";
  parking:Boolean=false;
  usn:String;
  ac:Boolean=false;
  smoking:Boolean=false;
  tv:Boolean=false;
  elevator:Boolean=false;
  country:String;
  city:String;
  neighborhood:String;
  capacity:number;
  startD:String;
  p: number = 1;
  endD:String;
  maxCost:number=99999;
  appList:appartment[];
  constructor(private colabHttp:CollaborationService,private route: ActivatedRoute,private userHttp:UserService,private appHttp:AppartmentService,private router:Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  //we need location dates and capacity from url, we will deal with aditional constraints here
  ngOnInit(): void {
   // this.desiredType="private flat";
   this.wifi=this.route.snapshot.params.wifi.split(":")[2].toLowerCase() == 'true';
   console.log(this.wifi);
   this.desiredType=this.route.snapshot.params.desiredType.split(":")[2];
   console.log(this.desiredType)
    this.ac=this.route.snapshot.params.ac.split(":")[2].toLowerCase() == 'true';
    this.tv=this.route.snapshot.params.tv.split(":")[2].toLowerCase() == 'true';
    this.pets=this.route.snapshot.params.pets.split(":")[2].toLowerCase() == 'true';
    this.parking=this.route.snapshot.params.parking.split(":")[2].toLowerCase() == 'true';
    this.smoking=this.route.snapshot.params.smoking.split(":")[2].toLowerCase() == 'true';
    this.elevator=this.route.snapshot.params.elevator.split(":")[2].toLowerCase() == 'true';
    this.maxCost=this.route.snapshot.params.maxCost.split(":")[2];
    this.startD=this.route.snapshot.params.startD.split(":")[2];
    this.endD=this.route.snapshot.params.endD.split(":")[2];
    this.capacity=this.route.snapshot.params.capacity.split(":")[2];
    this.country=this.route.snapshot.params.country.split(":")[2];
    this.city=this.route.snapshot.params.city.split(":")[2];
    this.neighborhood=this.route.snapshot.params.neighborhood.split(":")[2];
    this.appHttp.getAppartmentsBylocation(this.country,this.city,this.neighborhood,this.startD,this.endD,this.capacity).subscribe(
      data=>{
        this.appList=data;
        console.log(data);
        this.appList.forEach(
          element => {
            console.log(element.id);
            this.appHttp.getReviews(element.id).subscribe(
              res=>{element.reviews=res
                console.log(res)
              element.numberOfReviews=res.length
              }
        );}) 
              this.setFilters();

              this.appList.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
      }
    )
  this.userHttp.getLoggedInUser().subscribe(
    usn=>{
      this.usn=usn;
      this.colabHttp.storeSearch(usn,this.startD,this.country+"+"+this.city+"+"+this.neighborhood);

    }
  )
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
setFilters() //worst case all url parameters ,by default false
{
  this.appList.forEach(
    element=>
    {
      if(this.desiredType!="none" && element.type!=this.desiredType)
        {
          console.log(this.desiredType,element.type);
          this.appList=this.appList.filter(obj=>obj!==element);
          //delete this.appList[this.appList.indexOf(element)]
        }
      if(this.elevator==true && element.hasElevator==false)
        this.appList=this.appList.filter(obj=>obj!==element);
      if(this.ac==true && element.hasheat==false)
        this.appList=this.appList.filter(obj=>obj!==element);
      if(this.tv==true && element.hasTv==false)
      this.appList=this.appList.filter(obj=>obj!==element);
      if(this.parking==true && element.hasParking==false)
      this.appList=this.appList.filter(obj=>obj!==element);
      if(this.pets==true && element.allowPets==false)
      this.appList=this.appList.filter(obj=>obj!==element);
      if(this.smoking==true && element.allowSmoking==false)
      this.appList=this.appList.filter(obj=>obj!==element);
      if(this.maxCost < element.price)
      this.appList=this.appList.filter(obj=>obj!==element);
    }
  )
}
ApplyFilters() 
{
  let url="search/:startD:"+this.startD+"/:endD:"+this.endD+"/:capacity:"+this.capacity+
  "/:country:"+this.country+"/:city:"+this.city+"/:neighborhood:"+this.neighborhood+
  "/:wifi:"+this.wifi+"/:tv:"+this.tv+"/:pets:"+this.pets+"/:parking:"+this.parking+
  "/:desiredType:"+this.desiredType+"/:ac:"+this.ac+"/:smoking:"+this.smoking+
  "/:elevator:"+this.elevator+"/:maxCost:"+this.maxCost;
  console.log(url);
 this.router.navigateByUrl(url);
 //window.location.reload(); 

}
hideReqs(){
  this.showReqs=false;
}
}
