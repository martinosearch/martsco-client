import { Component, OnInit, OnDestroy, Inject, EventEmitter, ElementRef, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EmployeeIdentityBean } from "src/app/employees-mg/models/employee-identity-bean";
import { EmployeeIdentityService } from "src/app/employees-mg/services/employee-identity.service";
import { AppUser } from "../models/app-user";
import { EmployeeAuth } from "../models/employee-auth";
import { AuthService } from "../services/auth.service";
import { EmployeeAuthService } from "../services/employee-auth.service";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  model = new AppUser();
  types = [];
  public event: EventEmitter<any> = new EventEmitter();
  public hide = true;
  employees: EmployeeIdentityBean[] = [];
  users: EmployeeAuth[] = [];

  loginExists = false;
  currentEmployee: EmployeeIdentityBean;

  @ViewChild('password', { static: false }) password: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<LoginFormComponent>,
    public employeeService: EmployeeIdentityService, public authService: AuthService,
    public employeeAuthService: EmployeeAuthService
  ) { }

  ngOnInit() {
    this.employeeService.getAll().subscribe((resp) => {
      this.employees = resp;
    });

    this.employeeAuthService.getAll().subscribe((resp) => {
      this.users = resp;
    });

    if (this.data.obj !== undefined) {
      this.model = this.data.obj;
    }
  }

  ngOnDestroy(): void {
    this.model = undefined;
  }

  onNoClick(): void {
    this.form.close();
  }

  userExists() {
    // console.log("je suis appelé... employees size: " + this.employees.length);
    for (const user of this.users) {
      //console.log("loops: " + user.conxInfo.login);

      if (user.conxInfo.login === this.model.login) {
        this.loginExists = true;

        this.currentEmployee = this.employees.filter(empl => empl.id === user.id)[0];

        this.model.password = undefined;
        break;
      } else {
        this.loginExists = false;
        this.currentEmployee = undefined;
      }
    }

    if (this.loginExists) {
      this.resolveLogin(500).then((password: ElementRef) => {
        password.nativeElement.focus();
      });
    }
  }

  resolveLogin(ms: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.password);
      }, ms);
    });
  }

  onSubmit(): void {
    this.model.isAuth = false;
    this.authService.login(this.model.login, this.model.password);
    this.form.close();
  }
}
