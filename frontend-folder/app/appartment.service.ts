import { Injectable } from '@angular/core';
import {User} from 'src/app/models/User'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders  } from '@angular/common/http';
//import { ResponseContentType, RequestOptions } from '@angular/common/http';

import {appartment} from "src/app/models/appartment"
import {review} from "src/app/models/review";
import { Booking } from './models/booking';
////////////////////////
@Injectable({
  providedIn: 'root'
})
export class AppartmentService {

  allAppartments:String="https://localhost:8443/api/Apartments";
  constructor(private http: HttpClient) {  }
  getAllAppartments() :Observable<appartment[]>
  {
    
    return this.http.get<appartment[]>(this.allAppartments.toString());
  }
  getAllAppartmentsJsonBlob(){
    return this.http.get(this.allAppartments.toString(),{responseType:'blob'})
  }
  getAllAppartmentsBlob(){
 
   
    return this.http.get(this.allAppartments.toString(), { 
      headers: new HttpHeaders({ 
        'Accept': 'application/xml' 
      }), 
      responseType: 'blob' 
    });
  }
  getAppartmentsBylocation(country:String,city:String,hood:String,start:String,end:String,capacity:number):Observable<appartment[]>
  {
    let url="https://localhost:8443/api/Apartments/"+capacity+"/"+start+"/"+end+"/"+country+"/"+city+"/"+hood;
      return this.http.get<appartment[]>(url);
  }
  getAppartmentById(id:Number): Observable<appartment>
  {
    let url="https://localhost:8443/api/Apartments/"+id.toString();
    return this.http.get<appartment>(url);
  }
  getAppartmentsByOwnerName(str:String): Observable<appartment []>{
    let url="https://localhost:8443/api/user/"+str+"/Apartments";
    return this.http.get<appartment[]>(url);
  }
  getAppartmentsByOwnerNameBlob(str:String){
    let url="https://localhost:8443/api/user/"+str+"/Apartments/";
    return this.http.get(url,{responseType: 'blob'});
  }
  getAppartmentsByOwnerNameBlobXML(str:String){
    let url="https://localhost:8443/api/user/"+str+"/Apartments/";
    return this.http.get(url,{
      headers:new HttpHeaders({
        Accept:'application/xml'
      }),
      responseType: 'blob'});
  }
  //////////post
  postAppartment(app:appartment,psw:String,town:String,country:String,hood:String,selectedFile):void{
    let body={
    "Ownername": app.ownername,
	  "OwnerPassword": psw,
	  "size":app.size,
	"country":country,
	"town":town,
	"neighborhood":hood,
	"hasHeat": app.hasheat,
	"floor":app.floor,
	"AllowPets":app.allowPets,
  "Price":app.price,
  "hasTv":app.hasTv,
	"AllowSmoking":app.allowSmoking,
	"Address":app.address,
	"HasParking":app.hasParking,
	"HasWifi":app.hasWifi,
	"capacity":app.capacity,
  "Dates":app.dates,
  "longitude":app.longitude,
  "latitude":app.latitude,
  "type":app.type,
  "idAvailable":app.idAvailable,
  "numberOfBeds":app.numberOfBeds,
  "cost-per-person":app.cost_per_person,
  "accessInfo":app.accessInfo,
  "lift":app.hasElevator,
  "numberOfBedrooms": app.numberOfBedrooms,
  "numberOfBathrooms":app.numberOfBathrooms,
  "hasLivingRoom":app.hasLivingRoom,
  "minDatesToBook":app.minDatesToBook
    }
    let f=new FormData()
    f.append("imgFile",selectedFile);
    console.log("fuck");
    let url="https://localhost:8443/api/Apartments";
    this.http.post<Number>(url,body).subscribe(
      data=>{          
      this.http.post<String>("https://localhost:8443/api/Apartment/Profile-Image/"+data,f).subscribe(
        res=>{console.log(res);}
      );
      }
    );
  }
  updateAppartment(app:appartment,town:String,country:String,hood:String){
    let body={
      "id":app.id,
      "Ownername": app.ownername,
      "size":app.size,
    "country":country,
    "town":town,
    "neighborhood":hood,
    "ac": app.hasheat,
    "floor":app.floor,
    "pets":app.allowPets,
    "price":app.price,
    "smoke":app.allowSmoking,
    "address":app.address,
    "parking":app.hasParking,
    "wifi":app.hasWifi,
    "hasTv":app.hasTv,
    "capacity":app.capacity,
    "cost-per-person":app.cost_per_person,
    "Dates":app.dates,
    "longitude":app.longitude,
    "latitude":app.latitude,
    "type":app.type,
    "idAvailable":app.idAvailable,
    "numberOfBeds":app.numberOfBeds,
    "accessInfo":app.accessInfo,
    "numberOfBedrooms": app.numberOfBedrooms,
    "numberOfBathrooms":app.numberOfBathrooms,
    "hasLivingRoom":app.hasLivingRoom,
    "minDatesToBook":app.minDatesToBook,
    "lift":app.hasElevator,
    "description":app.description
           }
           console.log("fuuuuuck");
      let url="https://localhost:8443/api/Apartments/"+app.id;
      console.log(url);
      this.http.put<String>(url,body).subscribe(
        result=>{console.log(result);}
      )
  }
  changePic(appId,file){
    let f=new FormData()
    f.append("imgFile",file);
    console.log("fuck");
    let url="https://localhost:8443/api/Apartment/Profile-Image/"+appId;
    this.http.post<String>(url,f).subscribe(
      res=>console.log(res)
    )

  }

  bookAppartment(appId:number,Dates:String[],usn:String){
    let body={
      "appId":appId,
      "renter":usn,
      "Dates":Dates
    };
    let url="https://localhost:8443/api/user/"+usn+"/Apartments/"+appId+"/Bookings";
    let subscription="";
    this.http.post<String>(url,body).subscribe(
      data=>{
        subscription=data.toString()
        console.log(data);
      }
    );

  }
  getReviews(appId:Number):Observable<review[]>
  {
    let Url="https://localhost:8443/api/Apartment/"+appId+"/Reviews";
    return this.http.get<review[]>(Url);
  }
  addReview(usn:String,appId:number,review:number,comment:String){
    let body={
      "userName":usn,
     "appId":appId,
     "comment":comment,
     "number":review
    };
    let url="https://localhost:8443/api/Reviews";
    let subscription="";
    this.http.post<String>(url,body).subscribe(
      data=>subscription=data.toString()
    );
  }
  getReviewByOwnerName(usn:String){
    let url="https://localhost:8443/api/user/"+usn+"/Apartment/Reviews";
    return this.http.get(url,{responseType: 'blob'});
  }
  getReviewByOwnerNameXML(usn:String){
    let url="https://localhost:8443/api/user/"+usn+"/Apartment/Reviews";
    return this.http.get(url, { 
      headers: new HttpHeaders({ 
        'Accept': 'application/xml' 
      }), 
      responseType: 'blob' 
    })
  }
  getReviewsByConductor(usn:String){
    let url="https://localhost:8443/api/user/"+usn+"/Reviews";
    return this.http.get(url,{responseType: 'blob'});
  }
  getReviewsByConductorXml(usn:String){
    let url="https://localhost:8443/api/user/"+usn+"/Reviews";
    return this.http.get(url,{
      headers: new HttpHeaders({ 
        'Accept': 'application/xml' 
      }), 
      responseType: 'blob'});
  }
  getBookingsByHost(usn:String){
    let url="https://localhost:8443/api/admin/User/"+usn+"/Appartment/Bookings";
    return this.http.get(url,{responseType: 'blob'});
  }
  getBookingsbyHostXML(usn:String){
    let url="https://localhost:8443/api/admin/User/"+usn+"/Appartment/Bookings";
    return this.http.get(url,{
      headers: new HttpHeaders({ 
        'Accept': 'application/xml' 
      }),
      responseType: 'blob'});
  }
  getBookinsByClientObservable(usn:String):Observable<Booking[]>{
    let url="https://localhost:8443/api/user/"+usn+"/Bookings/";
    return this.http.get<Booking[]>(url);

  }
  getBookingsByClient(usn:String){
    let url="https://localhost:8443/api/user/"+usn+"/Bookings/";
    return this.http.get(url,{responseType: 'blob'});
  }
 getBookingsByClientXML(usn:String)
 {
  let url="https://localhost:8443/api/user/"+usn+"/Bookings/";
  return this.http.get(url,{
    headers: new HttpHeaders({ 
      'Accept': 'application/xml' 
    }),
    responseType: 'blob'});
 } 
 getOwnerInfo(id:number):Observable<User>{
   let url="https://localhost:8443/api/Apartments/"+id+"/OwnerInfo"
   return this.http.get<User>(url);
 }
}