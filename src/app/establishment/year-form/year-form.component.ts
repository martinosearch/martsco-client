import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Year } from 'src/app/establishment/models/year';
import { YearService } from 'src/app/establishment/services/year.service';


@Component({
  selector: 'app-year-form',
  templateUrl: './year-form.component.html',
  styleUrls: ['./year-form.component.scss']
})
export class YearFormComponent implements OnInit {
  model = new Year();
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<YearFormComponent>,
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
