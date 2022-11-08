import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamNational } from '../models/exam-national';
import { YearService } from '../services/year.service';

@Component({
  selector: 'app-exam-national-form',
  templateUrl: './exam-national-form.component.html',
  styleUrls: ['./exam-national-form.component.scss']
})
export class ExamNationalFormComponent implements OnInit {

  model = new ExamNational();
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<ExamNationalFormComponent>,
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
