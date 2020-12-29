import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  hide = true;
  nickname:any;
  password:any;

  constructor(public authService: AuthService, public usersService: UsersService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.nickname = this.authService.connectedUser.nickname;
  }

  changeNickname(): any {
    if(this.nickname.length != 0) {
      this.authService.connectedUser.nickname = this.nickname;
      this.usersService.editUser(this.authService.connectedUser).subscribe(
        (result:any) => {
          this.openSnackBar("Votre pseudo a bien été modifié !");
        },
        (error:any) => {
          console.log(error);
        }
      )
    }
  }

  changePassword(): any {
    if(this.password.length != 0) {
      this.authService.connectedUser.password = this.password;
      this.usersService.editUser(this.authService.connectedUser).subscribe(
        (result:any) => {
          this.openSnackBar("Votre mot de passe a bien été modifié !"); 
        },
        (error:any) => {
          console.log(error);
        }
      )
    }
  }

  showDeleteUserPopUp(): any {
    /* TO DO */
  }

  deleteUser(): any {
    this.usersService.deleteUser(this.authService.connectedUser._id).subscribe(
      (result:any) => {
        this.authService.connectedUser = null;
        this.router.navigate(['/login', {deleted: true}]);
      },
      (error:any) => {
        console.log(error);
      }
    )
  }
  
  openSnackBar(message):any {
		this._snackBar.open(message, "", {
			duration: 3000,
				panelClass: ['mat-toolbar', 'mat-primary'],
				verticalPosition: 'top'
		});
  }
  
  regexValidator(event: any) {
    const pattern = /^[a-zA-Z0-9_\-]*$/;   
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9_\-]/g, "");
    }
  }
}
