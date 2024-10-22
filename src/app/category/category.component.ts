import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from '../model/CategoryModel';
import { ReportCategoryService } from '../service/Reportcategory.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  reportCategories: CategoryModel[] = [];
  reportCategory: CategoryModel = new CategoryModel();
  updatedReportCategory: CategoryModel=new CategoryModel();

  reportCategoryStatusValid: boolean = true;
  reportCategoryStatusErrorMessage: string = '';
  reportCategoryNameInput: boolean = true; 
  reportCategoryNameErrorMessage: string = '';
  category: any;
  categoryNameInput: boolean;
  categoryNameErrorMessage: string;

  constructor(private router: Router, private reportCategoryService: ReportCategoryService)
   {}

  ngOnInit(): void {
    this.getAllReportCategories();
  }

  getAllReportCategories(): void {
    this.reportCategoryService.getAllReportCategories().subscribe({
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

  SaveCategory(): void {
    this.reportCategoryService.addReportCategory(this.reportCategory).subscribe({
      next: res => {
        if (res.status === HttpStatusCode.Created) {
          this.getAllReportCategories();
          console.log('Report category added:', res.body);
          this.resetForm();
          window.location.reload();
        }
      },
      error: err => {
        console.error('Error adding report category:', err);
      }
    });
  }
  
  resetForm(): void {
    this.reportCategory = new CategoryModel(); 
    this.reportCategoryStatusValid = true; 
    this.reportCategoryNameInput = true;
    this.reportCategoryStatusErrorMessage = '';
    this.reportCategoryNameErrorMessage = '';
  }

  updateCategory(reportCategoryId: number, category: CategoryModel): void {
    this.reportCategoryService.updateReportCategory(reportCategoryId, category).subscribe({
      next: res => {
        if (res.status === HttpStatusCode.PartialContent) {
          this.getAllReportCategories();
          console.log('Report category updated:', res.body);
          document.getElementById('closeButton').click();
          window.location.reload(); 
        }
      },
      error: err => {
        console.error('Error updating report category:', err);
      }
    });
  }
  
  getReportCategoryById(reportCategoryId: number): void {
    this.reportCategoryService.getReportCategoryById(reportCategoryId).subscribe({
      next: res => {
        if (res.status === HttpStatusCode.Ok) {
          this.updatedReportCategory = res.body;
          console.log('Fetched Report Category:', res.body);
        }
      },
      error: err => {
        console.error('Error fetching report category:', err);
      }
    });
  }

  deleteCategory(reportCategoryId: number): void {
    console.log("Deleting report category with ID:", reportCategoryId);
    this.reportCategoryService.deleteReportCategoryById(reportCategoryId).subscribe({
      next: res => {
        if (res.status === HttpStatusCode.NoContent) {
          this.getAllReportCategories(); 
          window.location.reload();
          console.log("Report category deleted");
        }
      },
      error: err => {
        console.error('Error deleting report category:', err);
      }
    });
  }

  

  categoryStatusChange(): void {
    const reportCategoryStatus = this.reportCategory.reportcategoryStatus?.trim();
    if (!reportCategoryStatus) {
      this.reportCategoryStatusValid = false;
      this.reportCategoryStatusErrorMessage = 'Please select the report category status.';
    } else if (reportCategoryStatus.length <= 1) {
      this.reportCategoryStatusValid = false;
      this.reportCategoryStatusErrorMessage = 'Report category status should be at least 2 characters long.';
    } else {
      this.reportCategoryStatusValid = true;
      this.reportCategoryStatusErrorMessage = '';
    }
  }

  CancelButton(){
  console.log('Cancel button clicked');
    }

    getCategoryReportById(categoryID: number){

    }

  categoryNameChange(): void {
    const categoryName = this.category.categoryName?.trim();
    if (!categoryName) {
      this.categoryNameInput = false;
      this.categoryNameErrorMessage = 'Please enter category name to save.';
    } else if (categoryName.length <= 1) {
      this.categoryNameInput = false;
      this.categoryNameErrorMessage = 'Category name should be minimum 1 character to save.';
    } else {
      this.categoryNameInput = true;
      this.categoryNameErrorMessage = '';
    }
  }
  
}