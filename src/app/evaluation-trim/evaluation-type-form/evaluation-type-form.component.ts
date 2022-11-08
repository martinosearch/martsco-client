import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubjectType } from 'src/app/subject-mg/models/subject-type';

import { YearService } from '../../establishment/services/year.service';

@Component({
  selector: 'app-evaluation-type-form',
  templateUrl: './evaluation-type-form.component.html',
  styleUrls: ['./evaluation-type-form.component.scss']
})

export class EvaluationTypeFormComponent implements OnInit {
  model = new SubjectType();
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<EvaluationTypeFormComponent>,
    public dataService: YearService
  ) { }

  ngOnInit() {
    this.model = this.data.obj;
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.event.emit(this.model);
    this.form.close();
  }
}

