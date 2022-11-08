import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EvaluationTypeService } from '../services/evaluation-type.service';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { EvaluationTypeFormComponent } from '../evaluation-type-form/evaluation-type-form.component';
import { EvaluationType } from '../models/evaluation-type';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-evaluation-type-list',
  templateUrl: './evaluation-type-list.component.html',
  styleUrls: ['./evaluation-type-list.component.scss']
})

export class EvaluationTypeListComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'num',
    'designation',
    'modify',
    'suppr'
  ];

  filteredList = new Observable<EvaluationType[]>();
  list: EvaluationType[] = [];
  public filterControl = new FormControl();

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: EvaluationTypeService
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

  onModify(currentObj: EvaluationType): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(EvaluationTypeFormComponent, {
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

  onDelete(obj: EvaluationType) {
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
    const dialogRef = this.dialog.open(EvaluationTypeFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un type d\'évaluation', obj: new EvaluationType() }
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
  private filter(value: string): EvaluationType[] {
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
