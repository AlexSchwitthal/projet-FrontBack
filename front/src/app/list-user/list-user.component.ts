import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users: any;

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers().subscribe(
      (allUsers:any) => {
        console.log(allUsers);
        console.log("gfege");
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
