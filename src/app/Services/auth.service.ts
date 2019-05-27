import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserService} from './user.service';
import { LogInDTO } from '../Models/DTOs/LogInDTO';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private userService: UserService, private cookieService: CookieService) { 
    super();
  }

  async logIn(logInDTO: LogInDTO): Promise<boolean>{
    let user = await this.userService.getUserByEmail(logInDTO.email);
    if(user && user.password === logInDTO.password){
      this.cookieService.set('isAuthenticated','true');
      this.cookieService.set('email',user.email);
      this.cookieService.set('role',user.role);
      return true;
    }

    return false;
  }

  isAuthenticated() : boolean{
    let isAuthenticatedValue = this.cookieService.get('isAuthenticated');

    if(isAuthenticatedValue == 'true'){
      return true;
    }

    return false;
  }

  isAdmin() : string{
    let role = this.cookieService.get('role');

   return role;
  }
}
