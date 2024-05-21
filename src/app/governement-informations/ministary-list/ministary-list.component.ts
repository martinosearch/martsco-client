import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ministary } from 'src/app/governement-informations/models/ministary';
import { MinistaryService } from 'src/app/governement-informations/services/ministary.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { MinistaryFormComponent } from '../ministary-form/ministary-form.component';

@Component({
  selector: 'app-ministary-list',
  templateUrl: './ministary-list.component.html',
  styleUrls: ['./ministary-list.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MinistaryListComponent implements OnInit {
  expandedElement: Ministary | null;
  displayedColumns = [
    'num',
    'designation',
    'dim', 'modify',
    'suppr'
  ];

  filterText: string;
  filteredList: Ministary[] = [];
  holeList: Ministary[] = [];

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: MinistaryService
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

  onDelete(obj: Ministary) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.dataService.delete(obj.id).subscribe(resp => {
        console.log('deleted: ' + obj);
        this.refresh();
      });
      this.refresh();
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(MinistaryFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un minitère', obj: new Ministary() }
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

  onModify(currentObj: Ministary): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(MinistaryFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data }
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

  onSetting(currentObj: Ministary): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(MinistaryFormComponent, {
      width: '600px',
      data: { titre: 'Configuration', obj: data, isSetting: true }
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
  filter() {
    if (typeof this.filterText !== undefined) {
      const filterValue = this.filterText.toLowerCase();
      this.filteredList = this.holeList.filter(option =>
        (option.designation).toLowerCase().includes(filterValue)
      );
    }
  }
}
