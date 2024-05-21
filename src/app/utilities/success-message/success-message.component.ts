import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<SuccessMessageComponent>,
  ) { }

  onSubmit(): void {
    this.form.close();
  }
}
