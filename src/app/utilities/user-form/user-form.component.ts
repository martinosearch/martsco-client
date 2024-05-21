import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppUser } from '../models/app-user';
import { UserType } from '../models/user-type';
import { UserTypeService } from '../services/user-type.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  model = new AppUser();
  public event: EventEmitter<any> = new EventEmitter();
  users: AppUser[] = [];
  userTypes: UserType[] = [];
  userTypeId: number;
  userName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<UserFormComponent>, public userService: UserService,
    public userTypeService: UserTypeService
  ) { }

  ngOnInit() {
    this.model = this.data.obj;
    this.userTypeId = this.model.userTypeId !== null ? this.model.userTypeId : 1;
    this.userName = this.model.identity !== null ? this.model.identity.lastName
      + " " + this.model.identity.firstName : "";

    this.userService.getAll().subscribe({ next: (resp) => { this.users = resp } });
    this.userTypeService.getAll().subscribe({ next: (resp) => { this.userTypes = resp } });
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.model.userTypeId = this.userTypeId;
    this.userService.save(this.model).subscribe({
      next: (resp) => {
        this.event.emit(resp);
        this.form.close();
      }
    });
  }
}
