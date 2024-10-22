
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReportModel } from "../model/ReportModel";
 
@Injectable({
    providedIn:'root'
})
export class ReportService{
    private url="http://localhost:8020/report";
    constructor(private http:HttpClient){}
 
AddReport(report:ReportModel){
    return this.http.post<Report>(`${this.url}/saveReport`,report,{observe:'response'})
}
getAllReports()
{
    console.log("get all reports")
    return this.http.get<ReportModel[]>(`${this.url}/getAllReports`,{observe:'response'})
}
deleteReportById(reportId: number) {
    return this.http.delete(`${this.url}/delete/${reportId}`, { observe: 'response' });
}
updateReport(reportId: number, updatedReport: ReportModel)
{
    console.log("data")
    return this.http.put(`${this.url}/update`, updatedReport, { observe: 'response' });
}
getReportById(reportId: number)
{
    console.log("data")
    return this.http.get<ReportModel>(`${this.url}/getReportById/${reportId}`, { observe: 'response' });
}
}
 
