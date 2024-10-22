import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/service/user.service';
 
@Component({
  selector: 'app-verify-otp-page',
  templateUrl: './verify-otp-page.component.html',
  styleUrl: './verify-otp-page.component.css'
})
 
export class VerifyOtpPageComponent
{
  otp: string = '';
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';
 
    constructor(private http: HttpClient,private userService:UserService,private router:Router) {}
 
 
 
 
    onVerifyOtp() {
      if (!this.email || !this.otp) {
        this.errorMessage = 'Please enter OTP.';
        this.successMessage = '';
        return;
      }
 
      this.userService.verifyOtp(this.email, this.otp).subscribe({
        next: (response) => {
          if (response) {
            this.successMessage = 'OTP verified successfully!';
            
            this.router.navigate(['/newpassword']);
          } else {
            this.errorMessage = 'Failed to verify OTP. Please try again.';
          }
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'Failed to verify OTP. Please try again.';
          this.successMessage = '';
        }
      });
    }
  }
 