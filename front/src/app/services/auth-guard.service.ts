import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, object) => {
        this.authService.isLogged().subscribe(
          (result:any) => {
            this.authService.connectedUser = new User(result.user._id, result.user.login, result.user.password, result.user.nickname, result.user.following);
            resolve(true);
          },
          (error) => {
            this.router.navigate(['/login']);
            resolve(false);
          }
        )
      }
    );
  }
}
