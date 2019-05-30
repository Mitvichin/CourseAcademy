import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserService} from './user.service';
import { LogInDTO } from '../Models/DTOs/LogInDTO';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterDTO } from '../Models/DTOs/RegisterDTO';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private authCookieName = 'isAuthenticated';
  private emailCookieName = 'email';
  private roleCookieName = 'role';
  private userIDCookieName = 'userID';
  private isLogedAndAdminSubject = new Subject<boolean>();
  logedAndAdminObservable = this.isLogedAndAdminSubject.asObservable();
  private isLogedSubject = new Subject<boolean>();
  logedObservable = this.isLogedSubject.asObservable();

  constructor(private userService: UserService, private cookieService: CookieService) { 
    super();
  }

  async logIn(logInDTO: LogInDTO): Promise<boolean>{
    let user = await this.userService.getUserByEmail(logInDTO.email);
    if(user && user.password === logInDTO.password && user.isBlocked === false){
      this.cookieService.set(this.authCookieName,'true');
      this.cookieService.set(this.emailCookieName,user.email);
      this.cookieService.set(this.roleCookieName,user.role);
      this.cookieService.set(this.userIDCookieName,user.id.toString());
      this.isLogedAndAdminSubject.next(this.isAuthenticated() && this.isAdmin());
      this.isLogedSubject.next(this.isAuthenticated());

      return true;
    }

    return false;
  }

  async register(registerDTO: RegisterDTO): Promise<any>{
    await this.userService.createUser(registerDTO as User);

    return await this.logIn({email:registerDTO.email, password: registerDTO.password});
  }

   logOut(){
      this.cookieService.deleteAll();
      this.isLogedSubject.next(this.isAuthenticated());
      this.isLogedAndAdminSubject.next(this.isAuthenticated() && this.isAdmin())
  }

  isAuthenticated() : boolean{
    let isAuthenticatedValue = this.cookieService.get(this.authCookieName);

    if(isAuthenticatedValue == 'true'){
      return true;
    }

    return false;
  }

  isAdmin() : boolean{
    let role = this.cookieService.get(this.roleCookieName);
    console.log(role);

    if(role === 'admin' || role ==="mAdmin"){
      return true;
    }

    return false;
  }

  getUserID() : number {
    return Number(this.cookieService.get(this.userIDCookieName));
  }
}
