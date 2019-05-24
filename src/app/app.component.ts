import { Component, OnInit } from '@angular/core';
import {UserService} from './Services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CourseAcademy';
  
  constructor(private userService : UserService) {
    
  }
  
  async ngOnInit() {
    
  }
  
}
