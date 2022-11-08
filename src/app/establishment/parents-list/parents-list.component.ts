import { Component, OnInit } from '@angular/core';
import { EmployeeIdentityBean } from 'src/app/employees-mg/models/employee-identity-bean';
import { MatDialog } from '@angular/material';
import { EmployeeIdentityService } from 'src/app/employees-mg/services/employee-identity.service';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { EmployeeFormComponent } from '../../employees-mg/employee-form/employee-form.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { StudentParentIdentityBean } from '../models/student-parent-identity-bean';
import { StudentParentIdentityService } from '../services/student-parent-identity.service';

@Component({
  selector: 'app-parents-list',
  templateUrl: './parents-list.component.html',
  styleUrls: ['./parents-list.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ParentsListComponent implements OnInit {
  expandedElement: StudentParentIdentityBean | null;
  displayedColumns = [
    'num',
    'nom',
    'prenom',
    'civility',
    'modify',
    'suppr'
  ];

  filterText: string;
  filteredList: StudentParentIdentityBean[] = [];
  holeList: StudentParentIdentityBean[] = [];

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: StudentParentIdentityService
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
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.identity.lastName + ' ' + obj.identity.firstName }
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
      data: { titre: 'Ajouter un parent', obj: new StudentParentIdentityBean() }
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

  onModify(currentObj: StudentParentIdentityBean): void {
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
