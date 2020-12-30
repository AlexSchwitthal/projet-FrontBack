import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tweetText: any;

  constructor() { }

  ngOnInit(): void {
  }

  addTweet(tweetText:any) {
    this.tweetText = tweetText;
    //console.log("mdr");
  }
}
