import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeIdentityBean } from 'src/app/employees-mg/models/employee-identity-bean';
import { EmployeeIdentityService } from 'src/app/employees-mg/services/employee-identity.service';
import { Identity } from 'src/app/establishment/models/identity';
import { ConfirmDeleteComponent } from 'src/app/utilities/confirm-delete/confirm-delete.component';
import { RouteService } from 'src/app/utilities/services/route.service';
import { AppUser } from '../models/app-user';
import { EmployeeAuth } from '../models/employee-auth';
import { AuthService } from '../services/auth.service';
import { EmployeeAuthService } from '../services/employee-auth.service';
import { UserFormComponent } from './../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserListComponent implements OnInit, OnDestroy {
  expandedElement: AppUser | null;
  displayedColumns = [
    'num',
    'login',
    'modify',
    'suppr',
    'isConnected'
  ];

  users: AppUser[] = [];
  employeeAuths: EmployeeAuth[] = [];

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private employeeService: EmployeeIdentityService, private employeeAuthService: EmployeeAuthService,
    private router: Router,
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.employeeService.getAll().subscribe({
      next: (respId: EmployeeIdentityBean[]) => {
        this.employeeAuthService.getAll().subscribe({
          next: (respAuth: EmployeeAuth[]) => {
            for (const user of respAuth) {
              this.employeeAuths = respAuth;
              const appUser = new AppUser();
              appUser.id = user.id;
              appUser.login = user.conxInfo.login;
              appUser.password = user.conxInfo.password;
              appUser.wasPersonnalized = user.conxInfo.wasPersonnalized;
              appUser.isAuth = user.conxInfo.isAuth;

              const userId = respId.filter((item) => item.id === user.id)[0];

              if (userId !== undefined) {
                appUser.identity = userId.identity;
              } else {
                appUser.identity = new Identity();
              }
              this.users.push(appUser);
            }

            this.users = this.users.slice();
          }
        });
      }
    });
  }

  onDelete(obj: AppUser) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.login }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.employeeService.delete(obj.id).subscribe(resp => {
        this.refresh();
      });
      this.refresh();
    });
  }

  onDetail(obj: AppUser) {
    this.router.navigate([this.routeService.userShowRoute]).then(data => {
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '1000px',
      data: { titre: 'Ajouter un utilisateur', obj: new AppUser() }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.employeeService.save(response.obj).subscribe(response2 => {
          this.refresh();
        });
      }
    );
  }

  onModify(user: AppUser): void {
    const data = this.employeeAuths.filter((item) => item.id === user.id)[0];

    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '1000px',
      data: { titre: 'Modifier les infos.', obj: data }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      (response) => {
        this.employeeService.save(response).subscribe(response2 => {
          this.refresh();
        });
      }
    );
  }
}
