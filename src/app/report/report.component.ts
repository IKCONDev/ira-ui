import { Component, OnInit } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ReportModel } from '../model/ReportModel';
import { ReportService } from './service/Report.service';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
  export class ReportComponent implements OnInit {
    reports: ReportModel[] = [];
    report:ReportModel=new ReportModel();
    selectedReport: ReportModel | null = null;
  
    constructor(private reportService: ReportService) {}
  
    ngOnInit(): void {
      this.getAllReports();
    }
  
    getAllReports(): void {
      this.reportService.getAllReports().subscribe({
        next: res => {
          if (res.status === 200) { // Check for HTTP status OK
            this.reports = res.body || [];
            console.log('Fetched Reports:', this.reports);
          }
        },
        error: err => {
          console.error('Error fetching reports:', err);
        }
      });
    }
    submitReport(): void {
      this.reportService.AddReport(this.report).subscribe({
        next: res => {
          if (res.status === 201) { // Check for created status
            this.getAllReports(); // Refresh the list
            console.log('Report added:', res.body);
          }
        },
        error: err => {
          console.error('Error adding report:', err);
        }
      });
    }
  
    deleteReport(reportId: string): void {
      this.reportService.deleteReportById(reportId).subscribe({
        next: res => {
          if (res.status === 204) { // Check for no content status
            this.getAllReports(); // Refresh the list
            console.log('Report deleted:', reportId);
          }
        },
        error: err => {
          console.error('Error deleting report:', err);
        }
      });
    }
  
    updateReport(reportId: string, updatedReport: ReportModel): void {
      this.reportService.updateReport(reportId, updatedReport).subscribe({
        next: res => {
          if (res.status === 200) { // Check for OK status
            this.getAllReports(); // Refresh the list
            console.log('Report updated:', res.body);
          }
        },
        error: err => {
          console.error('Error updating report:', err);
        }
      });
    }
  
    getReportById(reportId: string): void {
      this.reportService.getReportById(reportId).subscribe({
        next: res => {
          if (res.status === 200) { // Check for OK status
            this.selectedReport = res.body;
            console.log('Fetched Report:', this.selectedReport);
          }
        },
        error: err => {
          console.error('Error fetching report:', err);
        }
      });
    }
  }
  

