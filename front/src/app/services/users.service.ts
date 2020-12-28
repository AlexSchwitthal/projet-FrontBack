import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users:Array<User> = new Array<User>();

  constructor(private http: HttpClient) { }

  getUser(login:any): any {
    return this.http.post("http://localhost:3000/user", {login: login}, { withCredentials : true});
  }

  getUsers(): any {
    return this.http.get("http://localhost:3000/users", { withCredentials : true});
  }

  editUser(user:User): any {
    return this.http.put("http://localhost:3000/editUser", {user: user}, { withCredentials: true });
  }

  deleteUser(userId:any): any {
    return this.http.post("http://localhost:3000/deleteUser", {userId: userId}, { withCredentials: true });
  }

  addFollowing(userId:any, followingId: any): any {
    return this.http.put("http://localhost:3000/addFollowing", {userId: userId, followingId: followingId}, { withCredentials : true });
  }

  removeFollowing(): any {

  }
}
