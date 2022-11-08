import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EstablishmentIdentityBean } from '../models/establishment-identity-bean';
import { EstablishmentService } from '../services/establishment.service';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { EstablishmentFormComponent } from '../establishment-form/establishment-form.component';
import { MessageService } from 'src/app/utilities/services/message.service';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EstablishmentListComponent implements OnInit, OnDestroy {
  expandedElement: EstablishmentIdentityBean | null;
  displayedColumns = [
    'num',
    'name',
    'modify',
    'suppr', 'setting'
  ];

  filterText: string;
  filteredList: EstablishmentIdentityBean[] = [];
  holeList: EstablishmentIdentityBean[] = [];

  constructor(
    public auth: AuthService, private messageService: MessageService,
    public dialog: MatDialog,
    private dataService: EstablishmentService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.dataService.getAll().subscribe((resp) => {
      this.holeList = resp;
      this.filteredList = resp;
    })
  }

  onDelete(obj: EstablishmentIdentityBean) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.identity.name }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.dataService.delete(obj.id).subscribe(
        resp => {
          console.log('deleted: ' + obj);
          this.refresh();
        },
        error => {
          this.messageService.showErrorMessage(error.error.message);
        }
      );
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(EstablishmentFormComponent, {
      width: '1000px',
      data: { titre: 'Ajouter un établissement', obj: new EstablishmentIdentityBean() }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onModify(currentObj: EstablishmentIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(EstablishmentFormComponent, {
      width: '1000px',
      data: { titre: 'Modifier', obj: data }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onSetting(currentObj: EstablishmentIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(EstablishmentFormComponent, {
      width: '1000px',
      data: { titre: 'Configuration', obj: data, isSetting: true }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  // filter for test autocomplete
  filter() {
    if (typeof this.filterText !== undefined) {
      const filterValue = this.filterText.toLowerCase();
      this.filteredList = this.holeList.filter(option =>
        (option.type.dim + ' ' + option.identity.name).toLowerCase().includes(filterValue)
      );
    }
  }
}
