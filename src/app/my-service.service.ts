import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from './Employee';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

@Injectable()
export class MyServiceService {

  //URL for CRUD operations
  baseUrl: string = "http://localhost:52081/";

  constructor(private http: Http) { }

  //Fetch all articles
  getAllEmployees(): Observable<Employee[]> {

    return this.http.get(this.baseUrl + 'GetEmployeeList')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);

    // return this.http.get(this.baseUrl+"GetEmployeeList").map(this.extractData).catch(this.handleError);
  }

  //Create article
  AddEmployee(employee: Employee): Observable<number> {
    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.baseUrl + "AddEmployee", employee)
      .map(success => success.status)
      .catch(this.handleError);
  }

  //Fetch article by id
  getEmployeeById(eid: string): Observable<Employee> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    console.log(this.baseUrl + "/" + eid);
    return this.http.get(this.baseUrl + "GetEmployeeById?eId=" + eid)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Update article
  updateEmployee(employee: Employee): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.baseUrl + "UpdateEmployee?empId=" + employee.id, employee, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  //Delete article	
  deleteArticleById(empId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.baseUrl + "DeleteEmployee?id=" + empId)
      .map(success => success.status)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
