import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { IsOwnerGuard } from './guards/is-owner.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'chat', canActivate: [AuthGuard],
    children: [
      {path: '', component: ChatComponent },
      {path: ':chatroomId', component: ChatComponent }
    ]},
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'profile/:userId/edit', component: EditProfileComponent, canActivate: [AuthGuard, IsOwnerGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
