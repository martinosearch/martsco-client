import { animate, state, style, transition, trigger } from '@angular/animations';
import { JsonPipe } from '@angular/common';
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
import { UserService } from '../services/user.service';
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
    public dialog: MatDialog, private userService: UserService,
    private router: Router,
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.userService.getAll().subscribe({
      next: (resp) => {
        this.users = resp;
        //console.log(JSON.stringify(resp));
      }
    });
  }

  onDelete(obj: AppUser) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.login }
    });

    dialogRef.componentInstance.event.subscribe(response => {

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
        this.refresh();
      }
    );
  }

  onModify(user: AppUser): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '1000px',
      data: { titre: 'Modifier les infos.', obj: user }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      (response) => {
        this.refresh();
      }
    );
  }
}
