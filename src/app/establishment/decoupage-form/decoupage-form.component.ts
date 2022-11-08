import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Decoupage } from '../../establishment/models/decoupage';
import { DecoupageType } from '../../establishment/models/decoupage-type';
import { DecoupageTypeService } from '../services/decoupage-type.service';

@Component({
  selector: 'app-decoupage-form',
  templateUrl: './decoupage-form.component.html',
  styleUrls: ['./decoupage-form.component.scss']
})
export class DecoupageFormComponent implements OnInit {
  model = new Decoupage();
  public event: EventEmitter<any> = new EventEmitter();
  //public decTypeId: number;
  public decTypes = new Observable<DecoupageType[]>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<DecoupageFormComponent>,
    public decTypeService: DecoupageTypeService
  ) { }

  ngOnInit() {
    this.model = this.data.obj;
    // this.decTypeId = this.model.type !== undefined ? this.model.type.id : undefined;
    this.decTypes = this.decTypeService.getAll();
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.event.emit(this.model);
    this.form.close();
  }
}
