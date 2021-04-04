import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {User} from 'src/app/models/User';
import { Router } from '@angular/router';
//import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  success:Boolean;
  show:Boolean;
  newUser:User;
  uploadData;
  secondPassword:String="";
  constructor(private http:UserService,private router:Router) { }

  ngOnInit(): void {
    this.newUser=new User;
    this.newUser.renter=false;
    this.newUser.owner=false;
    this.success=false;
    this.show=false;
  }
  checkCheckBoxvalue(event){
    this.newUser.requestforOwner=!this.newUser.requestforOwner;
  }
  handleClick():void{
    this.show=true;   
    console.log(this.newUser.requestforOwner) 
    if(!this.http.newUser(this.newUser,this.uploadData))
      {
        this.success=false;
      }
    else
     {
       this.http.uploadProfilePic(this.newUser.userName,this.uploadData);
        this.success=true;
              
     }
  
  }
  public sendImage(){
    this.http.uploadProfilePic(this.newUser.userName,this.uploadData);
  }
  public  onFileChanged(event) {
    this.newUser.pic=event.target.files[0];
    let selectedFile = event.target.files[0];
     this.uploadData = new FormData();
    this.uploadData.append('imgFile',selectedFile);
    this.uploadData.append('usn',this.newUser.userName.toString());
  }


}
