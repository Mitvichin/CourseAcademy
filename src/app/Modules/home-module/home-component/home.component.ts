import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { LogInDTO } from '../../../Models/DTOs/LogInDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logInDTO: LogInDTO = {} as LogInDTO;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  logIn(){
    
  }

}
