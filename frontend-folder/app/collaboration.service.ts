import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appartment } from './models/appartment';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  constructor(private http:HttpClient) { }
  /*getRecommended(usr:String){

  }*/
  storeSearch(username,Date,searchLocation){
    let body=
    {
      "username": username,
      "Date":Date,
    "searchLocation":searchLocation
     };
     this.http.post("https://localhost:8443/api/Colab/Search",body).subscribe(
       res=>console.log(res)
     )
  }
  StoreAppView(username,appId,Date){
    let body={
      "user":username,
      "appId":appId,
      "Date":Date
    }
    this.http.post("https://localhost:8443/api/Colab/AppView",body).subscribe(
      res=>console.log(res)
    );
  }
  getRecomended(username:String){
    let url="https://localhost:8443/api/Colab/user/Recomended/"+username;
    return this.http.get<appartment[]>(url);
  }
}
