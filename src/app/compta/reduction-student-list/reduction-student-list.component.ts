import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/utilities/confirm-delete/confirm-delete.component';
import { Year } from '../../establishment/models/year';
import { SchoolClassIdentityService } from '../../establishment/services/school-class-identity.service';
import { ConstanceService } from '../../utilities/services/constance.service';
import { ReductionStudentFormComponent } from '../reduction-student-form/reduction-student-form.component';
import { StudentIdentityBean } from 'src/app/student-mg/models/studentIdentityBean';
import { SchoolClassIdentityBean } from 'src/app/establishment/models/school-class-identity-bean';
import { PaymentReduction } from 'src/app/compta/models/payment-reduction';
import { ReductionMotif } from 'src/app/compta/models/reduction-motif';
import { Expense } from 'src/app/compta/models/expense';
import { ActionService } from 'src/app/utilities/services/action.service';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { StudentComptaService } from '../services/student-compta.service';
import { StudentCursusBean } from 'src/app/student-mg/models/studentCursusBean';
import { StudentComptaBean } from '../models/student-compta-Bean';
import { StudentCursusService } from 'src/app/student-mg/services/student-cursus.service';
import { ExpenseService } from '../services/expense.service';
import { ReductionMotifService } from '../services/reduction-motif.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { StudentIdentityService } from 'src/app/student-mg/services/student-identity.service';

@Component({
  selector: 'app-reduction-student-list',
  templateUrl: './reduction-student-list.component.html',
  styleUrls: ['./reduction-student-list.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReductionStudentListComponent implements OnInit, OnDestroy {
  expandedElement: StudentIdentityBean | null;
  currentSchoolClassId = 0;
  displayedColumns = [
    'num',
    'nom',
    'prenom', 'sex',
    'modify',
    'suppr'
  ];

  filterText: string;
  filteredList: StudentIdentityBean[] = [];
  holeList: StudentIdentityBean[] = [];
  listCursusBean: StudentCursusBean[] = [];

  classes: SchoolClassIdentityBean[] = [];
  currentYear: Year;


  public showActions = false;
  public filterControl = new FormControl();

  // for checkbox in the table
  selection = new SelectionModel<StudentIdentityBean>(true, []);
  numberOfResult = 0;
  currentReductionMotiveId: number;
  currentExpenseId: number;
  reductionMotives: ReductionMotif[] = [];
  expenses: Expense[] = [];

  constructor(
    public auth: AuthService, public progressService: ProgressService,
    public dialog: MatDialog, public actionService: ActionService, public expenseService: ExpenseService,
    public studentComptaService: StudentComptaService, private studentIdentityService: StudentIdentityService,
    public schoolClassService: SchoolClassIdentityService,
    public constanceService: ConstanceService, public expenseReductionService: ReductionMotifService
  ) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
      this.expenseService.getAll().subscribe((resp) => {
        this.expenses = resp;
        this.currentExpenseId = resp[0].id;

        this.expenseReductionService.getAll().subscribe((resp) => {
          this.reductionMotives = resp;
          this.currentReductionMotiveId = resp[0].id;

          this.schoolClassService.getAll().subscribe((resp) => {
            this.classes = resp;

            this.refresh();
          });
        })
      });
    });

    this.selection.changed.subscribe(() => {
      if (this.selection.selected.length > 1) {
        this.showActions = true;
      } else {
        this.showActions = false;
      }
    });
  }

  ngOnDestroy(): void { }

  refresh() {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);

      this.studentComptaService.getStudentThatHasReduction(this.currentExpenseId, this.currentReductionMotiveId,
        this.currentSchoolClassId, this.currentYear.id).subscribe((resp) => {
          this.listCursusBean = resp;
          this.studentIdentityService.getStudentIdentities(this.listCursusBean).subscribe((respId) => {
            this.holeList = respId;
            this.filter();
            // console.log("number of result: >>>>> " + this.listCursusBean.length);

            this.actionService.stopWaiting(progressId);
          });
        });
    });
  }

  onDeleteReduction(student: StudentIdentityBean, red: PaymentReduction) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '1000px',
      data: {
        titre: 'Voulez- vous vraiment supprimer la réduction de ' + red.amount + ' pour ' +
          red.motive.designation + ' de l\'élève ' + student.identity.lastName + ' ' +
          student.identity.firstName
      }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.studentComptaService.deleteReduction(student.id, red).subscribe((resp) => {
        console.log('done!!');
        this.refresh();
      })
    });
  }

  getParsedList(list: PaymentReduction[]): PaymentReduction[] {
    let temp = [];
    for (const curs of list) {
      let exist = false;
      for (const old of temp) {
        if (curs.year.id === old.year.id) {
          exist = true;
        }
      }

      if (exist === false) {
        temp.push(curs);
      }
    }

    return temp;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(ReductionStudentFormComponent, {
      width: '1800px',
      data: { titre: 'Définir une réduction', obj: new StudentIdentityBean(), currentSchoolClassId: this.currentSchoolClassId }
    });

    let time = 0;
    const validationSub = dialogRef.componentInstance.event.subscribe(
      (response: StudentComptaBean) => {
        time++;
        console.log("nombre de fois: " + time);
        validationSub.unsubscribe();
        this.studentComptaService.save(response).subscribe(response2 => {
          this.refresh();
        });
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
}
