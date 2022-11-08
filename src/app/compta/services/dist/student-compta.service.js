"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentComptaService = void 0;
var core_1 = require("@angular/core");
var StudentComptaService = /** @class */ (function () {
    function StudentComptaService(appConfigsService, httpClient) {
        this.appConfigsService = appConfigsService;
        this.httpClient = httpClient;
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    StudentComptaService.prototype.getAll = function () {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/list");
    };
    StudentComptaService.prototype.getOne = function (studentId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/info/" + studentId);
    };
    StudentComptaService.prototype["delete"] = function (id) {
        return this.httpClient["delete"](this.API_MARTSCO + "/student-compta/delete/" + id);
    };
    StudentComptaService.prototype.save = function (data) {
        return this.httpClient.post(this.API_MARTSCO + "/student-compta/save", data);
    };
    StudentComptaService.prototype.getStudentThatHasReduction = function (expenseId, expenseMotiveId, classId, yearId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/list/students-that-have-reduction/" + expenseId + "/" + expenseMotiveId + "/" + classId + "/" + yearId);
    };
    StudentComptaService.prototype.addReduction = function (studentId, yearId, expenseId, reductionMotiveId, amount) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/reduction-add/"
            + studentId + "/" + yearId + "/" + expenseId + "/" + reductionMotiveId + "/" + amount);
    };
    StudentComptaService.prototype.deleteReduction = function (studentId, red) {
        return this.httpClient["delete"](this.API_MARTSCO + "/student-compta/reduction-delete/"
            + studentId + "/" + red.year.id + "/" + red.expense.id + "/" + red.motive.id);
    };
    StudentComptaService.prototype.getPaymentSituations = function (studentId, yearId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/payment-statements/\n    " + studentId + "/" + yearId);
    };
    StudentComptaService.prototype.getAllPayments = function (yearId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/all-payments/" + yearId);
    };
    StudentComptaService.prototype.getFilteredPaymentsPerDay = function (yearId, date, userId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/filtered-payments-per-day/\n    " + yearId + "/" + date.getTime() + "/" + userId);
    };
    StudentComptaService.prototype.getNthPaymentsPerDay = function (yearId, date, userId, nth) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/nth-payments-per-day/\n    " + yearId + "/" + date.getTime() + "/" + userId + "/" + nth);
    };
    StudentComptaService.prototype.getFilteredPaymentsPerPeriod = function (yearId, date1, date2, userId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/filtered-payments-per-period/\n    " + yearId + "/" + date1.getTime() + "/" + date2.getTime() + "/" + userId);
    };
    StudentComptaService.prototype.getCashFlowPerDayAllUsers = function (yearId, date, userId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/cashflow-per-day-all-users/\n    " + yearId + "/" + date.getTime());
    };
    StudentComptaService.prototype.getCashFlowPerPeriodAllUsers = function (yearId, date1, date2, userId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/cashflow-per-period-all-users/\n    " + yearId + "/" + date1.getTime() + "/" + date2.getTime());
    };
    StudentComptaService.prototype.updateAmount = function (cashFlows) {
        // let paymentsAmount = 0;
        // for (const employee of list) {
        //   paymentsAmount += this.computeAmount(employee.cashRegistrations);
        // }
        return this.httpClient.post(this.API_MARTSCO + "/student-compta/cashflows/compute-amount", cashFlows);
    };
    StudentComptaService.prototype.getpaymentStatementAllSchoolClass = function (expenseId, yearId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-compta/payment-statements-all-school-class/"
            + expenseId + "/" + yearId);
    };
    StudentComptaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StudentComptaService);
    return StudentComptaService;
}());
exports.StudentComptaService = StudentComptaService;
