"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComptaDashboardComponent = void 0;
var core_1 = require("@angular/core");
var payment_statement_all_bean_1 = require("../models/payment-statement-all-bean");
var cash_flow_1 = require("../models/cash-flow");
var ComptaDashboardComponent = /** @class */ (function () {
    function ComptaDashboardComponent(constanceService, authService, schoolClassIdentityService, expenseService, studentComptaService) {
        this.constanceService = constanceService;
        this.authService = authService;
        this.schoolClassIdentityService = schoolClassIdentityService;
        this.expenseService = expenseService;
        this.studentComptaService = studentComptaService;
        this.displayedColumns = ['class', 'male', 'female', 'sum', 'per'];
        this.studentsDisplayedColumns = ['num', 'designation', 'amount'];
        this.twentythStudents = [];
        this.classes = [];
        this.employees = [];
        this.effectifBeans = [];
        this.totalEffectifBean = new payment_statement_all_bean_1.PaymentStatementAllSchoolClassBean();
        this.numberOfClasses = 0;
        this.numberOfExpense = 0;
        this.numberOfRegister = 0;
        this.allCashFlows = [];
        this.myCashFlow = new cash_flow_1.CashFlow();
    }
    ComptaDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.expenseService.getAll().subscribe(function (exp) {
                var currentExpense = exp[0]; //Todo
                _this.studentComptaService.getpaymentStatementAllSchoolClass(currentExpense.id, _this.currentYear.id)
                    .subscribe(function (respEff) {
                    //   console.log("payment statements size: " + respEff.statements.length);
                    _this.effectifBeans = respEff.statements;
                    _this.totalEffectifBean = respEff;
                });
            });
            _this.schoolClassIdentityService.getAll().subscribe(function (resp) {
                _this.numberOfClasses = resp.length;
            });
            _this.studentComptaService.getCashFlowPerDayAllUsers(_this.currentYear.id, new Date(), _this.currentUserId).subscribe(function (resp) {
                _this.allCashFlows = resp;
                _this.numberOfRegister = _this.allCashFlows.length;
                _this.myCashFlow = _this.allCashFlows.filter(function (item) {
                    return item.employeeIdentityBean.id === _this.currentUserId;
                })[0];
                _this.myCashFlow = _this.myCashFlow !== undefined ? _this.myCashFlow : new cash_flow_1.CashFlow();
            });
            _this.expenseService.getAll().subscribe(function (resp) {
                _this.numberOfExpense = resp.length;
            });
            _this.authService.currentUserSubj.subscribe(function (resp) {
                _this.currentUserId = resp;
                _this.studentComptaService.getNthPaymentsPerDay(_this.currentYear.id, new Date(), _this.currentUserId, 20).subscribe(function (resp) {
                    _this.twentythStudents = resp;
                    console.log("nth payments size: " + resp.length);
                });
            });
        });
    };
    ComptaDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-compta-dashboard',
            templateUrl: './compta-dashboard.component.html',
            styleUrls: ['./compta-dashboard.component.scss']
        })
    ], ComptaDashboardComponent);
    return ComptaDashboardComponent;
}());
exports.ComptaDashboardComponent = ComptaDashboardComponent;
