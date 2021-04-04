import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/User';
import {UserComponent} from 'src/app/user/user.component'
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
 
  usr:User;
  phn:String;
  changePs:Boolean;
  changeN:Boolean;
  changeE:Boolean;
  changeFN:Boolean;
  newFirstName:String;
  newLastName:String;
  changeLN:Boolean;
  newpassword:String="";
  newpassword2:String="";
  oldpassword:String="";
  newEmail:String="";  
  changePic:Boolean;
  uploadData;
  ////things used to change profile pic
  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  //////////methods
  constructor(private http:UserService,private client:HttpClient) { }

  ngOnInit(): void {
    this.http.getLoggedInUser().subscribe(
      data=>{
        this.http.getUser(data).subscribe(
          res=>this.usr=res
        )
      }
    );
    this.changePs=false;
  }
  setPic(){
    this.changePic=true;
   this.changePs=false;
    this.changeE=false;
    this.changeN=false;
    this.changeFN=false;
    this.changeLN=false;
  }
  setPs(){
    this.changePs=true;
    this.changePic=false;
    this.changeE=false;
    this.changeN=false;
    this.changeFN=false;
    this.changeLN=false;
  }
  setFN(){
    this.changeFN=true;
    this.changeLN=false;
    this.changePs=false;
    this.changePic=false;
    this.changeE=false;
    this.changeN=false;
  }
  setLN(){
    this.changeLN=true;
    this.changeFN=false;
    this.changePs=false;
    this.changePic=false;
    this.changeE=false;
    this.changeN=false;

  }
  setE(){
    this.changeE=true;
    this.changePic=false;
    this.changePs=false;
    this.changeN=false;
    this.changeFN=false;
    this.changeLN=false;
  }
  setN(){
    this.changeN=true;
    this.changeE=false;
    this.changePic=false;
    this.changePs=false;
    this.changeFN=false;
    this.changeLN=false;
  }
  changePsw()
  {
    if(this.newpassword!=this.newpassword2){
      document.getElementById("loginResult").innerHTML="Error passwords don't match";
      return;}
    if(!this.http.changePassword(this.usr,this.oldpassword,this.newpassword))
      document.getElementById("loginResult").innerHTML="Sorry wrong Password";
    else
       document.getElementById("loginResult").innerHTML="change of password succefull";
  }
  changeEmail()
  {
    if(this.oldpassword!=this.usr.password)
      document.getElementById("EmailResult").innerHTML="Sorry your password is incorrect"
    else{
      this.http.changeEmail(this.usr,this.newEmail);
      document.getElementById("EmailResult").innerHTML="Your new email adress is set to "+this.newEmail;
     }
  }
  changeNum()
  {
     this.usr.phoneNumber=this.phn;
     this.http.updateUser(this.usr);
      window.alert("your phone number has been changed succesfully")
  }
  sendPic(){
    let url="https://localhost:8443/api/user/ProfilePic/"+this.usr.userName;
    this.client.put(url,this.uploadData).subscribe(
      res=>{
        console.log(res)
      //  this.usr.pic=event.target.files[0];
        this.usr.pic=res;
            }
    )
    window.alert("your profile picture has changed reload to check out the new one");

  }
  public changeFName(){
     this.usr.firstName=this.newFirstName;
     this.http.updateUser(this.usr);
    window.alert("your first name has changed successfully")
  }
  public changeLName(){
   this.usr.lastName=this.newLastName;
   this.http.updateUser(this.usr);
      window.alert("your last name has changed successfully");
  }
  public  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
     this.uploadData = new FormData();
    this.uploadData.append('imgFile',this.selectedFile);
    this.uploadData.append('usn',this.usr.userName.toString());
    
  }

}
