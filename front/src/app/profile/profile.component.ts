import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  login: any;
  userPage: User;
  isValidUser : boolean;

  constructor(public usersService : UsersService, private route: ActivatedRoute, private router: Router) { 
    route.params.subscribe(val => {
      this.login = val.username;
      this.getUser(this.login);
    });
  }

  ngOnInit(): void {

  }

  getUser(login:any):any {
    this.usersService.getUser(this.login).subscribe(
      (user:any) => {
        this.userPage = new User(user._id, user.login, user.password, user.nickname, user.following);
        this.isValidUser = true;
      },
      (error) => {
        this.userPage = null;
        this.isValidUser = false;
        console.log(error);
      }
    )
	}
}
