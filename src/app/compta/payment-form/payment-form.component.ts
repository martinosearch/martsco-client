import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/compta/models/payment';

import { Expense } from '../models/expense';
import { ExpenseAmountSetting } from '../models/expense-amount-setting';
import { SchoolClassIdentityBean } from '../../establishment/models/school-class-identity-bean';
import { ConstanceService } from '../../utilities/services/constance.service';
import { Year } from 'src/app/establishment/models/year';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  public model: Payment;
  public event: EventEmitter<any> = new EventEmitter();
  public disabled = false;
  public expenseId: number;
  public expenses = new Observable<Expense[]>();
  public currentSchoolClass: SchoolClassIdentityBean;
  public currentYear: Year;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<PaymentFormComponent>,
    private expenseService: ExpenseService, private constanceService: ConstanceService
  ) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
    });

    this.model = this.data.obj;
    this.currentSchoolClass = this.data.schoolClass;
    this.expenses = this.expenseService.getAll();
    this.expenses.subscribe((resp) => {
      this.expenseId = resp[0] !== undefined ? resp[0].id : undefined;
      this.refreshAmountSettings();
    });
  }

  ngOnDestroy(): void {
  }

  refreshAmountSettings() {
    this.expenseService.getAmountByClass(this.expenseId, this.currentSchoolClass.standard.id,
      this.currentYear.id).subscribe((setting: ExpenseAmountSetting) => {

        console.log("Current setting: " + JSON.stringify(setting))
        if (setting !== null) {
          if (setting.isPayableByTranche) {
            this.disabled = false;
          } else {
            this.disabled = true;
            this.model.currentAmount = setting.amount;
          }
        } else {
          this.disabled = false;
        }
      });
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.expenseService.getOne(this.expenseId).subscribe((resp) => {
      this.model.expense = resp;
    });
    this.event.emit(this.model);
    this.form.close();
  }
}
