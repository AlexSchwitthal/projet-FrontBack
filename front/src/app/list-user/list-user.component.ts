import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users: User[];

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers().subscribe(
      (allUsers:any) => {
        this.users = new Array();
        for(var user of allUsers) {
          this.users.push(new User(user._id, user.login, user.password, user.nickname, user.following));
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
