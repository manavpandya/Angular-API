import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from './Employee';
import { MyServiceService } from './my-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 5 CRUD Demo';
  employees: Employee[];
  statusCode: number;
  requestProcessing = false;
  recordToUpdate = null;
  processValidation = false;

  //Create form
  employeeForm = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Phone: new FormControl('', Validators.required),
    Blog: new FormControl('', Validators.required)
  });

  //Create constructor to get service instance
  constructor(private employeeService: MyServiceService) {
  }

  ngOnInit(): void {
    this.getAllEmployeeDetail();
  }

  //Fetch all articles
  getAllEmployeeDetail() {
    this.employeeService.getAllEmployees()
      .subscribe(
      data => this.employees = data,
      errorCode => this.statusCode = errorCode);
  }

  //Handle create and update article
  onemployeeFormSubmit() {
    this.processValidation = true;
    if (this.employeeForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let emp = this.employeeForm.value;
    if (this.recordToUpdate === null) {
      //Generate article id then create article
      this.employeeService.getAllEmployees()
        .subscribe(employees => {

          //Generate article id	 
          // let maxIndex = employees.length - 1;
          // let articleWithMaxIndex = employees[maxIndex];
          // let eId = articleWithMaxIndex.id + 1;
          // emp.id = eId;

          //Create article
          this.employeeService.AddEmployee(emp)
            .subscribe(successCode => {
              this.statusCode = successCode;
              this.getAllEmployeeDetail();
              this.backToCreateEmployee();
            },
            errorCode => this.statusCode = errorCode
            );
        });
    } else {
      //Handle update article
      emp.id = this.recordToUpdate;
      this.employeeService.updateEmployee(emp)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllEmployeeDetail();
          this.backToCreateEmployee();
        },
        errorCode => this.statusCode = errorCode);
    }
  }

  //Load article by id to edit
  GetEmployeetById(eid: string) {
    this.preProcessConfigurations();
    this.employeeService.getEmployeeById(eid)
      .subscribe(data => {
        console.log(data);
        this.recordToUpdate = data.id ;
        this.employeeForm.setValue({ FirstName: data.FirstName , LastName: data.LastName,Email:data.Email,Phone:data.Phone,Blog:data.Blog });
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);
  }

  //Delete article
  DeleteEmployee(articleId: string) {
    this.preProcessConfigurations();
    this.employeeService.deleteArticleById(articleId)
      .subscribe(successCode => {
        //this.statusCode = successCode;
        //Expecting success code 204 from server
        this.statusCode = 204;
        this.getAllEmployeeDetail();
        this.backToCreateEmployee();
      },
      errorCode => this.statusCode = errorCode);
  }

  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  //Go back from update to create
  backToCreateEmployee() {
    this.recordToUpdate = null;
    this.employeeForm.reset();
    this.processValidation = false;
  }

}
