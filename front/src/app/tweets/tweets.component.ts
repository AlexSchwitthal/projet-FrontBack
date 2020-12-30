import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '../models/tweet';
import { AuthService } from '../services/auth.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  @Input() parentComponent: String;
  @Input() tweetText: string;
  tweet: any;
  tweets: any;
  functionToCall: any;
  interval: any;

  constructor(public authService : AuthService, public tweetService: TweetService) { }

  ngOnInit(): void {
    if(this.parentComponent == "home") {
      this.functionToCall = this.tweetService.getFeed(this.authService.connectedUser._id);
    } 
    else {
      this.functionToCall = this.tweetService.getTweetsByCreatorName(this.parentComponent);
    }
    this.getTweets();
    this.interval = setInterval(() => {
      this.refreshTweets();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  ngOnChanges() {
    this.addTweet();
  }
  
  addTweet(): void {
    if(this.tweetText != "") {
      this.tweetService.addTweet(this.authService.connectedUser._id, this.tweetText).subscribe(
        (result:any) => {
          this.tweet = "";
          this.refreshTweets();
        },
        (error:any) => {
          console.log(error);
        }
      );
    }
  }

  getTweets(): void {
    this.functionToCall.subscribe(
      (tweetsList:any) => {
        this.tweets = [];
        for(var element of tweetsList) {
          this.tweets.push(new Tweet(element._id, element.content, element.created_at, element.creator_id, element.likes));
        }
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  refreshTweets(): void {
    this.functionToCall.subscribe(
    //this.functionToCall.subscribe(
      (newTweets:any) => {
        // suppression des tweets qui n'existe plus en DB
        for(var element of this.tweets) {
          if(this.hasBeenDeleted(element, newTweets)) {
            let index = this.tweets.indexOf(element);
            this.tweets.splice(index, 1);
          }
        }
        for(var element of newTweets) {
          for(var oldTweet of this.tweets) {
            // rafraichissement du contenu des tweets qui ont été edité 
            if(this.contentChange(oldTweet, element)) {
              if(oldTweet.creator_id != this.authService.connectedUser._id) {
                oldTweet.content = element.content;
              }
            }
            // rafraichissement du nombre de like des tweets dont le nombre de like à changé
            if(this.likesChange(oldTweet, element)) {
                oldTweet.likes = element.likes;
            }
          }
          // ajout des nouveaux tweets au début de la liste
          if(!this.alreadyExist(element, this.tweets)) {
         //   if(element.creator_id != this.authService.connectedUser._id) {
              this.tweets.unshift(new Tweet(element._id, element.content, element.created_at, element.creator_id, element.likes));
          //  }
          }
        }
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  deleteTweet(tweet:Tweet): void {
    this.tweetService.deleteTweet(tweet._id).subscribe(
      () => {
        let index = this.tweets.indexOf(tweet);
        this.tweets.splice(index, 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  alreadyExist(newTweet: Tweet, oldTweetsList: Tweet[]): boolean {
    for(var tweet of oldTweetsList) {
      if(tweet._id === newTweet._id) {
        return true;
      }
    }
    return false;
  }

  contentChange(oldTweet: Tweet, newTweet: Tweet): boolean {
    if(oldTweet._id === newTweet._id && oldTweet.content != newTweet.content) {
      return true;
    }
    else {
      return false;
    }
  }

  likesChange(oldTweet: Tweet, newTweet: Tweet) : boolean {
    if(oldTweet._id === newTweet._id && oldTweet.likes.length != newTweet.likes.length) {
      return true;
    }
    else {
      return false;
    }
  }

  hasBeenDeleted(oldTweet: Tweet, newTweetsList: Tweet[]): boolean {
    for(var tweet of newTweetsList) {
      if(tweet._id === oldTweet._id) {
        return false;
      }
    }
    return true;
  }
}
