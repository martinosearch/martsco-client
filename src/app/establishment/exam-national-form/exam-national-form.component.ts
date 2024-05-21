import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamNational } from '../models/exam-national';
import { ExamNationalService } from '../services/exam-national.service';
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
    public dataService: ExamNationalService
  ) { }

  ngOnInit() {
    this.model = this.data.obj;
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.dataService.save(this.model).subscribe({
      next: (resp) => {
        this.event.emit(resp);
        this.form.close();
      }
    });
  }
}
