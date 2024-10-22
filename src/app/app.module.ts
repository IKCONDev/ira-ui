import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReportsComponent } from './reports/reports.component';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentsComponent } from './departments/departments.component';
import { CategoryComponent } from './category/category.component';
import { UsersComponent } from './users/users.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpPageComponent } from './verify-otp-page/verify-otp-page.component';
import { NewPasswordPageComponent } from './new-password-page/new-password-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    DepartmentsComponent,
    CategoryComponent,
    UsersComponent,
    ForgotPasswordComponent,
    VerifyOtpPageComponent,
    NewPasswordPageComponent,
 
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    ToastrModule.forRoot({ // ToastrModule added
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }