import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/service/user.service';
 
@Component({
  selector: 'app-new-password-page',
  templateUrl: './new-password-page.component.html',
  styleUrl: './new-password-page.component.css'
})
export class NewPasswordPageComponent
{
 
 
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  //userservice: any;
 
  constructor(private router:Router, private userservice:UserService){}
 
 
 
savePassword(): void {
   
    if (!this.email || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'All fields are required.';
      return;
    }
 
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
 
    console.log('Email:', this.email);
    console.log('New Password:', this.newPassword);
    console.log('Confirm Password:', this.confirmPassword);
   
    this.userservice.resetPassword(this.email, this.newPassword, this.confirmPassword).subscribe({
      next: (isSuccessful: boolean) => {
        if (isSuccessful)
          {
          this.successMessage = 'Password updated successfully!';
          this.errorMessage = '';
          this.router.navigateByUrl('/users');
        } else {
          this.errorMessage = 'Failed to update password. Please try again.';
          this.successMessage = '';
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error details:', error);
        this.errorMessage = 'Failed to verify new password. Please try again.';
        this.successMessage = '';
      }
    });
  }
}