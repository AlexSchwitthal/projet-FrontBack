import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public authService: AuthService, public usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  showDeleteUserPopUp(): any {
    /* TO DO */
  }

  deleteUser(): any {
    this.usersService.deleteUser(this.authService.connectedUser._id).subscribe(
      (result:any) => {
        console.log(result);
        this.authService.connectedUser = null;
        this.router.navigate(['/login', {deleted: true}]);
      },
      (error:any) => {
        console.log(error);
      }
    )
  }
}
