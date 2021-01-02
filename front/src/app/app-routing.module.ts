import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ListUserComponent } from './list-user/list-user.component';
import { TweetsComponent } from './tweets/tweets.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotAuthGuardService } from './services/not-auth-guard.service';
import { ListFollowerComponent } from './list-follower/list-follower.component';
import { ListFollowingComponent } from './list-following/list-following.component';

const routes: Routes = [
  {path:'', canActivate: [NotAuthGuardService], component:LoginComponent},
  {path:'login', canActivate: [NotAuthGuardService], component:LoginComponent},
  {path:'register', canActivate: [NotAuthGuardService], component:RegisterComponent},
  {path:'home', canActivate: [AuthGuardService], component:HomeComponent},
  {path:'settings', canActivate: [AuthGuardService], component:SettingsComponent},
  {path:'list-user', canActivate: [AuthGuardService], component:ListUserComponent},
  {path:'profile/:username/follower', canActivate: [AuthGuardService], component:ListFollowerComponent},
  {path:'profile/:username/following', canActivate: [AuthGuardService], component:ListFollowingComponent},
  {path:'profile/:username', canActivate: [AuthGuardService], component:ProfileComponent},
  {path:'tweets', canActivate: [AuthGuardService], component:TweetsComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
