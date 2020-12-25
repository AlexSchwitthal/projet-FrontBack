import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  login:any = "";
  password:any = "";

  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('registered') == "true") {
      this._snackBar.open("votre compte a bien été crée !", "", {
        duration: 3000,
          panelClass: ['mat-toolbar', 'mat-primary'],
          verticalPosition: 'top'
      });
    }
  }

  submit(): any {
    this.authService.login(this.login, this.password).subscribe(
      (userInfo:any) => {
        this.authService.connectedUser = userInfo;
        this.router.navigate(['/home']);
      },
      (error) => {
        this._snackBar.open("nom d'utilisateur et/ou mot de passe incorrect !", "", {
          duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn'],
            verticalPosition: 'top'
        });
        console.log("error", error)
      }
    )
  }
}
