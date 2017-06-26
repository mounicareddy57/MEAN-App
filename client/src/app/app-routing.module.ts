import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';

const appRoutes: Routes=[
{path: '', component: HomeComponent}, //default route
{path: 'dashboard', component: DashboardComponent}, //dashboard page
{path: 'register', component:RegisterComponent}, //registration page
{path: '**', component: HomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  declarations: [], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
