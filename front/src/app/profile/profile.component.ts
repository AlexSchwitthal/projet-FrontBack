import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  login: any;

  constructor(private route: ActivatedRoute, private router: Router, public authService : AuthService) { }

  ngOnInit(): void {
    this.login = this.route.snapshot.paramMap.get('username');
  }
}
