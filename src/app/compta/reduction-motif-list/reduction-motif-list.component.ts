import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConfirmDeleteComponent } from 'src/app/utilities/confirm-delete/confirm-delete.component';
import { ReductionMotif } from 'src/app/compta/models/reduction-motif';
import { ReductionMotifFormComponent } from '../reduction-motif-form/reduction-motif-form.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ReductionMotifService } from '../services/reduction-motif.service';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-reduction-motif-list',
  templateUrl: './reduction-motif-list.component.html',
  styleUrls: ['./reduction-motif-list.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReductionMotifListComponent implements OnInit, OnDestroy {
  expandedElement: ReductionMotif | null;
  displayedColumns = [
    'num',
    'designation',
    'modify',
    'suppr',
  ];

  filteredList = new Observable<ReductionMotif[]>();
  list: ReductionMotif[] = [];
  public filterControl = new FormControl();

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: ReductionMotifService
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

  onDelete(obj: ReductionMotif) {
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
    const dialogRef = this.dialog.open(ReductionMotifFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un motif de réduction', obj: new ReductionMotif() }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        console.log('to be save: ' + response.designation);
        this.dataService.save(response).subscribe(response2 => {
          console.log('saved: ' + response2.designation);
          this.refresh();
        });
      }
    );
  }

  onModify(currentObj: ReductionMotif): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(ReductionMotifFormComponent, {
      width: '600px',
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
  private filter(value: string): ReductionMotif[] {
    if (typeof value === 'string') {
      if (value === '') {
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
