import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/utilities/confirm-delete/confirm-delete.component';
import { PaymentReduction } from 'src/app/compta/models/payment-reduction';
import { ReductionMotif } from 'src/app/compta/models/reduction-motif';
import { SchoolClassIdentityBean } from 'src/app/establishment/models/school-class-identity-bean';
import { StudentIdentityBean } from 'src/app/student-mg/models/studentIdentityBean';
import { Year } from 'src/app/establishment/models/year';

import { Expense } from '../models/expense';
import { SchoolClassIdentityService } from '../../establishment/services/school-class-identity.service';
import { ConstanceService } from '../../utilities/services/constance.service';
import { StudentCursusBean } from 'src/app/student-mg/models/studentCursusBean';
import { StudentComptaBean } from '../models/student-compta-Bean';
import { StudentCursusService } from 'src/app/student-mg/services/student-cursus.service';
import { StudentComptaService } from '../services/student-compta.service';
import { StudentIdentityService } from 'src/app/student-mg/services/student-identity.service';
import { ExpenseService } from '../services/expense.service';
import { ReductionMotifService } from '../services/reduction-motif.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { MessageService } from 'src/app/utilities/services/message.service';

@Component({
  selector: 'app-reduction-student-form',
  templateUrl: './reduction-student-form.component.html',
  styleUrls: ['./reduction-student-form.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ReductionStudentFormComponent implements OnInit, OnDestroy {
  expandedElement: StudentIdentityBean | null;
  currentSchoolClassId = 0;
  displayedColumns = [
    'num',
    'nom',
    'prenom',
    'sex',
    'select'
  ];

  selectionDisplayedColumns = [
    'num',
    'nom',
    'prenom', 'sex', 'schoolClass',
  ];

  filterText: string;
  filteredList: StudentIdentityBean[] = [];
  holeList: StudentIdentityBean[] = [];
  listCursusBean: StudentCursusBean[] = [];

  classes: SchoolClassIdentityBean[] = [];
  public expenses: Expense[] = [];

  currentYear: Year;
  isRunning = false;
  public showActions = false;
  public filterControl = new FormControl();
  public event: EventEmitter<any> = new EventEmitter();
  public expenseId: number;
  public reductionMotives: ReductionMotif[] = [];
  public motiveId: number;
  public currentAmount: number;

  // for checkbox in the table
  selection = new SelectionModel<StudentIdentityBean>(true, []);
  numberOfResult = 0;

  constructor(
    public auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog, public form: MatDialogRef<ReductionStudentFormComponent>,
    private messageService: MessageService,
    private dataService: StudentCursusService, public schoolClassService: SchoolClassIdentityService,
    private studentComptaService: StudentComptaService, private studentIdentityService: StudentIdentityService,
    public constanceService: ConstanceService, private expenseService: ExpenseService,
    private reductionMotiveService: ReductionMotifService
  ) { }

  ngOnInit() {
    this.isRunning = true;

    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
    });

    this.selection.changed.subscribe(() => {
      if (this.selection.selected.length > 0) {
        this.showActions = true;
      } else {
        this.showActions = false;
      }
    });

    this.expenseService.getAll().subscribe((resp) => {
      this.expenses = resp;
      this.expenseId = resp[0] !== undefined ? resp[0].id : undefined;

      this.reductionMotiveService.getAll().subscribe((resp) => {
        this.reductionMotives = resp;
        this.motiveId = resp[0] !== undefined ? resp[0].id : undefined;

        this.schoolClassService.getAll().subscribe((resp) => {
          this.classes = resp;

          this.refresh();
        });
      });
    });
  }

  ngOnDestroy(): void { }

  refresh() {
    //for progress
    this.isRunning = true;

    this.dataService.getAllByClass(this.currentSchoolClassId, this.currentYear.id).subscribe(
      (resp) => {
        this.listCursusBean = resp;
        this.studentIdentityService.getStudentIdentities(this.listCursusBean).subscribe((resp) => {
          this.holeList = resp;

          this.numberOfResult = resp.length;
          this.filter();

          this.selection.clear();

          //for progress
          this.isRunning = false;
        });
      },
      () => {
        console.log('finished lodding!!!!!!! filteredList size= ' + this.filteredList.length);
        //for progress
        this.isRunning = false;
      });
  }

  onDeleteReduction(student: StudentComptaBean, red: PaymentReduction) {
    this.studentIdentityService.getOne(student.id).subscribe((resp) => {
      const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        width: '1000px',
        data: {
          titre: 'Voulez- vous vraiment supprimer la réduction de' + red.amount + ' pour:  ' +
            red.motive.designation + ' de l\'élève: ' + resp.identity.lastName
            + ' ' + resp.identity.firstName
        }
      });

      dialogRef.componentInstance.event.subscribe(response => {
        this.studentComptaService.deleteReduction(student.id, red).subscribe((resp) => {
          console.log('done!!');
          this.refresh();
        })
      });
    });
  }

  onModify(currentObj: StudentIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(ReductionStudentFormComponent, {
      width: '1000px',
      data: { titre: 'Modifier', obj: data }
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
      this.filteredList = this.holeList.filter(option =>
        (option.identity.lastName + ' ' + option.identity.firstName).toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredList = this.holeList;
    }
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '1000px',
      data: {
        titre: 'Voulez- vous vraiment appliquer une remise de: '
          + this.currentAmount + ' F CFA aux élèves choisi?'
      }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      for (const studentIdBean of this.selection.selected) {
        this.studentComptaService.addReduction(studentIdBean.id, this.currentYear.id, this.expenseId, this.motiveId, this.currentAmount).subscribe((resp) => {
          console.log("reduction added for: " + resp.id);
        });
      }

      this.messageService.showSucces("Super!", true);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.numberOfResult;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() : this.filteredList.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: StudentIdentityBean, index?: number): string {
    if (!row) {
      const option = this.isAllSelected() ? 'select' : 'deselect';
      return option + ' all';
    } else {
      const option = this.selection.isSelected(row) ? 'deselect' : 'select';
      return option + ' row ' + (index + 1);
    }
  }

}
