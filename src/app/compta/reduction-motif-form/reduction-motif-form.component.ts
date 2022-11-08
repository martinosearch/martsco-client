import { Component, OnInit, OnDestroy, Inject, EventEmitter } from '@angular/core';
import { ReductionMotif } from 'src/app/compta/models/reduction-motif';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReductionMotifService } from '../services/reduction-motif.service';


@Component({
  selector: 'app-reduction-motif-form',
  templateUrl: './reduction-motif-form.component.html',
  styleUrls: ['./reduction-motif-form.component.scss'],
})
export class ReductionMotifFormComponent implements OnInit, OnDestroy {
  model = new ReductionMotif();
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<ReductionMotifFormComponent>,
    public dataService: ReductionMotifService
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
