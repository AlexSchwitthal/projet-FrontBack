import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  tweet:any;

  constructor() { }

  ngOnInit(): void {
  }

  addTweet() {

  }
  
  updateTweet(){};

}
