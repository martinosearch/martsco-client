import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SchoolClassIdentityBean } from 'src/app/establishment/models/school-class-identity-bean';
import { SchoolClassIdentityService } from '../services/school-class-identity.service';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { SchoolClassFormComponent } from '../school-class-form/school-class-form.component';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-school-class-list',
  templateUrl: './school-class-list.component.html',
  styleUrls: ['./school-class-list.component.scss']
})

export class SchoolClassListComponent implements OnInit, OnDestroy {
  displayedColumns = ['num', 'designation', 'niveau', 'modify', 'suppr', 'setting'];
  filteredList: SchoolClassIdentityBean[] = [];
  list: SchoolClassIdentityBean[] = [];
  public filterControl = new FormControl();
  filterText: string;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private schoolClassIdentityService: SchoolClassIdentityService,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.schoolClassIdentityService.getAll().subscribe((resp) => {
      this.list = resp;
      this.filteredList = this.list;
      this.filter();
    })
  }

  onDelete(obj: SchoolClassIdentityBean) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.schoolClassIdentityService.delete(obj.id).subscribe(resp => {
        console.log('deleted: ' + obj);
        this.refresh();
      });
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(SchoolClassFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter une classe', obj: new SchoolClassIdentityBean() }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onModify(currentObj: SchoolClassIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(SchoolClassFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onSetting(currentObj: SchoolClassIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(SchoolClassFormComponent, {
      width: '600px',
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
    if (this.filterText !== undefined) {
      const filterValue = this.filterText.toLowerCase();
      this.filteredList = this.list.filter(option =>
        (option.designation).toLowerCase().includes(filterValue)
      );
    }
  }
}
