import { Injectable } from '@angular/core';
import { ShowMessageComponent } from 'src/app/utilities/show-message/show-message.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from '../success-message/success-message.component';
import { RejectedMessageComponent } from '../rejected-message/rejected-message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public dialog: MatDialog) { }

  showErrorMessage(message: any) {
    const dialogRef = this.dialog.open(ShowMessageComponent, {
      width: '600px',
      data: { titre: "Erreur : " + message }
    });
  }

  showAlertMessage(message: any) {
    const dialogRef = this.dialog.open(ShowMessageComponent, {
      width: '600px',
      data: { titre: message }
    });
  }

  showSucces(message?: string, autoClose?: boolean) {
    let finalMessage = "Succès !";
    if (message) {
      finalMessage = message;
    }

    const dialogRef = this.dialog.open(SuccessMessageComponent, {
      width: '300px',
      data: { titre: finalMessage }
    });

    if (autoClose === true) {
      this.sleep(1500).then(() => {
        dialogRef.close();
      })
    }
  }

  showReject(message?: string, autoClose?: boolean) {
    let finalMessage = "Échec !";
    if (message) {
      finalMessage = message;
    }

    const dialogRef = this.dialog.open(RejectedMessageComponent, {
      width: '300px',
      data: { titre: finalMessage }
    });

    if (autoClose === true) {
      this.sleep(1500).then(() => {
        dialogRef.close();
      })
    }

  }

  sleep(ms: number) {
    return new Promise(resolve => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }

}
