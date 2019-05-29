import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserService} from './user.service';
import { LogInDTO } from '../Models/DTOs/LogInDTO';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  authCookieName = 'isAuthenticated';
  emailCookieName = 'email';
  roleCookieName = 'role';
  userIDCookieName = 'userID';

  constructor(private userService: UserService, private cookieService: CookieService) { 
    super();
  }

  async logIn(logInDTO: LogInDTO): Promise<boolean>{
    let user = await this.userService.getUserByEmail(logInDTO.email);
    if(user && user.password === logInDTO.password && user.isBlocked === true){
      this.cookieService.set(this.authCookieName,'true');
      this.cookieService.set(this.emailCookieName,user.email);
      this.cookieService.set(this.roleCookieName,user.role);
      this.cookieService.set(this.userIDCookieName,user.id.toString());

      return true;
    }

    return false;
  }

   logOut(): boolean{
    try {
      this.cookieService.deleteAll();
      return true;
    } catch (error) {
      return false;
    }
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
