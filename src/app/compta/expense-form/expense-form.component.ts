import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Expense } from '../models/expense';
import { ExpenseAmountSetting } from '../models/expense-amount-setting';
import { AcademicStandardService } from '../../establishment/services/academic-standard.service';
import { ConstanceService } from '../../utilities/services/constance.service';
import { Year } from 'src/app/establishment/models/year';
import { AcademicStandardIdentityBean } from 'src/app/establishment/models/academic-standard-identity-bean';
import { ExpenseService } from '../services/expense.service';
import { MessageService } from 'src/app/utilities/services/message.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit, OnDestroy {
  public model = new Expense();
  public event: EventEmitter<any> = new EventEmitter();
  public currentAmount: number;
  public currentStandardId: number;
  public standards: AcademicStandardIdentityBean[] = [];
  public disabled = false;
  isPayableByTranche = true;
  currentYear: Year;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<ExpenseFormComponent>,
    public academicStandardService: AcademicStandardService, public messageService: MessageService,
    public constanceService: ConstanceService, private expenseService: ExpenseService
  ) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;

      this.model = this.data.obj;
      this.disabled = this.data.option === 0 ? false : true;
      this.refresh();
    });
  }

  ngOnDestroy(): void {
    this.event.emit(this.model);
  }

  onNoClick(): void {
    this.form.close();
  }

  refresh() {
    this.academicStandardService.getAll().subscribe({
      next: (value) => {
        this.standards = value;

        if (this.currentStandardId === undefined) {
          this.currentStandardId = this.standards[0].id;
        }

        this.expenseService.getAmountByClass(this.model.id, this.currentStandardId, this.currentYear.id).subscribe((resp) => {
          if (resp !== null && resp !== undefined) {
            this.currentAmount = resp.amount;
            this.isPayableByTranche = resp.isPayableByTranche;
          } else {
            this.currentAmount = undefined;
          }
        });
      },
    });
  }

  onSubmit(): void {
    this.academicStandardService.getOne(this.currentStandardId).subscribe((resp) => {
      let setting = new ExpenseAmountSetting();

      // to avoid double
      const tempSets: ExpenseAmountSetting[] = [];

      if (this.model.amountSettings.length > 0) {
        for (const set of this.model.amountSettings) {
          if (set.standard !== null && set.year !== null) {
            if (set.standard.id === this.currentStandardId && set.year.id === this.currentYear.id) {
              setting = set;
            } else {
              tempSets.push(set);// other settings
            }
          }
        }
      }

      setting.year = this.currentYear;
      setting.standard = resp;
      setting.amount = this.currentAmount;
      setting.isPayableByTranche = this.isPayableByTranche;

      tempSets.push(setting);
      this.model.amountSettings = tempSets;

      console.log(`on expense submit:  ${this.model.amountSettings}`);

      this.expenseService.save(this.model).subscribe(resp => {
        this.refresh();
      });

      this.messageService.showSucces("Succès!", true);
    });
  }

  addTranche() {

  }
}
