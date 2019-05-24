import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user-service.service';
import { User } from '../../../Models/User';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }


  async ngOnInit() {
    await this.PoulateUsers();
  }

  async PoulateUsers(){
    this.users = await this.userService.getAllUsers();
  }

  async blockUser(user: User){
    user.isBlocked = !user.isBlocked;
    await this.userService.updateUser(user);
  }

}
