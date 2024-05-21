import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EstablishmentType } from '../models/establishment-type';
import { EstablishmentTypeService } from '../services/establishment-type.service';

@Component({
  selector: 'app-establishment-type-form',
  templateUrl: './establishment-type-form.component.html',
  styleUrls: ['./establishment-type-form.component.scss']
})
export class EstablishmentTypeFormComponent implements OnInit {
  model = new EstablishmentType();
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<EstablishmentTypeFormComponent>,
    public dataService: EstablishmentTypeService
  ) { }

  ngOnInit() {
    this.model = Object.assign({}, this.data.obj);
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.event.emit(this.model);
    this.form.close();
  }
}
