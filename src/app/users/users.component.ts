import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../model/UserModel';
import { UserService } from '../service/user.service';
import { HttpStatusCode } from '@angular/common/http';
 
 
 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
  users: UserModel[] = [];
  email: string = '';
  password: string = '';
  login: any;
  loggedIn: boolean;
 
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}
 
  ngOnInit(): void {}
 
 
 
  // Login method
  onLogin():void {
 
    if (this.email && this.password) {
      const login = { email: this.email, password: this.password };
 
      this.userService.loginUser(login).subscribe({
        next: (res) => {
          // Assuming the backend returns the user object on successful login
          if (res.status === HttpStatusCode.Ok) {
            const userEmailId = res.body.email;
            localStorage.setItem('email', userEmailId);
               this.toastr.success('Login successful');
            //alert('Login successful');
            this.router.navigate(['/reports']);
          } else {
            this.toastr.error('Login failed: Invalid response');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          if (err.error && err.error.message) {
            this.toastr.error(`Login failed: ${err.error.message}`);
          } else {
            this.toastr.error('Login failed: An error occurred');
          }
        }
      });
    } else {
      this.toastr.error('Login failed: Please enter both email and password');
    }
  }

//   logout() {
//     this.loggedIn = false;
// }
}