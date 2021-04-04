import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() sender:String;
  constructor() { }
  ngOnInit(): void {
    
  }

}
