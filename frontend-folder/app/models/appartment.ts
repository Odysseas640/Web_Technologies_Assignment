import { review } from './review';

export class appartment{
     id: number
     ownername: String
     price : number;
     size : number;
     capacity : number;
     floor : number;
     numberOfReviews: number;
     hasWifi : Boolean;
     hasParking : Boolean;
     address :  String;
     hasheat : Boolean;
     hasTv : Boolean;
     cost_per_person:number;
     allowPets : Boolean;
     hasElevator : Boolean;
     allowSmoking : Boolean;
     idAvailable : Boolean;
     location :  String
     dates : String[];
     reviews : review[];
     description:String;
     main_pic:any;
     latitude:number;
     longitude:number;
     accessInfo:String;
     type:String;
     numberOfBeds:number;
     minDatesToBook:number;
     numberOfBedrooms:number;
     numberOfBathrooms:number;
     hasLivingRoom:Boolean;
}