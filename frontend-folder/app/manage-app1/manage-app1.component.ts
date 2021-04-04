import { Component, OnInit } from '@angular/core';
import { AppartmentService } from '../appartment.service';
import { appartment } from '../models/appartment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ImageModel} from 'src/app/models/ImageModel';
import { DomSanitizer } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { CurrencyPipe } from '@angular/common';
import { message } from '../models/message';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';

declare var ol: any;

@Component({
  selector: 'app-manage-app1',
  templateUrl: './manage-app1.component.html',
  styleUrls: ['./manage-app1.component.css']
})
export class ManageApp1Component implements OnInit {
  ///pagination shit
  p: number = 1;
  p2:number=1;
  map: any;
  bla:number=1;
  foo:number=2;
  lon;
  lat;
  hood:String;
  city:String;
  country:String; 
  startD:String;
  endD:String;
  ///////////
  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  retrievedImage: any;
  base64Data: any;
  cur:appartment;
  img:ImageModel;
  imageList:ImageModel[];
  imageBlobUrl:any;
  url:any;
  uploadData:any;
  thumbnail: any;
  messages: message[];
  imageToShow;
  constructor(private router:Router,private route :ActivatedRoute ,private appHttp:AppartmentService,private http:HttpClient,
    private userHttp:UserService,private sanitizer:DomSanitizer,private client:HttpClient,private messageHttp:MessageService) { }

  ngOnInit(): void {
    this.cur=new appartment;
    this.appHttp.getAppartmentById(+this.route.snapshot.params.id.split(":")[2]).subscribe(
      data=>{
        this.cur=data
        this.getImage();
        let Arr=this.cur.location.split("+");
        this.hood=Arr[0]; this.city=Arr[1] ; this.country=Arr[2];
        this.messageHttp.getMessages(data.id).subscribe(
          res=>{
            this.messages=res;
            console.log(res);
            this.messages.forEach(element => {
              console.log(element.answered)
              if(element.answered)
              { 
                  console.log(element)
               //   this.messages.splice(this.messages.indexOf(element))
              }
            });
          }
          
        );
        this.set_up_map();

      }
    );
  }
  getImage(){  
    let id=this.route.snapshot.params.id.split(":")[2];
    console.log(id);
    let url="https://localhost:8443/api/Apartments/"+this.cur.id+"/Images";
    this.http.get<ImageModel[]>(url).subscribe(
      res=>{
        this.imageList=res;
        console.log(res);
        let objectURL = 'data:'+res[0].type+';base64,' + res[0].pic;
       this.imageToShow= 'data:image/jpg;base64,'+(this.sanitizer.bypassSecurityTrustResourceUrl(res[0].pic) as any);//.changingThisBreaksApplicationSecurity;
      })
      
  }
  CreateImageFromBlob(image: Blob) {
    console.log(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageBlobUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
 DeleteImage(id:number){
   let url="https://localhost:8443/api/Apartments/Images/"+id;
   this.http.delete<String>(url).subscribe(
     result=>{
      console.log(result);
      }
   );
   window.alert("DELETION WAS SUCCESFULL RELOADING")
   window.location.reload();
 }
 public  onFileChanged(event) {
  console.log(event);
  this.selectedFile = event.target.files[0];
  this. uploadData = new FormData();

  this.uploadData.append('myFile',this.selectedFile,this.selectedFile.name);
  this.uploadData.append("id",this.cur.id.toString());
 
 }
 AddPic(){
  let url="https://localhost:8443/api/Apartments/"+this.cur.id+"/Images";
  this.client.post(url,this.uploadData).subscribe(
    res=>{
      console.log(res)
    }
  );
  window.alert("image has been added to the appartment's collection ,reloading");
  window.location.reload();
}  


 PostIt(){
   this.startD=this.formatDate(this.startD);
   this.endD=this.formatDate(this.endD);
   this.cur.dates=this.get_dates(this.startD.toString(),this.endD.toString());
  this.appHttp.updateAppartment(this.cur,this.city,this.country,this.hood);
  window.alert("the appartment has been updated refreshing page");
  window.location.reload();
}
 onFileChange(event){
  console.log(event);
  this.selectedFile = event.target.files[0];

  // Below part is used to display the selected image
  let reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (event2) => {
    this.imgURL = reader.result;
 }
 }  
 set_up_map(){
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

    this.map.on('click', (args) =>{
      console.log(args.coordinate);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);
      
      var lon = lonlat[0];
      var lat = lonlat[1];
      alert(`lat: ${lat} long: ${lon}`);
      this.cur.longitude=lon;
      this.cur.latitude=lat;
      
      fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
          return response.json();
        }).then((json)=>{
          console.log(json);
          console.log(json.address);
          ////////////////////////////
          this.country=json.address.country;
          this.hood=json.address.neighbourhood;
          if(!this.hood)
            this.hood=json.address.suburb;
          this.city=json.address.city;
          if(!this.city)
            this.city=json.address.municipality;
          this.cur.address=json.address.road+" "+json.address.house_number+" "+json.address.postcode;
          console.log(this.country,this.hood,this.city,this.cur.address);
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

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.cur.longitude,this.cur.latitude]));
    view.addMarker(ol.proj.fromLonLat([this.cur.longitude, this.cur.latitude]));
    view.setZoom(8);
  }
  changeMainPic(){
    this.appHttp.changePic(this.cur.id,this.selectedFile);
    window.alert("picture changed , reloading");
    window.location.reload();
  }
 //////////////////////////////////////////////////////////
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
get_dates(startD:string,endD:string):String[]{
  var result:String[]=new Array();
  result.push(startD);
  let sd=+startD.split("-")[0]; 
  let sm=+startD.split("-")[1];
  let sy=+startD.split("-")[2];
  let ed=+endD.split("-")[0];
  let em=+endD.split("-")[1];
  let ey=+endD.split("-")[2];
  for(let day=sd+1;day<=30;day++){
    let temp=day.toString()+"-"+sm.toString()+"-"+sy.toString();
    result.push(temp);  
    if(temp==endD)
      return result;
  }
  for(let year =sy ;year<=ey;year++){
    for(let month=sm+1; month<=em;month++){
      for(let day=1;day<=30;day++){
          let temp=day.toString()+"-"+month.toString()+"-"+year.toString();
          result.push(temp);
          if(temp==endD)
            return result;
      }
    }
  }
  return result;

}
  deleteMessage(id){
    this.messageHttp.deleteMessage(id);
    alert("MESSAGE DELETE SUCCESSFULY");
    window.location.reload();
  }
  Reply(usn){
    this.router.navigateByUrl("/chat/:receiver:"+usn+"/:appartment:"+this.cur.id);
  }
  Mark(id){
    this.messageHttp.markMessage(id);
    alert("MESSAGE HAS BEEN MARKED SUCCESSFULY")
    window.location.reload();

  }
}
