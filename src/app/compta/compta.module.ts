import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashRegisterFormComponent } from 'src/app/compta/cash-register-form/cash-register-form.component';
import { ComptaMenuComponent } from 'src/app/compta/compta-menu/compta-menu.component';
import { ExpenseFormComponent } from 'src/app/compta/expense-form/expense-form.component';
import { ExpenseListComponent } from 'src/app/compta/expense-list/expense-list.component';
import { PaymentFormComponent } from 'src/app/compta/payment-form/payment-form.component';
import { ReductionMotifFormComponent } from 'src/app/compta/reduction-motif-form/reduction-motif-form.component';
import { ReductionMotifListComponent } from 'src/app/compta/reduction-motif-list/reduction-motif-list.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComptaDashboardComponent } from './compta-dashboard/compta-dashboard.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { ReductionStudentFormComponent } from './reduction-student-form/reduction-student-form.component';
import { ReductionStudentListComponent } from './reduction-student-list/reduction-student-list.component';
import { MaterialModule } from '../utilities/material.module';
import { CashRegisterBalanceComponent } from './cash-register-balance/cash-register-balance.component';

@NgModule({
  declarations: [
    CashRegisterFormComponent,
    CashRegisterBalanceComponent,
    ComptaMenuComponent,
    ReductionMotifListComponent,
    ReductionMotifFormComponent,
    ReductionStudentListComponent,
    ReductionStudentFormComponent,
    ExpenseListComponent,
    ExpenseFormComponent,
    PaymentFormComponent,
    ComptaDashboardComponent
  ],

  imports: [
    CommonModule, UtilitiesModule, NoopAnimationsModule, BrowserAnimationsModule,
    FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule
  ],

  exports: [
    ComptaMenuComponent, ComptaDashboardComponent
  ],

  entryComponents: [PaymentFormComponent, ExpenseFormComponent,
    ReductionStudentFormComponent]
})
export class ComptaModule { }
