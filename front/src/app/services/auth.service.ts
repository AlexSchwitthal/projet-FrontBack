import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser: User = null;
  isAuth: boolean = false;

  constructor(private http: HttpClient) { }

  login(login, password):Observable<any> {
    return this.http.post("http://localhost:3000/login",  {login: login, password: password}, {withCredentials: true });
  }

  logout():Observable<any> {
    this.connectedUser = null;
    return this.http.get("http://localhost:3000/logout", { withCredentials : true });
  }

  register(login:any, password:any):Observable<any> {
    return this.http.post("http://localhost:3000/addUser", {login: login, password: password}, { withCredentials: true });
  }

  isLogged():Observable<any> {
    return this.http.get("http://localhost:3000/isLogged", {withCredentials : true});
  }
}
