import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  login: any;
  userPage: User = null;
  isValidUser : boolean;
  isOwnProfile : boolean;
  isFollowing: boolean;

  constructor(public usersService : UsersService, private route: ActivatedRoute, private router: Router, public authService: AuthService) { 
    route.params.subscribe(val => {
      this.login = val.username;
      this.getUser(this.login);
      this.checkOwnProfile(this.login);       
    });
  }

  ngOnInit(): void {

  }

  getUser(login:any):any {
    this.usersService.getUser(this.login).subscribe(
      (user:any) => {
        this.userPage = new User(user._id, user.login, user.password, user.nickname, user.following);
        this.isValidUser = true;
        this.checkFollowing();    
      },
      (error) => {
        this.userPage = null;
        this.isValidUser = false;
        console.log(error);
      }
    )
  }
  
  checkOwnProfile(login:any):any{
    if (this.login === this.authService.connectedUser.login){
      this.isOwnProfile = true;
    }
    else this.isOwnProfile = false;
  }

  checkFollowing():any{
    if (this.authService.connectedUser.following.includes(this.userPage._id)){
      this.isFollowing=true;
    }
    else{
      this.isFollowing=false;
    }
  }
}
