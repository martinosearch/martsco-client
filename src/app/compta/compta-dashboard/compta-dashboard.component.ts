import { Component, OnInit } from '@angular/core';
import { EmployeeIdentityBean } from 'src/app/employees-mg/models/employee-identity-bean';
import { SchoolClassIdentityBean } from 'src/app/establishment/models/school-class-identity-bean';
import { SchoolClassIdentityService } from 'src/app/establishment/services/school-class-identity.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { PaymentStatementAllSchoolClassBean } from '../models/payment-statement-all-bean';
import { SchoolClassPayementStatement } from '../models/school-class-payement-statement';
import { ExpenseService } from '../services/expense.service';
import { StudentComptaService } from '../services/student-compta.service';
import { Payment } from '../models/payment';
import { CashFlow } from '../models/cash-flow';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { Year } from 'src/app/establishment/models/year';

@Component({
  selector: 'app-compta-dashboard',
  templateUrl: './compta-dashboard.component.html',
  styleUrls: ['./compta-dashboard.component.scss']
})
export class ComptaDashboardComponent implements OnInit {
  displayedColumns = ['class', 'male', 'female', 'sum', 'per'];
  studentsDisplayedColumns = ['num', 'designation', 'amount'];

  twentythStudents: Payment[] = [];
  classes: SchoolClassIdentityBean[] = [];
  employees: EmployeeIdentityBean[] = [];
  effectifBeans: SchoolClassPayementStatement[] = [];
  totalEffectifBean = new PaymentStatementAllSchoolClassBean();
  numberOfClasses = 0;
  numberOfExpense: number = 0;
  numberOfRegister: number = 0;
  public allCashFlows: CashFlow[] = [];
  public myCashFlow = new CashFlow();
  currentUserId: number;
  currentYear: Year;


  constructor(private constanceService: ConstanceService, private authService: AuthService,
    private schoolClassIdentityService: SchoolClassIdentityService, private expenseService: ExpenseService,
    private studentComptaService: StudentComptaService) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
      this.expenseService.getAll().subscribe((exp) => {
        const currentExpense = exp[0]; //Todo
        this.studentComptaService.getpaymentStatementAllSchoolClass(currentExpense.id, this.currentYear.id)
          .subscribe((respEff) => {
            //   console.log("payment statements size: " + respEff.statements.length);
            this.effectifBeans = respEff.statements;
            this.totalEffectifBean = respEff;
          });
      });

      this.schoolClassIdentityService.getAll().subscribe((resp) => {
        this.numberOfClasses = resp.length;
      });

      this.studentComptaService.getCashFlowPerDayAllUsers(this.currentYear.id, new Date(),
        this.currentUserId).subscribe((resp) => {
          this.allCashFlows = resp;
          this.numberOfRegister = this.allCashFlows.length;

          this.myCashFlow = this.allCashFlows.filter((item) =>
            item.employeeIdentityBean.id === this.currentUserId)[0];

          this.myCashFlow = this.myCashFlow !== undefined ? this.myCashFlow : new CashFlow();
        });

      this.expenseService.getAll().subscribe((resp) => {
        this.numberOfExpense = resp.length;
      });

      this.authService.currentUserSubj.subscribe((resp) => {
        this.currentUserId = resp;
        this.studentComptaService.getNthPaymentsPerDay(this.currentYear.id, new Date(), this.currentUserId, 20).subscribe((resp) => {
          this.twentythStudents = resp;
          console.log("nth payments size: " + resp.length);
        });
      });

    });
  }
}
