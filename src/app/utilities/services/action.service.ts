import { ObserversModule } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MessageService } from './message.service';
import { Action } from '../beans/action';

@Injectable({
  providedIn: 'root'
})

export class ActionService {
  actions: Action[] = [];
  numberOfCall = 0;
  currentAction: Action;

  constructor(public dialog: MatDialog, private messageService: MessageService) {
    // const action = new Action();
    // action.progressId = 2;
    // action.progressValue = 80;
    // action.progressMessage = "Veuillez patienter, action en cours...";
    // this.actions.push(action);
  }

  launchWaiting(progressId: number) {
    console.log("launch waiting..."); 
    const action = new Action();
    action.progressId = progressId;
    action.mode = "indeterminate";
    action.progressDeterminate = false;
    action.progressMessage = "Veuillez patienter...";

    this.actions.push(action);
  }

  stopWaiting(progressId: number) {

    // let count = 0;
    // for (const action of this.actions) {
    //   if (action.progressId === progressId) {
    //     this.actions.splice(count, 1);
    //   }
    //   count++;
    // }

    this.actions = this.actions.filter(item => item.progressId !== progressId);
  }

  launchAction(observable: Observable<any>, progressDeterminate?: boolean): Observable<any> {

    return new Observable((observer) => {
      const action = new Action();
      if (progressDeterminate) {
        if (progressDeterminate == true) {
          action.progressDeterminate = true;
          action.mode = "determinate";
        } else {
          action.progressDeterminate = false;
          action.mode = "indeterminate";
        }
      } else {
        action.progressDeterminate = true;
        action.mode = "determinate";
      }

      observable.subscribe({
        next: (resp) => {
          console.log("response >>>>> " + resp);
          console.log("response >>>>> " + JSON.stringify(resp));

          if (resp !== undefined) {
            if (!isNaN(resp) && action.progressId === undefined) {
              action.progressId = parseInt(resp.toString());
              this.insureAction(action);
            } else if (resp instanceof EventSource) {
              resp.addEventListener('message', message => {
                const progress = JSON.parse(message.data);

                console.log("progress: >>> " + JSON.stringify(progress));

                action.progressValue = progress.progress;
                action.progressMessage = progress.message;

                //remove progress
                if (action.progressValue >= 100) {
                  this.stopWaiting(action.progressId);
                } else {
                  this.insureAction(action);
                }
              });
            } else {
              console.log(">>>> Action finished!");
              observer.next(resp);
            }
          }
        },

        error: (e) => {
          observer.error(e);
        }
      });
    });
  }

  insureAction(action: Action) {
    // add action to list of actions
    const exists = this.actions.filter(item => item.progressId === action.progressId);
    if (exists.length === 0) {
      this.actions.push(action);
    }
  }

  eventEmitDoubleClick(event: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment interropre cette progresssion?' }
    });
    dialogRef.componentInstance.event.subscribe(response => {
      this.actions = this.actions.filter(item => item.progressId !== this.currentAction.progressId);
    });
  }

  setCurrentProgress(action: Action) {
    this.currentAction = action;
  }
}
