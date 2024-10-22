import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryModel } from "../model/CategoryModel"; 

@Injectable({
  providedIn: 'root'
})
export class ReportCategoryService {
  saveCategoryReport(reportCategory: CategoryModel) {
    throw new Error('Method not implemented.');
  }
  private url = "http://localhost:8020/category"; 

  constructor(private http: HttpClient) {}


  addReportCategory(reportCategory: CategoryModel) {
    return this.http.post<CategoryModel>(`${this.url}/saveReportCategory`, reportCategory, { observe: 'response' });
  }

  getAllReportCategories() {
    console.log("Fetching all report categories");
    return this.http.get<CategoryModel[]>(`${this.url}/getAllReportCategories`, { observe: 'response' });
  }

  deleteReportCategoryById(reportCategoryId: number) {
    return this.http.delete(`${this.url}/deleteCategory/${reportCategoryId}`, { observe: 'response' });
  }


  updateReportCategory(reportCategoryId: number, updatedReportCategory: CategoryModel) {
    console.log("Updating report category");
    return this.http.put(`${this.url}/updateCategory`, updatedReportCategory , { observe: 'response' });
  }


  getReportCategoryById(reportCategoryId: number) {
    console.log("Fetching report category by ID:", reportCategoryId);
    return this.http.get<CategoryModel>(`${this.url}/getCategoryReportById/${reportCategoryId}`, { observe: 'response' });
  }
}
