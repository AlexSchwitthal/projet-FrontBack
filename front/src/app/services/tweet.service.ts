import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tweet } from '../models/tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  tweets:Array<Tweet> = new Array<Tweet>();

  constructor(private http: HttpClient) { }

  getTweets(creatorId: any):any {
    return this.http.get("http://localhost:3000/tweets/" + creatorId);
  }

  getTweetsByCreatorName(creatorName: any):any {
    return this.http.get("http://localhost:3000/tweetsName/" + creatorName);
  }

  getFeed(creatorId: any):any {
    return this.http.get("http://localhost:3000/getFeed/" + creatorId);
  }

  addTweet(creatorId: any, tweetContent: string):any {
    return this.http.post("http://localhost:3000/addTweet", {creator_id: creatorId, content: tweetContent})
  }

  deleteTweet(tweet_id:any):any {
    return this.http.post("http://localhost:3000/deleteTweet", {tweet_id: tweet_id})
  }

  updateTweet(tweet:any):any {
    return this.http.put("http://localhost:3000/editTweet", {tweet: tweet})
  }

  saveTweet(tweet:Tweet):void {
    var index = this.tweets.indexOf(tweet);
    this.tweets.splice(index,1);
    this.tweets.push(tweet);
  }

  addLike(tweetId:any, userId:any):any {
    return this.http.put("http://localhost:3000/addLike", {tweetId: tweetId, userId: userId});
  }

  removeLike(tweetId:any, userId:any):any {
    return this.http.put("http://localhost:3000/removeLike", {tweetId: tweetId, userId: userId});
  }

  getTweetsLiked(userId:any): any {
    return this.http.get("http://localhost:3000/getTweetsLiked/" + userId);
  }
}
