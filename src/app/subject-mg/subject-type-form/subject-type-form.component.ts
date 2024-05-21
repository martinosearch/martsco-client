import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { YearService } from 'src/app/establishment/services/year.service';
import { SubjectType } from 'src/app/subject-mg/models/subject-type';

@Component({
  selector: 'app-subject-type-form',
  templateUrl: './subject-type-form.component.html',
  styleUrls: ['./subject-type-form.component.scss']
})
export class SubjectTypeFormComponent implements OnInit {
  model = new SubjectType();
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<SubjectTypeFormComponent>,
    public dataService: YearService
  ) { }

  ngOnInit() {
    this.model = this.data.obj;
  }

  onSubmit(): void {
    this.event.emit(this.model);
    this.form.close();
  }

  onNoClick() {

  }
}
