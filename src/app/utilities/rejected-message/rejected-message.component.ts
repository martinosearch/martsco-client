import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rejected-message',
  templateUrl: './rejected-message.component.html',
  styleUrls: ['./rejected-message.component.scss']
})
export class RejectedMessageComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<RejectedMessageComponent>,
  ) { }

  onSubmit(): void {
    this.form.close();
  }

}
