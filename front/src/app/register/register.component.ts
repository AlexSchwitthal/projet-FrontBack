import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  hide = true;

  login:any = "";
  password:any = "";

  constructor(public authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit():any {
    this.authService.register(this.login, this.password).subscribe(
      (userInfo:any) => {
        if(userInfo == "-1") {
          this._snackBar.open("ce nom d'utilisateur existe déjà !", "", {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn'],
            verticalPosition: 'top'
          });
        }
      },
      (error) => {
        this._snackBar.open("Vous devez remplir tout les champs du formulaire !", "", {
          duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn'],
            verticalPosition: 'top'
        });
        console.log("error", error);
      }
    )
  }
}
