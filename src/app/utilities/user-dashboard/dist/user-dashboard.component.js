"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserDashboardComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UserDashboardComponent = /** @class */ (function () {
    function UserDashboardComponent(authService, actionService, studentComptaService, dialog, comptaReportingService, employeeService, constanceService, studentService, progressService) {
        this.authService = authService;
        this.actionService = actionService;
        this.studentComptaService = studentComptaService;
        this.dialog = dialog;
        this.comptaReportingService = comptaReportingService;
        this.employeeService = employeeService;
        this.constanceService = constanceService;
        this.studentService = studentService;
        this.progressService = progressService;
        this.invoiceDisplayedColumns = [
            'num',
            'date_emis',
            'num_fact',
            'amount',
            'detail'
        ];
        this.invoicesDisplayType = 0;
        this.cushDisplayType = 0;
        this.startDate = new forms_1.FormControl(new Date());
        this.endDate = new forms_1.FormControl(new Date());
        this.filteredPayments = [];
        this.paymentsAmount = 0;
        this.numOfCash = 0;
        this.cashsAmount = 0;
    }
    UserDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.authService.currentUserSubj.subscribe(function (resp) {
                _this.currentUserId = resp;
                // for autocomplete search patitent
                _this.startDate.valueChanges.subscribe(function (resp) {
                    if (_this.invoicesDisplayType === 0) {
                        _this.filterPaymentsByDate();
                    }
                    else {
                        _this.filterPaymentsByPeriod();
                    }
                });
                // for autocomplete search patitent
                _this.endDate.valueChanges.subscribe(function (resp) {
                    if (_this.invoicesDisplayType === 0) {
                        _this.filterPaymentsByDate();
                    }
                    else {
                        _this.filterPaymentsByPeriod();
                    }
                });
                _this.filterPaymentsByDate();
            });
        });
    };
    UserDashboardComponent.prototype.refreshOption = function (option) {
        console.log("option clicked: " + option);
        this.invoicesDisplayType = option;
        if (this.invoicesDisplayType === 0) {
            this.filterPaymentsByDate();
        }
        else {
            this.filterPaymentsByPeriod();
        }
    };
    UserDashboardComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    // filter invoice by date
    UserDashboardComponent.prototype.filterPaymentsByDate = function () {
        var _this = this;
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            _this.studentComptaService.getFilteredPaymentsPerDay(_this.currentYear.id, new Date(_this.startDate.value), _this.currentUserId).subscribe(function (resp) {
                _this.filteredPayments = resp;
                _this.updateAmounts(_this.filteredPayments);
                _this.actionService.stopWaiting(progressId);
            });
        });
    };
    // filter invoice by period
    UserDashboardComponent.prototype.filterPaymentsByPeriod = function () {
        var _this = this;
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            _this.studentComptaService.getFilteredPaymentsPerPeriod(_this.currentYear.id, new Date(_this.startDate.value), new Date(_this.endDate.value), _this.currentUserId).subscribe(function (resp) {
                _this.filteredPayments = resp;
                _this.updateAmounts(_this.filteredPayments);
                _this.actionService.stopWaiting(progressId);
            });
        });
    };
    UserDashboardComponent.prototype.updateAmounts = function (list) {
        //update amount
        this.paymentsAmount = list
            .map(function (t) { return t.currentAmount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    UserDashboardComponent.prototype.generatePdfAndShow = function (student, serial) {
        var _this = this;
        //we call pdf
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            _this.comptaReportingService.generateReceiptOf(student, serial, 0).subscribe(function () {
                _this.sleep(5000).then(function () {
                    _this.actionService.stopWaiting(progressId);
                });
            });
        });
    };
    UserDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-user-dashbord',
            templateUrl: './user-dashboard.component.html',
            styleUrls: ['./user-dashboard.component.scss']
        })
    ], UserDashboardComponent);
    return UserDashboardComponent;
}());
exports.UserDashboardComponent = UserDashboardComponent;
