import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AcademicStandardService } from '../services/academic-standard.service';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { AcademicStandartFormComponent } from '../academic-standart-form/academic-standart-form.component';
import { AcademicStandardIdentityBean } from '../models/academic-standard-identity-bean';
import { MessageService } from 'src/app/utilities/services/message.service';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-academic-standart-list',
  templateUrl: './academic-standart-list.component.html',
  styleUrls: ['./academic-standart-list.component.scss']
})
export class AcademicStandartListComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'num',
    'designation',
    'modify',
    'suppr', 'setting'
  ];

  filteredList = new Observable<AcademicStandardIdentityBean[]>();
  list: AcademicStandardIdentityBean[] = [];
  public filterControl = new FormControl();

  constructor(
    public auth: AuthService,
    public dialog: MatDialog, private messageService: MessageService,
    private dataService: AcademicStandardService
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

  onModify(currentObj: AcademicStandardIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(AcademicStandartFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.dataService.saveIdentity(response).subscribe(response2 => {
          console.log('saved: ' + response2.designation);
          this.refresh();
          validationSub.unsubscribe();
        });
      }
    );
  }

  onSetting(currentObj: AcademicStandardIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(AcademicStandartFormComponent, {
      width: '800px',
      data: { titre: 'Configuration (' + data.designation + ')', obj: data, isSetting: true }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onDelete(obj: AcademicStandardIdentityBean) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
    });

    dialogRef.componentInstance.event.subscribe(
      (response) => {
        this.dataService.delete(obj.id).subscribe(
          resp => {
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
    const dialogRef = this.dialog.open(AcademicStandartFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un niveau' }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  // filter for test autocomplete
  private filter(value: string): AcademicStandardIdentityBean[] {
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
