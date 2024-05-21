import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SubjectType } from 'src/app/subject-mg/models/subject-type';

import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { SubjectTypeFormComponent } from '../subject-type-form/subject-type-form.component';
import { SubjectTypeService } from '../subject-type.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/utilities/services/message.service';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-subject-type-list',
  templateUrl: './subject-type-list.component.html',
  styleUrls: ['./subject-type-list.component.scss']
})
export class SubjectTypeListComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'num',
    'designation',
    'modify',
    'suppr'
  ];
  filteredList = new Observable<SubjectType[]>();
  list: SubjectType[] = [];
  public filterControl = new FormControl();

  constructor(
    public auth: AuthService, private messageService: MessageService,
    public dialog: MatDialog,
    private dataService: SubjectTypeService
  ) { }

  ngOnInit() {
    this.refresh();

    // for autocomplete
    this.filterControl.valueChanges.pipe(
      startWith(''), map(value => this.filter(value))
    ).subscribe((resp) => {
      this.filteredList = of(resp);
    });
  }

  ngOnDestroy(): void { }

  refresh() {
    this.dataService.getAll().subscribe((resp) => {
      this.list = resp;
      this.filteredList = of(resp);
    })
  }

  onModify(currentObj: SubjectType): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(SubjectTypeFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.dataService.save(response).subscribe(response2 => {
          console.log('saved: ' + response2.designation);
          this.dataService.setCurrentObject(response2);
          this.refresh();
          validationSub.unsubscribe();
        });
      }
    );
  }

  onDelete(obj: SubjectType) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.dataService.delete(obj.id).subscribe(resp => {
        console.log('deleted: ' + obj);
        this.refresh();
      },
        (error: HttpErrorResponse) => {
          this.messageService.showErrorMessage(error.error.message);
        });
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(SubjectTypeFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un type de matière', obj: new SubjectType() }
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

  // filter for test autocomplete
  private filter(value: string): SubjectType[] {
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
}
