import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MySubject } from 'src/app/subject-mg/models/subject';
import { ActionService } from 'src/app/utilities/services/action.service';

import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { SubjectFormComponent } from '../subject-form/subject-form.component';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { SubjectService } from '../subject.service';
import { MessageService } from 'src/app/utilities/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/utilities/services/auth.service';


@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})

export class SubjectListComponent implements OnInit, OnDestroy {
  displayedColumns = ['num', 'designation', 'type', 'dim', 'modify', 'suppr'];
  expandedElement: MySubject = null;

  filteredList = new Observable<MySubject[]>();
  list: MySubject[] = [];
  public filterControl = new FormControl();
  contentHeight = 300;

  constructor(
    public auth: AuthService, private messageService: MessageService,
    public dialog: MatDialog, public actionService: ActionService, public progressService: ProgressService,
    private dataService: SubjectService,
  ) { }

  ngOnInit() {
    this.refresh();
    // for autocomplete
    this.filterControl.valueChanges.pipe(
      startWith(''), map(value => this.filter(value))
    ).subscribe((resp) => {
      this.filteredList = of(resp);
    });

    this.resize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize();
  }
  resize() {
    this.contentHeight = window.innerHeight - (window.innerHeight * 0.22);
  }

  ngOnDestroy(): void { }

  refresh() {
    this.dataService.getAll().subscribe((resp) => {
      this.list = resp;
      this.filteredList = of(resp);
    })
  }

  onDelete(obj: MySubject) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation !== null ? obj.designation : 'cette matière ' + '?' }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.dataService.delete(obj.id).subscribe(
        resp => {
          console.log('deleted: ' + obj);
          this.refresh();
        },
        (error: HttpErrorResponse) => {
          this.messageService.showErrorMessage(error.error.message);
        }
      );
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(SubjectFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter une matière', obj: new MySubject() }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.dataService.save(response).subscribe(response2 => {
          console.log('saved: ' + response2.designation);
          this.refresh();
        });
      }
    );
  }

  onModify(currentObj: MySubject): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(SubjectFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.dataService.save(response).subscribe(response2 => {
          console.log('saved: ' + response2.designation);
          this.refresh();
          validationSub.unsubscribe();
        });
      }
    );
  }


  // filter for test autocomplete
  private filter(value: string): MySubject[] {
    if (typeof value === 'string') {
      console.log('the current value for analyse is: ' + value);
      if (value === '') {
        console.log('je suis ici: ' + value);
        return this.list;
      } else {
        const filterValue = value.toLowerCase();
        return this.list.filter(option =>
          (option.designation).toLowerCase().includes(filterValue)
        );
      }
    } else {
      return this.list;
    }
  }

  onSetting(): void {

  }

  moveDown() {
    const index = this.expandedElement.orderSubj;
    console.log("order current: " + this.expandedElement.orderSubj);

    let i = 0;

    for (const subj of this.list) {
      if (index < this.list.length - 1) {
        if (subj.id === this.expandedElement.id) {
          subj.orderSubj = index + 1;
          this.expandedElement = subj;
        } else {
          subj.orderSubj = i;
        }
      } else {
        subj.orderSubj = i;
      }
      i++;
    }
    this.list[index + 1].orderSubj = index;

    this.list.forEach(subj => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        this.actionService.launchWaiting(progressId);
        this.dataService.save(subj).subscribe((resp) => {
          this.refresh();
          this.actionService.stopWaiting(progressId);
        });
      });
    });
  }

  moveUp() {
    const index = this.expandedElement.orderSubj;
    console.log("order current: " + this.expandedElement.orderSubj);

    let i = 0;
    for (const subj of this.list) {
      if (index > 0) {
        if (subj.id === this.expandedElement.id) {
          subj.orderSubj = index - 1;
          this.expandedElement = subj;
        } else {
          subj.orderSubj = i;
        }
      } else {
        subj.orderSubj = i;
      }

      i++;
    }

    this.list[index - 1].orderSubj = index;

    this.list.forEach(subj => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        this.actionService.launchWaiting(progressId);
        this.dataService.save(subj).subscribe((resp) => {
          this.refresh();
          this.actionService.stopWaiting(progressId);
        });
      });
    });
  }
}
