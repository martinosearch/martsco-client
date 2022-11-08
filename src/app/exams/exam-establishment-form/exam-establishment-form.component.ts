import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { YearFormComponent } from 'src/app/establishment/year-form/year-form.component';
import { EstablishmentExamIdentityBean } from '../models/exam-establishment-identity-bean';
import { EstablishmentExamIdentityService } from '../services/establishment-exam-identity.service';

@Component({
  selector: 'app-exam-establishment-form',
  templateUrl: './exam-establishment-form.component.html',
  styleUrls: ['./exam-establishment-form.component.scss']
})
export class ExamEstablishmentFormComponent implements OnInit {

  model = new EstablishmentExamIdentityBean();
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<YearFormComponent>,
    public dataService: EstablishmentExamIdentityService
  ) { }

  ngOnInit() {
    this.model = this.data.obj;
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.dataService.save(this.model).subscribe((resp) => {
      this.event.emit();
      this.form.close();
    });
  }
}
