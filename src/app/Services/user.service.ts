import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { User } from '../Models/User'
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  private endpoint = `${this.baseEndPoint}users`;

  constructor( private http: HttpClient) {  
      super()
   }

  getAllUsers() : Promise<User[]>{
    return this.http.get<User[]>(this.endpoint).toPromise();
  }

  getUser(id: number) : Promise<User>{
    return this.http.get<User>(`${this.endpoint}/${id}`).toPromise();
  }

  createUser(user: User) : Promise<any>{
    console.log(user);
    return this.http.post(this.endpoint, user).toPromise();
  }

  deleteUser(id:number) : Promise<any>{
    return this.http.delete(`${this.endpoint}/${id}`).toPromise();
  }

  updateUser(user: User) : Promise<any>{
    return this.http.put(`${this.endpoint}/${user.id}`, user).toPromise();
  }

  async getUserByEmail(email: string) : Promise<User>{
    let users = await this.getAllUsers();
    let user = users.find((x) => x.email === email);

    if(user){
      return user;
    }
    return null;
  }
}
