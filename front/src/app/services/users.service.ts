import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users:Array<User> = new Array<User>();

  constructor(private http: HttpClient) { }

  getUsers(): any {
    return this.http.get("http://localhost:3000/users");
  }
}
