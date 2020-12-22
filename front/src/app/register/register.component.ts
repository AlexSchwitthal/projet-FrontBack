import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, public authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit():any {
    this.authService.register(this.login, this.password).subscribe(
      (userInfo:any) => {
        if(userInfo == "-1") {
					this.openSnackBar("ce nom d'utilisateur existe déjà !");
        }
        else {
        	this.router.navigate(['/login', {registered: true}]);
        }
      },
      (error) => {
				this.openSnackBar("Vous devez remplir tout les champs du formulaire !");
        console.log("error", error);
      }
    )
	}
	
	openSnackBar(message):any {
		this._snackBar.open(message, "", {
			duration: 3000,
				panelClass: ['mat-toolbar', 'mat-warn'],
				verticalPosition: 'top'
		});
	}
}
