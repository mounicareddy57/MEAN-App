import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';

const appRoutes: Routes=[
{path: '', component: HomeComponent}, //default route
{path: 'dashboard', component: DashboardComponent}, //dashboard page
{path: 'register', component: RegisterComponent}, //registration page
{path: 'login', component: LoginComponent}, //login page
{path: 'profile', component: ProfileComponent}, //profile page
{path: '**', component: HomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  declarations: [], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
