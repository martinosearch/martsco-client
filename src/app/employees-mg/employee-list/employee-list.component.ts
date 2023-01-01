import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeIdentityBean } from 'src/app/employees-mg/models/employee-identity-bean';
import { ConfirmDeleteComponent } from 'src/app/utilities/confirm-delete/confirm-delete.component';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeIdentityService } from '../services/employee-identity.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EmployeeListComponent implements OnInit, OnDestroy {
  expandedElement: EmployeeIdentityBean | null;
  displayedColumns = [
    'num',
    'nom',
    'prenom',
    'civility',
    'tel',
    'email',
    'modify',
    'suppr'
  ];

  filterText: string;
  filteredList: EmployeeIdentityBean[] = [];
  holeList: EmployeeIdentityBean[] = [];

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: EmployeeIdentityService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.dataService.getAll().subscribe((resp) => {
      this.holeList = resp;
      this.filteredList = this.holeList;
    })
  }

  onDelete(obj: EmployeeIdentityBean) {

    let designation = "";

    if (obj.identity !== null) {
      obj.identity.lastName + ' ' + obj.identity.firstName;
    }

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + designation }
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
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '1000px',
      data: { titre: 'Ajouter un employee', obj: new EmployeeIdentityBean() }
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

  onModify(currentObj: EmployeeIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '1000px',
      data: { titre: 'Modifier', obj: data }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.dataService.save(response).subscribe(response2 => {
          this.refresh();
          validationSub.unsubscribe();
        });
      }
    );
  }

  // filter for test autocomplete
  filter() {
    if (typeof this.filterText !== undefined) {
      const filterValue = this.filterText.toLowerCase();
      this.filteredList = this.holeList.filter(option =>
        (option.identity.lastName + ' ' + option.identity.firstName).toLowerCase().includes(filterValue)
      );
    }
  }
}
