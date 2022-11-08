import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentComptaBean } from '../models/student-compta-Bean';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { StudentCursusBean } from '../../student-mg/models/studentCursusBean';
import { PaymentReduction } from '../models/payment-reduction';
import { StudentPayementStatement } from '../models/student-payement-statement';
import { CashFlow } from '../models/cash-flow';
import { PaymentStatementAllSchoolClassBean } from '../models/payment-statement-all-bean';

@Injectable({
  providedIn: 'root'
})
export class StudentComptaService {


  private API_MARTSCO = this.appConfigsService.apiUrl;
  constructor(public appConfigsService: AppConfigsService, public httpClient: HttpClient) { }

  getAll(): Observable<StudentComptaBean[]> {
    return this.httpClient.get<StudentComptaBean[]>(`${this.API_MARTSCO}/student-compta/list`);
  }

  getOne(studentId: number): Observable<StudentComptaBean> {
    return this.httpClient.get<StudentComptaBean>(`${this.API_MARTSCO}/student-compta/info/${studentId}`);
  }

  delete(id: any): Observable<StudentComptaBean> {
    return this.httpClient.delete<StudentComptaBean>(`${this.API_MARTSCO}/student-compta/delete/${id}`);
  }

  save(data: StudentComptaBean): Observable<StudentComptaBean> {
    return this.httpClient.post<StudentComptaBean>(`${this.API_MARTSCO}/student-compta/save`, data);
  }

  getStudentThatHasReduction(expenseId: number, expenseMotiveId: number, classId: number, yearId: number)
    : Observable<StudentCursusBean[]> {
    return this.httpClient.get<StudentCursusBean[]>(`${this.API_MARTSCO}/student-compta/list/students-that-have-reduction/${expenseId}/${expenseMotiveId}/${classId}/${yearId}`);
  }

  addReduction(studentId: number, yearId: number, expenseId: number, reductionMotiveId: number, amount: number): Observable<StudentComptaBean> {
    return this.httpClient.get<StudentComptaBean>(this.API_MARTSCO + "/student-compta/reduction-add/"
      + studentId + "/" + yearId + "/" + expenseId + "/" + reductionMotiveId + "/" + amount);
  }

  deleteReduction(studentId: number, red: PaymentReduction): Observable<any> {
    return this.httpClient.delete<any[]>(this.API_MARTSCO + "/student-compta/reduction-delete/"
      + studentId + "/" + red.year.id + "/" + red.expense.id + "/" + red.motive.id);
  }

  getPaymentSituations(studentId: number, yearId: number): Observable<StudentPayementStatement[]> {
    return this.httpClient.get<StudentPayementStatement[]>(`${this.API_MARTSCO}/student-compta/payment-statements/
    ${studentId}/${yearId}`);
  }

  getAllPayments(yearId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_MARTSCO}/student-compta/all-payments/${yearId}`);
  }

  getFilteredPaymentsPerDay(yearId: number, date: Date, userId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_MARTSCO}/student-compta/filtered-payments-per-day/
    ${yearId}/${date.getTime()}/${userId}`);
  }

  getNthPaymentsPerDay(yearId: number, date: Date, userId: number, nth: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_MARTSCO}/student-compta/nth-payments-per-day/
    ${yearId}/${date.getTime()}/${userId}/${nth}`);
  }

  getFilteredPaymentsPerPeriod(yearId: number, date1: Date, date2: Date, userId: number):
    Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_MARTSCO}/student-compta/filtered-payments-per-period/
    ${yearId}/${date1.getTime()}/${date2.getTime()}/${userId}`);
  }

  getCashFlowPerDayAllUsers(yearId: number, date: Date, userId: number): Observable<CashFlow[]> {
    return this.httpClient.get<CashFlow[]>(`${this.API_MARTSCO}/student-compta/cashflow-per-day-all-users/
    ${yearId}/${date.getTime()}`);
  }

  getCashFlowPerPeriodAllUsers(yearId: number, date1: Date, date2: Date, userId: number):
    Observable<CashFlow[]> {
    return this.httpClient.get<CashFlow[]>(`${this.API_MARTSCO}/student-compta/cashflow-per-period-all-users/
    ${yearId}/${date1.getTime()}/${date2.getTime()}`);
  }

  updateAmount(cashFlows: CashFlow[]): Observable<number> {
    // let paymentsAmount = 0;
    // for (const employee of list) {
    //   paymentsAmount += this.computeAmount(employee.cashRegistrations);
    // }

    return this.httpClient.post<number>(this.API_MARTSCO + "/student-compta/cashflows/compute-amount", cashFlows);
  }

  getpaymentStatementAllSchoolClass(expenseId: number, yearId: number): Observable<PaymentStatementAllSchoolClassBean> {
    return this.httpClient.get<PaymentStatementAllSchoolClassBean>(this.API_MARTSCO + "/student-compta/payment-statements-all-school-class/"
      + expenseId + "/" + yearId);
  }
}
