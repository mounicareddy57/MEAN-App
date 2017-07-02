import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/notAuth.guard';

const appRoutes: Routes=[
{path: '', component: HomeComponent}, //default route
{path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]}, //dashboard page
{path: 'register', component: RegisterComponent, canActivate:[NotAuthGuard]}, //registration page
{path: 'login', component: LoginComponent, canActivate:[NotAuthGuard]}, //login page
{path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]}, //profile page
{path: '**', component: HomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  declarations: [], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
