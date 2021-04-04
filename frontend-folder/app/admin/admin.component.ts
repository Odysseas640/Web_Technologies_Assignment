import { Component, OnInit } from '@angular/core';
import {User} from "src/app/models/User";
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import {appartment} from 'src/app/models/appartment';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { AppartmentService } from '../appartment.service';
import { fileURLToPath } from 'url';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loginOk:Boolean;
  ShowUsers:Boolean;
  ShowRequests:Boolean;
  p:number=1;
  userList :User[];
  input1:Observable<User[]>;
  appartmentList:appartment[];

  constructor(public httpUsr:UserService,private router:Router,private httpApp:AppartmentService) { }

  ngOnInit(): void {
    this.loginOk=this.httpUsr.isAdminloggedIn();
    this.ShowUsers=this.ShowRequests=false;
    this.httpApp.getAllAppartments().subscribe(
      data=>this.appartmentList=data
    );
  }
  
  getAllUsers():void
  {
    if(this.loginOk==true)
     { 
       this.ShowUsers=true; 
       this.ShowRequests=false;
     }
    this.input1=this.httpUsr.getAllUsers();
    this.input1.subscribe( data=> this.userList=data);  
      
  }
  getAppsJson(){
    this.httpApp.getAllAppartmentsJsonBlob().subscribe(
      res=>{
        console.log(res);
        saveAs(res,"appartments");
      }
    )
  }
  getApps(){
    this.httpApp.getAllAppartmentsBlob().subscribe(
      res=>{
        console.log(res);
        saveAs(res,"")
      }
    )
  
  }
  logout(){
    localStorage.removeItem('admin-token');
    this.httpUsr.XauthAdmin();
    this.router.navigateByUrl("/");
  }
  getToken(){
    return localStorage.getItem("token");
  }
}
