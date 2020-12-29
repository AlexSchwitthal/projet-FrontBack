import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Tweet } from '../models/tweet';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-tweet-block',
  templateUrl: './tweet-block.component.html',
  styleUrls: ['./tweet-block.component.scss']
})
export class TweetBlockComponent implements OnInit {

  tweetStatus: string="view";
  @Input() tweet: Tweet;
  @Output() deleteTweet = new EventEmitter<Tweet>();

  constructor(public tweetService: TweetService) { }

  ngOnInit(): void {
  }

  deleteNoteEvent(): void  {
    this.deleteTweet.emit(this.tweet);
  }

  updateNote(): void {
    this.tweetStatus = "loading";
    this.tweetService.updateTweet(this.tweet).subscribe(
      (tweet:Tweet) => {
        this.tweetStatus = "view";
      },
      (error) => {
        this.tweetStatus = "error";
        console.log("Note update error");
      }
    )
  }

}
