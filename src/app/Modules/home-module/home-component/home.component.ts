import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { LogInDTO } from '../../../Models/DTOs/LogInDTO';
import { Router } from '@angular/router';
import { NavBarService } from '../../../Services/nav-bar.service';
import { RegisterDTO } from '../../../Models/DTOs/RegisterDTO';
import { fadeInOutAnimation } from '../../../Animations/fadeInOut';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeInOutAnimation
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
 
  logInDTO: LogInDTO = {} as LogInDTO;
  registerDTO: RegisterDTO = {id: 0, isBlocked: false, role: 'user' } as RegisterDTO
  isLogInSucc: boolean;
  shouldDisplayRegForm: boolean = false;
  shouldDisplayRegFormSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private navBarService: NavBarService) { }


  ngOnInit() {
    this.shouldDisplayRegFormSubscription = this.navBarService.shouldDisplayRegFormObservable.subscribe(data => {
      this.shouldDisplayRegForm = data;
    });
  }

  async logIn(form) {
    console.log(form)
    this.isLogInSucc = await this.authService.logIn(this.logInDTO);

    if (this.isLogInSucc) {
      this.router.navigate(['courses'])
    }
  }

  async register() {
    this.isLogInSucc = await this.authService.register(this.registerDTO);

    if (this.isLogInSucc) {
      this.router.navigate(['courses'])
    }
  }

  ngOnDestroy(): void {
    this.shouldDisplayRegFormSubscription.unsubscribe();
  }
}
