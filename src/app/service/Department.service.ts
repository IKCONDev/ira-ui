import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DepartmentModel } from "../model/DepartmentModel";

@Injectable({
    providedIn:'root'
})
export class DepartmentService{
  
    saveDepartment(department: DepartmentModel) {

    }
    private url="http://localhost:8020/departments";
    constructor(private http:HttpClient){}
   
    AddDepartment(department:DepartmentModel){
        console.log("data added")
        return this.http.post<DepartmentModel>(`${this.url}/saveDepartment`,department,{observe:'response'})
    }
    getAllDepartments(){
        return this.http.get<DepartmentModel[]>(`${this.url}/getAllDepartments`,{observe:'response'})
    }
    
    deleteDepartmentById(departmentId:number){
        return this.http.delete<number>(`${this.url}/delete/${departmentId}`,{observe:'response'})
    }
    getDepartmentById(departmentId:number){
        return this.http.get<DepartmentModel>(`${this.url}/getDepartmentById/${departmentId}`,{observe:'response'})
    }
    updateDepartment(departmentId:number,updateDepartment:DepartmentModel){
        var headers = new HttpHeaders()
        .set('content-type','application/json');
        return this.http.put<DepartmentModel>(`${this.url}/update`,updateDepartment,{observe:'response'
            ,headers: headers})
    }
}