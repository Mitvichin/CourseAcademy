import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { LogInDTO } from '../../../Models/DTOs/LogInDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logInDTO: LogInDTO = {} as LogInDTO;
  isLogInSucc: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async logIn() {
    this.isLogInSucc = await this.authService.logIn(this.logInDTO);

    if(this.isLogInSucc){
      this.router.navigate(['courses'])
    }

  }

}
