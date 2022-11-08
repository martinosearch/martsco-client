import { ProgressService } from './../../utilities/services/progress.service';
import { ActionService } from './../../utilities/services/action.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Year } from 'src/app/establishment/models/year';
import { YearService } from 'src/app/establishment/services/year.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { RouteService } from 'src/app/utilities/services/route.service';

import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { YearFormComponent } from '../year-form/year-form.component';
@Component({
  selector: 'app-year-list',
  templateUrl: './year-list.component.html',
  styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'num',
    'designation',
    'modify',
    'suppr'
  ];

  holeList: Year[] = [];
  filteredList: Year[] = [];
  filterText: String;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: YearService,
    private router: Router, private actionService: ActionService, private progressService: ProgressService,
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.dataService.getAll().subscribe((resp) => {
      this.holeList = resp;
      this.filter();
    });
  }

  onDelete(obj: Year) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        this.actionService.launchWaiting(progressId);
        this.dataService.delete(obj.id).subscribe(resp => {
          this.actionService.stopWaiting(progressId);
          console.log('deleted: ' + obj);
          this.refresh();
        });
        this.refresh();
      });
    });
  }

  onModify(currentObj: Year): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(YearFormComponent, {
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

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(YearFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter une année', obj: new Year() }
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

  filter() {
    if (this.filterText !== undefined) {
      const filterValue = this.filterText.toLowerCase();

      this.filteredList = this.holeList.filter(value =>
        (value.designation).toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredList = this.holeList;
    }
  }
}
