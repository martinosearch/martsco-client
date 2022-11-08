import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EmployeeIdentityService } from '../../employees-mg/services/employee-identity.service';
import { AppUser } from '../models/app-user';
import { EmployeeAuth } from '../models/employee-auth';
import { UserType } from '../models/user-type';
import { UserTypeService } from '../services/user-type.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  model = new EmployeeAuth();
  public event: EventEmitter<any> = new EventEmitter();
  employees = new Observable<AppUser[]>();
  userTypes = new Observable<UserType[]>();
  userId: number;
  userTypeId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<UserFormComponent>, public employeeService: EmployeeIdentityService,
    public userTypeService: UserTypeService
  ) { }

  ngOnInit() {
    this.model = this.data.obj;
    this.userId = this.model.id;
    this.userTypeId = this.model.userType ? this.model.userType.id : undefined;

    this.employees = this.employeeService.getAll();
    this.userTypes = this.userTypeService.getAll();
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.employeeService.getOne(this.userId).subscribe((response: EmployeeAuth) => {
      response.conxInfo.login = this.model.conxInfo.login;
      response.conxInfo.password = this.model.conxInfo.password;

      this.userTypeService.getOne(this.userTypeId).subscribe((resp) => {
        response.conxInfo.userType = resp;
        response.conxInfo.isAuth = false;
        this.event.emit(response);
        this.form.close();
      });
    });
  }
}
