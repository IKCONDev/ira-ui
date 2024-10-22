import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit
 {
newPassword: string = '';
  confirmPassword: string = '';
  showForgotPassword: boolean = false;
  email: any;
  errorMessage: string;
 // userservice: any;
  successMessage: string;
  otp: any;
  toastr: any;
  //toastr: any;
 
  constructor( private router :Router , private userservice:UserService,  private toaster:ToastrService){}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    //this.backToLogin()
  }
       

 
 
 
  backToLogin(){
    this.router.navigateByUrl('/users');
  }
 
 
  sendOtp(): void {
    if (!this.email) {
      this.errorMessage = 'Email is required.';
      return;
    }
  }
  onVerifyOtp(){
    this.router.navigateByUrl('')
  }
 
  // generateOtp(email: string): Observable<any> {
  //   console.log("the email"+ this.email)
   
  //   return this.userservice.generateOtp(this.email);
  // }
  
  generateOtp(): void {
    if (this.email) {
      this.userservice.generateOtp(this.email).subscribe({
        next: (response) => {
          console.log(`OTP sent to: ${this.email}`);
          this.successMessage = 'OTP sent successfully.';
          
          this.router.navigate(['/verify']);
          // Show success toaster message
          this.toastr.success(this.successMessage);
  
        },
        error: (error) => {
          console.error('Error occurred while generating OTP:', error);
          this.errorMessage = 'Failed to send OTP. Please try again.';
          
          // Show error toaster message
          this.toastr.error(this.errorMessage);
        }
      });
    } else {
      this.errorMessage = 'Email is required.';
      
      // Show warning toaster message for missing email
      this.toastr.warning(this.errorMessage);
    }
  }
 }
  