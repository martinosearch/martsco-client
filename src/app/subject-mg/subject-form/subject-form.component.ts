import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { MySubject } from 'src/app/subject-mg/models/subject';
import { SubjectType } from 'src/app/subject-mg/models/subject-type';

import { EmployeeIdentityService } from '../../employees-mg/services/employee-identity.service';
import { SubjectTypeService } from '../subject-type.service';
import { ConstanceService } from '../../utilities/services/constance.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit, OnDestroy {
  public model: MySubject;
  public subjectTypeId: number;
  public event: EventEmitter<any> = new EventEmitter();
  public types = new Observable<SubjectType[]>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<SubjectFormComponent>,
    public employeeService: EmployeeIdentityService,
    public constanceService: ConstanceService, public subjectTypeService: SubjectTypeService
  ) { }

  ngOnInit() {
    this.types = this.subjectTypeService.getAll();
    this.model = this.data.obj;
    this.subjectTypeId = this.model.type !== null ? this.model.type.id : undefined;
  }

  ngOnDestroy(): void {
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.subjectTypeService.getOne(this.subjectTypeId).subscribe(
      (response) => {
        this.model.type = response;
        this.event.emit(this.model);
        this.form.close();
      },
      (error: HttpErrorResponse) => {
        console.log('Error: ' + error.status);
        this.event.emit(this.model);
        this.form.close();
      }
    );
  }
}
