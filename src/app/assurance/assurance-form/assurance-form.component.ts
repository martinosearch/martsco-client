import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssuranceService } from 'src/app/assurance/assurance.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { Assurance } from '../models/assurance';


@Component({
  selector: 'app-assurance-form',
  templateUrl: './assurance-form.component.html',
  styleUrls: ['./assurance-form.component.scss']
})

export class AssuranceFormComponent implements OnInit, OnDestroy {
  model = new Assurance();
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<Assurance>,
    public dataService: AssuranceService,
    public constanceService: ConstanceService
  ) { }

  ngOnInit() {
    this.model = this.data.obj;
  }

  ngOnDestroy(): void {
    this.dataService.refresh();
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.event.emit(this.model);
    this.form.close();
  }
}
