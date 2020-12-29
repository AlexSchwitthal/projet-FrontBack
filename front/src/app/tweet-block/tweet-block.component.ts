import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Tweet } from '../models/tweet';
import { User } from '../models/user';
import { TweetService } from '../services/tweet.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tweet-block',
  templateUrl: './tweet-block.component.html',
  styleUrls: ['./tweet-block.component.scss']
})
export class TweetBlockComponent implements OnInit {

  tweetStatus: string="view";
  @Input() tweet: Tweet;
  @Output() deleteTweet = new EventEmitter<Tweet>();
  tweetCreator: User;

  constructor(public tweetService: TweetService, public userService: UsersService) { }

  ngOnInit(): void {
    this.getTweetCreator();
  }

  deleteTweetEvent(): void  {
    this.deleteTweet.emit(this.tweet);
  }

  updateTweet(): void {
    this.tweetStatus = "loading";
    this.tweetService.updateTweet(this.tweet).subscribe(
      (tweet:Tweet) => {
        this.tweetStatus = "view";
      },
      (error:any) => {
        this.tweetStatus = "error";
      }
    )
  }

  getTweetCreator(): void {
    this.userService.getUserById(this.tweet.creator_id).subscribe(
      (user:any) => {
        this.tweetCreator = new User(user._id, user.login, user.password, user.nickname, user.following);
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

}
