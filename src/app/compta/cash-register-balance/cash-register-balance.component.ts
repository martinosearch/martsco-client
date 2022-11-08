import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeIdentityService } from 'src/app/employees-mg/services/employee-identity.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { Year } from 'src/app/establishment/models/year';
import { ComptaReportingService } from 'src/app/compta/services/compta-reporting.service';
import { ActionService } from 'src/app/utilities/services/action.service';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { StudentCursusService } from 'src/app/student-mg/services/student-cursus.service';
import { StudentComptaService } from '../services/student-compta.service';
import { CashFlow } from '../models/cash-flow';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-cash-register-balance',
  templateUrl: './cash-register-balance.component.html',
  styleUrls: ['./cash-register-balance.component.scss']
})
export class CashRegisterBalanceComponent implements OnInit {
  public invoiceDisplayedColumns = [
    'num',
    'num_fact'
  ];

  public invoicesDisplayType = 0;
  public cushDisplayType = 0;

  public startDate = new FormControl(new Date());
  public endDate = new FormControl(new Date());

  public cashFlows: CashFlow[] = [];
  public currentUserId: number;
  public numOfCash = 0;
  public cashsAmount = 0;
  currentYear: Year;

  constructor(
    public authService: AuthService, public actionService: ActionService,
    public dialog: MatDialog, public comptaReportingService: ComptaReportingService,
    public employeeService: EmployeeIdentityService, public constanceService: ConstanceService,
    public studentService: StudentCursusService, public studentComptaService: StudentComptaService,
    public progressService: ProgressService
  ) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;

      this.authService.currentUserSubj.subscribe(resp => {
        this.currentUserId = resp;

        // for autocomplete search patitent
        this.startDate.valueChanges.subscribe(
          (resp) => {
            if (this.invoicesDisplayType === 0) {
              this.filterPaymentsByDate();
            } else {
              this.filterPaymentsByPeriod();
            }
          }
        );

        // for autocomplete search patitent
        this.endDate.valueChanges.subscribe(
          (resp) => {
            if (this.invoicesDisplayType === 0) {
              this.filterPaymentsByDate();
            } else {
              this.filterPaymentsByPeriod();
            }
          }
        );

        this.filterPaymentsByDate();
      });
    });
  }

  refreshOption(option: number) {
    console.log("option clicked: " + option);

    this.invoicesDisplayType = option;
    if (this.invoicesDisplayType === 0) {
      this.filterPaymentsByDate();
    } else {
      this.filterPaymentsByPeriod();
    }
  }

  // filter invoice by date
  public filterPaymentsByDate() {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);

      this.studentComptaService.getCashFlowPerDayAllUsers(this.currentYear.id, new Date(this.startDate.value),
        this.currentUserId).subscribe((resp) => {
          this.cashFlows = resp;

          this.studentComptaService.updateAmount(this.cashFlows).subscribe((amount) => {
            this.cashsAmount = amount;
            this.actionService.stopWaiting(progressId);
          });

        });
    });
  }

  // filter invoice by period
  public filterPaymentsByPeriod() {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);

      this.studentComptaService.getCashFlowPerPeriodAllUsers(this.currentYear.id, new Date(this.startDate.value),
        new Date(this.endDate.value), this.currentUserId).subscribe((resp) => {
          this.cashFlows = resp;

          this.studentComptaService.updateAmount(this.cashFlows).subscribe((amount) => {
            this.cashsAmount = amount;
            this.actionService.stopWaiting(progressId);
          });
        });
    });
  }
}
