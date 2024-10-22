import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from '../service/Department.service';
import { DepartmentModel } from '../model/DepartmentModel';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit{
departments: DepartmentModel[] =[];
 department:DepartmentModel=new DepartmentModel();
  
updatedDepartment: DepartmentModel=new DepartmentModel();
  departmentStatusValid: boolean;
  departmentStatusErrorMessage: string;
  departmentNameInput: boolean;
  departmentNameErrorMessage: string;
  
     constructor(private router:Router,private departmentService:DepartmentService){}
 ngOnInit(): void {
  this.getAllDepartments();
  }
  getAllDepartments(){
    this.departmentService.getAllDepartments().subscribe({
      next: res => {
        if (res.status === HttpStatusCode.Ok) {
          this.departments = res.body ;
          console.log('Fetched Departments:', this.departments);
        }
      },
      error: err => {
        console.error('Error fetching departments:', err);
      }
    });
  }


  SaveDepartment(): void {
    this.departmentService.AddDepartment(this.department).subscribe({
      next: res => {
        if (res.status === HttpStatusCode.Created) {
          this.getAllDepartments();
          console.log('Department added:', res.body);
          //this.router.navigateByUrl('');
          this.resetForm();
          window.location.reload();
        }
      },
      error: err => {
        console.error('Error adding department:', err);
      }
    });
  }
  resetForm() {
    throw new Error('Method not implemented.');
  }
 
  updateDepartment1(departmentId: number, updatedDepartment: DepartmentModel): void {
    this.departmentService.updateDepartment(departmentId, updatedDepartment).subscribe({
      next: res => {
        if (res.status === HttpStatusCode.PartialContent) {
          //this.getAllDepartments();
          console.log('Department updated:', res.body);
          //document.getElementById('closeButton').click(); 
          window.location.reload();
        }
      },
      error: err => {
        console.error('Error updating department:', err);
      }
    });
  }
  


  getDepartmentById(departmentId: number): void {
    this.departmentService.getDepartmentById(departmentId).subscribe({
      next: res => {
        if (res.status === HttpStatusCode.Ok) {
          this.updatedDepartment = res.body; 
          console.log('Fetched Department:', res.body);
        }
      },
      error: err => {
        console.error('Error fetching department:', err);
      }
    });
  }


  updateDepartment(): void {
    this.departmentService.updateDepartment(this.updatedDepartment.departmentId, this.updatedDepartment).subscribe({
      next: res => {
        if (res.status === HttpStatusCode.PartialContent) {
          //this.getAllDepartments();
          console.log('Department updated:', res.body);
          window.location.reload();
        }
      },
      error: err => {
        console.error('Error updating department:', err);
      }
    });
  }
  
  
deleteDepartment(departmentId:number)
{
    console.log("data" +departmentId)
    this.departmentService.deleteDepartmentById(departmentId).subscribe({
      next:res=>{
        if(res.status===HttpStatusCode.NoContent)
          {
            window.location.reload();
          console.log("department deleted")
        }
      }
    })
  }
  CancelButton() {
     
    console.log('Cancel button clicked');
    
}
departmentStatusChange(){

    const departmentStatus = this.department.departmentStatus.trim();
    if (!departmentStatus) {
        this.departmentStatusValid = false;
        this.departmentStatusErrorMessage = 'Please select the department status.';
    } else if (departmentStatus.length <= 1) {
        this.departmentStatusValid = false;
        this.departmentStatusErrorMessage = 'Department status should be at least 2 characters long.';
    } else {
        this.departmentStatusValid = true;
        this.departmentStatusErrorMessage = '';
    }
}

departmentNameChange() {
  const departmentName = this.department.departmentName;
  if (!departmentName) {
      this.departmentNameInput = false;
      this.departmentNameErrorMessage = 'Please enter department name to save';
  } else if (departmentName.length <= 1) {
      this.departmentNameInput = false;
      this.departmentNameErrorMessage = 'Department name should be minimum 1 characters to save';
  } else {
      this.departmentNameInput = true;
      this.departmentNameErrorMessage = '';
  }
}
}


 






