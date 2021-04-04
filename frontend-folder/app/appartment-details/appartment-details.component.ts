import { Component, OnInit, Input } from '@angular/core';
import { appartment } from '../models/appartment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppartmentService } from '../appartment.service';
import { UserService } from '../user.service';
import {User} from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import {ImageModel} from 'src/app/models/ImageModel';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { message } from '../models/message';
import { MessageService } from '../message.service';
import { CollaborationService } from '../collaboration.service';

declare var ol: any;

@Component({
  selector: 'app-appartment-details',
  templateUrl: './appartment-details.component.html',
  styleUrls: ['./appartment-details.component.css']
})

export class AppartmentDetailsComponent implements OnInit {

 p:number=1;
 p2:number=1;
  map: any;
has_reviewed:Boolean;
  Question:String;
  openChat:Boolean;
  userLoggedIn:Boolean;
  cur:appartment;
  userName:String;
  id:String;
  id1:number;
  Dates:String[];
  review:number;
  usr:User; 
  ownerInfo:User;
  imageList:ImageModel[];
  messages: message[];

  //averageReview:number;
  constructor(private collabHttp:CollaborationService,private messageHttp:MessageService,private httpC:HttpClient,private route: ActivatedRoute,private router:Router,private apphttp:AppartmentService,public userhttp:UserService,private http:HttpClient) { }

  ngOnInit(): void {   
    /////////////////////////////////////////
    this.userLoggedIn=this.userhttp.isAuthenticated();
    console.log(this.userLoggedIn);
    this.id=this.route.snapshot.params.id;
    console.log(this.id);
    var arr=this.id.split(":");
    this.id1=+arr[2];
    console.log(this.id1);
    this.apphttp.getAppartmentById(this.id1).subscribe(
      data=>{this.cur=data;
      console.log(this.cur);
      this.apphttp.getOwnerInfo(this.id1).subscribe(
        res=>{
          console.log(res);
          this.ownerInfo=res;
        }
      )
      this.set_up_map();
    }
    );
  this.openChat=false;  
  let sd=this.route.snapshot.params.startD;
  arr=sd.split(":");
  let StartD=arr[2];
  console.log(StartD);
  let ed=this.route.snapshot.params.endD;
  arr=ed.split(":");
  let endD=arr[2];
  console.log(endD);
  this.Dates=[StartD,endD]; //for now
  this.getImages();
  this.userhttp.getLoggedInUser().subscribe(
    res=>{
      console.log(res);
      this.userName=res;
      this.collabHttp.StoreAppView(this.userName,this.cur.id,StartD);
    }
    
  ) 
 
 
  
}
  set_up_map(){
    console.log(this.cur.longitude,this.cur.latitude);
  
    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });


    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([this.cur.longitude, this.cur.latitude], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          scale: 0.085,
          src: "assets/osm-marker.webp"
        })
      })
    });
    this.map.addLayer(vectorLayer);
    
   this.setCenter();    
  }
  Book():void{

    if(this.userName)
      {
        this.apphttp.bookAppartment(this.id1,this.Dates,this.userName);
        window.alert("BOOKING SUCCESFULL");
        console.log(this.Dates);
      }
    else{
      window.alert("You must be logged in to make a purchase!");
    }

  }
  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.cur.longitude, this.cur.latitude]));
    view.addMarker(ol.proj.fromLonLat([this.cur.longitude, this.cur.latitude]));
    view.setZoom(8);
  }
  message():void{
    if(this.userhttp.loggedIn())
     {
     // this.openChat=true;
      var usn:String
      this.httpC.get("https://localhost:8443/api/user/UserName",{ responseType: 'text'}).subscribe(
        data=>{
          usn=data; 
          console.log(data);
          this.router.navigateByUrl("/chat/:receiver:"+this.cur.ownername+"/:appartment:"+this.cur.id);

        }
      )
     } 
    else
      window.alert("You must be logged in to send a message");
  }
  submit(){
    if(!this.userhttp.loggedIn())
     {
       window.alert("You must be logged in to make a review");
       return;
     }
    if(this.has_reviewed)
      {
        window.alert("You have allready reviewed the appartment prety recently");
        return;
      }
    this.has_reviewed=true;
    console.log(this.review);
    this.apphttp.addReview(this.userhttp.getLastUsr().userName,this.cur.id,this.review," ");
  }
 
  
  getImages(){
    let url="https://localhost:8443/api/Apartments/"+this.id1+"/Images";
    this.http.get<ImageModel[]>(url).subscribe(
      res=>{
        this.imageList=res;
        console.log(res);
      }
    )
    this.messageHttp.getMessages(this.id1).subscribe(
      res=>{
        this.messages=res;
        console.log(res);
      });
  }
}
