import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Tweet } from '../models/tweet';
import { AuthService } from '../services/auth.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-tweet-post',
  templateUrl: './tweet-post.component.html',
  styleUrls: ['./tweet-post.component.scss']
})
export class TweetPostComponent implements OnInit {

  tweetText:any;
  @Output() addTweet = new EventEmitter<Tweet>();
  
  constructor(public tweetService: TweetService, public authService: AuthService) { }

  ngOnInit(): void {
  }
  
  addTweetEvent(): void  {
    this.addTweet.emit(this.tweetText);
    this.tweetText = "";
  }
}
