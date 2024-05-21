import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyMessage } from '../models/my-message';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss']
})
export class ShowMessageComponent implements OnInit {
  model = new MyMessage('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<ShowMessageComponent>,
  ) { }

  ngOnInit() {
    this.model = this.data.obj;
  }

  onSubmit(): void {
    this.form.close();
  }
}
