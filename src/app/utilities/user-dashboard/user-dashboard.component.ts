import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/compta/models/payment';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeIdentityService } from 'src/app/employees-mg/services/employee-identity.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { Year } from 'src/app/establishment/models/year';
import { ComptaReportingService } from 'src/app/compta/services/compta-reporting.service';
import { ActionService } from 'src/app/utilities/services/action.service';
import { ProgressService } from '../services/progress.service';
import { StudentComptaService } from 'src/app/compta/services/student-compta.service';
import { StudentCursusService } from 'src/app/student-mg/services/student-cursus.service';
import { StudentComptaBean } from 'src/app/compta/models/student-compta-Bean';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-user-dashbord',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  public invoiceDisplayedColumns = [
    'num',
    'date_emis',
    'num_fact',
    'amount',
    'detail'
  ];

  public invoicesDisplayType = 0;
  public cushDisplayType = 0;

  public startDate = new FormControl(new Date());
  public endDate = new FormControl(new Date());

  public filteredPayments: Payment[] = [];
  public currentUserId: number;
  public paymentsAmount = 0;
  public numOfCash = 0;
  public cashsAmount = 0;
  currentYear: Year;

  constructor(
    public authService: AuthService, public actionService: ActionService,
    public studentComptaService: StudentComptaService,
    public dialog: MatDialog, public comptaReportingService: ComptaReportingService,
    public employeeService: EmployeeIdentityService, public constanceService: ConstanceService,
    public studentService: StudentCursusService, public progressService: ProgressService
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

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // filter invoice by date
  public filterPaymentsByDate() {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);

      this.studentComptaService.getFilteredPaymentsPerDay(this.currentYear.id, new Date(this.startDate.value),
        this.currentUserId).subscribe((resp) => {
          this.filteredPayments = resp;
          this.updateAmounts(this.filteredPayments);

          this.actionService.stopWaiting(progressId);
        });
    });
  }

  // filter invoice by period
  public filterPaymentsByPeriod() {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);

      this.studentComptaService.getFilteredPaymentsPerPeriod(this.currentYear.id, new Date(this.startDate.value),
        new Date(this.endDate.value), this.currentUserId).subscribe((resp) => {
          this.filteredPayments = resp;
          this.updateAmounts(this.filteredPayments);

          this.actionService.stopWaiting(progressId);
        });
    });
  }

  updateAmounts(list: Payment[]) {
    //update amount
    this.paymentsAmount = list
      .map(t => t.currentAmount)
      .reduce((acc, value) => acc + value, 0);
  }

  generatePdfAndShow(student: StudentComptaBean, serial: number) {
    //we call pdf
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);

      this.comptaReportingService.generateReceiptOf(student, serial, 0).subscribe(() => {
        this.sleep(5000).then(() => {
          this.actionService.stopWaiting(progressId);
        });
      });
    });
  }
}
