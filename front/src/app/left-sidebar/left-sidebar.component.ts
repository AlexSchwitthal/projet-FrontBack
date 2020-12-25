import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() : void {
    this.authService.logout().subscribe(
      () => {
      },
      (error) => {
      }
    )
  }

  profile(): void {
    this.router.navigate(['/profile', this.authService.connectedUser.login]);
  }
}
