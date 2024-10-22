import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportModel } from '../model/ReportModel';
import { ReportService } from '../service/Report.service';
import { DepartmentModel } from '../model/DepartmentModel';
import { DepartmentService } from '../service/Department.service';
import { CategoryModel } from '../model/CategoryModel';
import { ReportCategoryService } from '../service/Reportcategory.service';
 
 
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{
  title = 'rms_project';
    reports: ReportModel[] = [];
    report: ReportModel = new ReportModel();
    categoryData : CategoryModel[]
    updatedData : ReportModel=new ReportModel();
    departments :DepartmentModel[] = [];
  reportCategories: CategoryModel[] =[];
 
    constructor(private reportService: ReportService, private router: Router,private departmentService: DepartmentService,private reportcategoryservice: ReportCategoryService

    ) {}
 
    //reportData : ReportModel[] =[]
    ngOnInit(): void {
      this.getAllReports();
      this.getAllDepartments();
      this.getAllReportCategories();
    }
    getAllReportCategories(): void {
      this.reportcategoryservice.getAllReportCategories().subscribe({
        next: res => {
          if (res.status === HttpStatusCode.Ok) {
            this.reportCategories = res.body || [];
            console.log('Fetched Report Categories:', this.reportCategories);
          }
        },
        error: err => {
          console.error('Error fetching report categories:', err);
        }
      });
    }
    getAllDepartments(): void {
      this.departmentService.getAllDepartments().subscribe({
        next: res => {
          if (res.status === HttpStatusCode.Ok) {
            this.departments = res.body || [];
            console.log('Fetched Departments:', this.departments);
          }
        },
        error: err => {
          console.error('Error fetching departments:', err);
        }
      });
    }
 
    getAllReports(): void {
      this.reportService.getAllReports().subscribe({
        next: res => {
          if (res.status === HttpStatusCode.Ok) {
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
          if (res.status === HttpStatusCode.Created) {
          this.getAllReports();
            console.log('Report added:', res.body);
            this.router.navigateByUrl('')
           this.resetForm();
           window.location.reload();
          }
        },
        error: err => {
          console.error('Error adding report:', err);
        }
      });
    }
 
    deleteReport(reportId: number): void {
      this.reportService.deleteReportById(reportId).subscribe({
        next: res => {
          if (res.status === HttpStatusCode.NoContent) {
            this.getAllReports();
            console.log('Report deleted:', reportId);
          }
        },
        error: err => {
          console.error('Error deleting report:', err);
        }
      });
    }
 
    updateReport1(reportId: number, updatedReport: ReportModel): void {
      this.reportService.updateReport(reportId, updatedReport).subscribe({
        next: res => {
          if (res.status === HttpStatusCode.PartialContent) {
            this.getAllReports();
            console.log('Report updated:', res.body);
            document.getElementById('closeButton').click()
            window.location.reload();
          }
        },
       
        error: err => {
          console.error('Error updating report:', err);
        }
      });
    }
 
    getReportById(reportId: number): void {
      this.reportService.getReportById(reportId).subscribe({
        next: res => {
          if (res.status === HttpStatusCode.Ok) {
           this.updatedData= res.body; // Set the fetched report to the local report object
            console.log('Fetched Report:',res.body);
          }
        },
        error: err => {
          console.error('Error fetching report:', err);
        }
      });
    }
 
    resetForm(): void {
      this.report = new ReportModel();
    }
    updateReport(){
      this.reportService.updateReport(this.updatedData.reportId, this.updatedData).subscribe({
        next: res => {
          if (res.status === HttpStatusCode.PartialContent) {
            this.getAllReports();
            console.log('Report updated:', res.body);
            window.location.reload();
          }
        },
        error: err => {
          console.error('Error updating report:', err);
        }
      });
    }
  }