import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: string;
  functionToCall: any;
  userPage: any = "";
  users: User[];
  interval: any;
  param: any;

  constructor(public usersService: UsersService, private route: ActivatedRoute) { 
    route.params.subscribe(val => {
      if(val.username !== undefined) {
        this.param = val.username;
        this.getUser();
      }
    });
  }
  
  ngOnInit(): void {  
    if(this.list == "user") {
    this.getFunctionToCall();
    }
    this.interval = setInterval(() => {
        this.getUsers();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getUsers(){
    this.functionToCall.subscribe(
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

  getUser():any {
    this.usersService.getUser(this.param).subscribe(
      (user:any) => {
        this.userPage = new User(user._id, user.login, user.password, user.nickname, user.following);  
        if(user == null) {
        }
        this.getFunctionToCall();
      },
      (error:any) => {
        this.userPage = null;
        console.log(error);
      }
    )
  }

  getFunctionToCall() {
    if(this.list == "user") {
      this.functionToCall = this.usersService.getUsers();
    }
    else if(this.list == "following") {
      this.functionToCall = this.usersService.getFollowing(this.userPage._id);
    }
    else if(this.list == "follower") {
      this.functionToCall = this.usersService.getFollowers(this.userPage._id);
    }
    this.getUsers();
  }


  keyupSearch(value): void {
    var children = Array.from(document.getElementsByClassName("userList") as HTMLCollectionOf<HTMLElement>);
    children.forEach(element => {      
      if(value=="") {
        element.style.display = "block";
      }
      else {
        if(element.textContent.search(value) == -1) {
          element.style.display = "none";
        }
        else {
          element.style.display = "block";
        }
      }
    });
  }
}
