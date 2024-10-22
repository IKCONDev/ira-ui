import { Component, OnInit } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReportModel } from './model/ReportModel';
import { DepartmentModel } from './model/DepartmentModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected from styleUrl to styleUrls
})
export class AppComponent implements OnInit {
  toaster: any;
  router: any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  } // Implementing OnInit if needed
  title = 'rms_project';

  logout() {
    // Clear user session (localStorage)
    localStorage.removeItem('email');
    
    // Display toaster message for successful logout
    this.toaster.success('Logout successful');
    
    // Redirect to the users page
    this.router.navigateByUrl('/users');
  }
}

  

