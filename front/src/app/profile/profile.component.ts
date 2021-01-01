import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  login: any;                               // nom de l'utilisateur passé dans l'url
  userPage: User = null;                    // User récupérer de le login
  isValidUser : boolean;                    // vérifie que l'user existe
  isOwnProfile : boolean;                   // vérifie si l'on est sur son propre profil ou non
  isFollowing: boolean;                     // vérifie si l'utilisateur connecté suit ou non le profil
  followers: User[] = [];                   // liste des followers du profil
  listToCall: string = "tweetsPublished";   // liste à appeller (tweets publiés ou tweets likés)
  param: string;                            // paramètre
  nbTweetsPublished: number = 0;            // nombre de tweets publiés

  constructor(public usersService : UsersService, private route: ActivatedRoute, public authService: AuthService) { 
    this.route.params.subscribe(val => {
      this.login = val.username;
      this.getUser(this.login);
      this.checkOwnProfile(this.login);   
    });
  }

  ngOnInit(): void {
    this.param = this.login;
  }
  
  getUser(login:any):any {
    this.usersService.getUser(this.login).subscribe(
      (user:any) => {
        this.userPage = new User(user._id, user.login, user.password, user.nickname, user.following);
        this.getFollowers(); 
        this.isValidUser = true;
        this.checkFollowing();    
      },
      (error:any) => {
        this.userPage = null;
        this.isValidUser = false;
        console.log(error);
      }
    )
  }
  
  getFollowers() {
    this.usersService.getFollowers(this.userPage._id).subscribe(
      (followers:any) => {
        this.followers = new Array();
        for(var follower of followers) {
          this.followers.push(new User(follower._id, follower.login, follower.password, follower.nickname, follower.following));
        }
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  checkOwnProfile(login:any):any{
    if (this.login === this.authService.connectedUser.login) {
      this.isOwnProfile = true;
    }
    else this.isOwnProfile = false;
  }

  checkFollowing():any{
    var exist = false;
    for(var user of this.authService.connectedUser.following) {
      if(user.followingId == this.userPage._id) {
        var exist = true;
      }
    }
    if(exist) {
      this.isFollowing = true;
    }
    else {
      this.isFollowing = false;
    }
  }

  addFollowing():any {
    this.usersService.addFollowing(this.authService.connectedUser._id, this.userPage._id).subscribe(
      (result:any) => {
        this.isFollowing = true;
        this.getFollowers();
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  removeFollowing():any {
    this.usersService.removeFollowing(this.authService.connectedUser._id, this.userPage._id).subscribe(
      (result:any) => {
        this.isFollowing = false;
        this.getFollowers();
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  getPublishedTweets():any {
    console.log("getPublishedTweets");
    if(this.listToCall != "tweetsPublished") {
      this.listToCall = "tweetsPublished";
      this.param = this.login;
    }
  }

  getLikedTweets():any {
    console.log("getLikedTweets");
    if(this.listToCall != "tweetsLiked") {
      this.listToCall = "tweetsLiked";
      this.param = this.userPage._id;
    }
  }

  tweetsLength(tweetLength:number):any {
    this.nbTweetsPublished = tweetLength;
  }
}
