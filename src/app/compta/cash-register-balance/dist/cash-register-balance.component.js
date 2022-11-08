"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CashRegisterBalanceComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CashRegisterBalanceComponent = /** @class */ (function () {
    function CashRegisterBalanceComponent(authService, actionService, dialog, comptaReportingService, employeeService, constanceService, studentService, studentComptaService, progressService) {
        this.authService = authService;
        this.actionService = actionService;
        this.dialog = dialog;
        this.comptaReportingService = comptaReportingService;
        this.employeeService = employeeService;
        this.constanceService = constanceService;
        this.studentService = studentService;
        this.studentComptaService = studentComptaService;
        this.progressService = progressService;
        this.invoiceDisplayedColumns = [
            'num',
            'num_fact'
        ];
        this.invoicesDisplayType = 0;
        this.cushDisplayType = 0;
        this.startDate = new forms_1.FormControl(new Date());
        this.endDate = new forms_1.FormControl(new Date());
        this.cashFlows = [];
        this.numOfCash = 0;
        this.cashsAmount = 0;
    }
    CashRegisterBalanceComponent.prototype.ngOnInit = function () {
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
    CashRegisterBalanceComponent.prototype.refreshOption = function (option) {
        console.log("option clicked: " + option);
        this.invoicesDisplayType = option;
        if (this.invoicesDisplayType === 0) {
            this.filterPaymentsByDate();
        }
        else {
            this.filterPaymentsByPeriod();
        }
    };
    // filter invoice by date
    CashRegisterBalanceComponent.prototype.filterPaymentsByDate = function () {
        var _this = this;
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            _this.studentComptaService.getCashFlowPerDayAllUsers(_this.currentYear.id, new Date(_this.startDate.value), _this.currentUserId).subscribe(function (resp) {
                _this.cashFlows = resp;
                _this.studentComptaService.updateAmount(_this.cashFlows).subscribe(function (amount) {
                    _this.cashsAmount = amount;
                    _this.actionService.stopWaiting(progressId);
                });
            });
        });
    };
    // filter invoice by period
    CashRegisterBalanceComponent.prototype.filterPaymentsByPeriod = function () {
        var _this = this;
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            _this.studentComptaService.getCashFlowPerPeriodAllUsers(_this.currentYear.id, new Date(_this.startDate.value), new Date(_this.endDate.value), _this.currentUserId).subscribe(function (resp) {
                _this.cashFlows = resp;
                _this.studentComptaService.updateAmount(_this.cashFlows).subscribe(function (amount) {
                    _this.cashsAmount = amount;
                    _this.actionService.stopWaiting(progressId);
                });
            });
        });
    };
    CashRegisterBalanceComponent = __decorate([
        core_1.Component({
            selector: 'app-cash-register-balance',
            templateUrl: './cash-register-balance.component.html',
            styleUrls: ['./cash-register-balance.component.scss']
        })
    ], CashRegisterBalanceComponent);
    return CashRegisterBalanceComponent;
}());
exports.CashRegisterBalanceComponent = CashRegisterBalanceComponent;
