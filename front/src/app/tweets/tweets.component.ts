import { Component, OnInit } from '@angular/core';
import { Tweet } from '../models/tweet';
import { AuthService } from '../services/auth.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  
  tweet: any;
  tweets: any;

  constructor(public authService : AuthService, public tweetService: TweetService) { }

  ngOnInit(): void {
    this.getTweet();
  }

  addTweet() {
    this.tweetService.addTweet(this.authService.connectedUser._id, this.tweet).subscribe(
      (result:any) => {
        this.tweet = "";
        this.getTweet();
        console.log("ok");
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  getTweet(){
    this.tweetService.getTweets(this.authService.connectedUser._id).subscribe(
      (tweetsList:any) => {
        this.tweets = new Array();
        for(var element of tweetsList) {
          this.tweets.push(new Tweet(element._id, element.content, element.created_at, element.creator_id));
        }
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  deleteTweet(tweet:Tweet) {
    this.tweetService.deleteTweet(tweet._id).subscribe(
      () => {
        let index = this.tweets.indexOf(tweet);
        this.tweets.splice(index, 1);
      },
      (error) => {
        console.log("Delete error");
      }
    );
  }
}
