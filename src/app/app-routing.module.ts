import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReportsComponent } from './reports/reports.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CategoryComponent } from './category/category.component';
import { UsersComponent } from './users/users.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpPageComponent } from './verify-otp-page/verify-otp-page.component';
import { NewPasswordPageComponent } from './new-password-page/new-password-page.component';


const routes: Routes = [
  { path: 'reports', component: ReportsComponent },
  { path: 'home', component: ReportsComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'reportcategory', component: CategoryComponent },
  { path: 'users', component: UsersComponent},
  {path:'forgot',component:ForgotPasswordComponent},
  {path:'verify',component:VerifyOtpPageComponent}  ,
  {path:'newpassword',component:NewPasswordPageComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
