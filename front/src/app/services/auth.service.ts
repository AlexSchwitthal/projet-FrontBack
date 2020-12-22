import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser: any = null;

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

  isLogged() {
    this.http.get("http://localhost:3000/isLogged", {withCredentials : true}).subscribe(
      (connectedUser) => {
        this.connectedUser = connectedUser;
        console.log("connected");
      },
      (error) => {
        console.log("not connected");
      }
    )
  }
}
