import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Subscription } from 'rxjs';
import { NavBarService } from '../Services/nav-bar.service';
import { fadeInOutAnimation } from '../Animations/fadeInOut';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    fadeInOutAnimation
  ]
})
export class NavBarComponent implements OnInit, OnDestroy {
  private isAdmin: boolean = false;
  private shouldShowLogOut:boolean = false;
  private shouldShowRegForm: boolean = false;
  private logedObservableSubscription: Subscription;
  private showHideRegFormSubscription: Subscription;
  private isLogedAndAdminSubscription: Subscription;

  constructor(private authService: AuthService, private navBarService: NavBarService) { }

  ngOnInit() {
    this.shouldShowLogOut = this.authService.isAuthenticated();
    this.logedObservableSubscription = this.authService.logedObservable.subscribe(data => {
      this.shouldShowLogOut = data;
    });

    this.isAdmin = this.authService.isAdmin();
    this.isLogedAndAdminSubscription = this.authService.logedAndAdminObservable.subscribe(data => {
      this.isAdmin = data;
    });

    this.showHideRegFormSubscription = this.navBarService.shouldDisplayRegFormObservable.subscribe(data =>{
      this.shouldShowRegForm = data;
    })
  }

  ngOnDestroy(): void {
    this.logedObservableSubscription.unsubscribe();
    this.showHideRegFormSubscription.unsubscribe();
    this.isLogedAndAdminSubscription.unsubscribe();
  }

  logOut() {
    this.authService.logOut();
  }

  showHideRegForm(){
   this.navBarService.showHideRegForm();
  }

  

}
