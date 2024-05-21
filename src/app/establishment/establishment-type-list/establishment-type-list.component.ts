import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { EstablishmentType } from '../models/establishment-type';
import { EstablishmentTypeService } from '../services/establishment-type.service';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { EstablishmentTypeFormComponent } from '../establishment-type-form/establishment-type-form.component';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-establishment-type-list',
  templateUrl: './establishment-type-list.component.html',
  styleUrls: ['./establishment-type-list.component.scss']
})
export class EstablishmentTypeListComponent implements OnInit {
  displayedColumns = ['num', 'designation', 'dim', 'detail', 'suppr'];

  filteredList = new Observable<EstablishmentType[]>();
  list: EstablishmentType[] = [];
  public filterControl = new FormControl();

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: EstablishmentTypeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refresh(); // for autocomplete
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

  onDelete(obj: EstablishmentType) {
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

  onModify(obj: EstablishmentType) {
    const data = Object.assign({}, obj);
    const dialogRef = this.dialog.open(EstablishmentTypeFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.dataService.save(response).subscribe(response2 => {
        console.log('saved: ' + response2.designation);
        this.refresh();
      });
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(EstablishmentTypeFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un type d\' école', obj: new EstablishmentType() }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.dataService.save(response).subscribe(response2 => {
          console.log('saved: ' + response2.designation);
          this.refresh();
        });
      }
    );
  }

  // filter for test autocomplete
  private filter(value: string): EstablishmentType[] {
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
