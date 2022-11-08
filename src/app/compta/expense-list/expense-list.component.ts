import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Expense } from 'src/app/compta/models/expense';
import { ExpenseAmountSetting } from 'src/app/compta/models/expense-amount-setting';
import { Year } from 'src/app/establishment/models/year';
import { ConstanceService } from 'src/app/utilities/services/constance.service';

import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseService } from '../services/expense.service';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpenseListComponent implements OnInit, OnDestroy {
  expandedElement: Expense | null;
  currentYear: Year;
  displayedColumns = [
    'num',
    'designation',
    'code',
    'modify',
    'suppr',
    'setting'
  ];

  filteredList = new Observable<Expense[]>();
  list: Expense[] = [];
  public filterControl = new FormControl();

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: ExpenseService,
    private constanceService: ConstanceService,
  ) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
      this.refresh();
    });

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
    });
  }

  onDelete(obj: Expense) {
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
    const dialogRef = this.dialog.open(ExpenseFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un Frais', obj: new Expense(), option: 0 }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onModify(currentObj: Expense): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(ExpenseFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data, option: 0 }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onSetting(currentObj: Expense): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(ExpenseFormComponent, {
      width: '1000px',
      data: { titre: 'Configurations', obj: data, option: 1 }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  // filter for test autocomplete
  private filter(value: string): Expense[] {
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

  // to avoid double
  getParsedListAmount(element: Expense) {
    const temp = [];
    return element.amountSettings.filter(elmt => (elmt.year.id === this.currentYear.id));
  }
}
