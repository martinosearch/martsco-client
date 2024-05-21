"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComptaMenuComponent = void 0;
var core_1 = require("@angular/core");
var ComptaMenuComponent = /** @class */ (function () {
    function ComptaMenuComponent(router, routeService, comptaRouteService, actionService, constanceService, comptaReportingService, authService) {
        this.router = router;
        this.routeService = routeService;
        this.comptaRouteService = comptaRouteService;
        this.actionService = actionService;
        this.constanceService = constanceService;
        this.comptaReportingService = comptaReportingService;
        this.authService = authService;
        this.expanded = false;
    }
    ComptaMenuComponent.prototype.ngOnInit = function () {
    };
    // Compta
    ComptaMenuComponent.prototype.toExpenseList = function () {
        this.router.navigate([this.routeService.expenseListRoute]);
    };
    ComptaMenuComponent.prototype.toReductionStudentList = function () {
        this.router.navigate([this.routeService.reductionStudentListRoute]);
    };
    ComptaMenuComponent.prototype.toReductionMotive = function () {
        this.router.navigate([this.routeService.reductionMotiveListRoute]);
    };
    ComptaMenuComponent.prototype.toCashRegisterForm = function (write) {
        this.router.navigate([this.comptaRouteService.cashRegisterFormRoute]);
    };
    ComptaMenuComponent.prototype.onPaymentStatementPerClass = function () {
        this.actionService.launchAction(this.comptaReportingService.paymentStatementPerClass()).subscribe(function (resp) { });
    };
    ComptaMenuComponent.prototype.toCashRegisterBalance = function () {
        this.router.navigate([this.comptaRouteService.cashRegisterBalance]);
    };
    ComptaMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-compta-menu',
            templateUrl: './compta-menu.component.html',
            styleUrls: ['./compta-menu.component.scss']
        })
    ], ComptaMenuComponent);
    return ComptaMenuComponent;
}());
exports.ComptaMenuComponent = ComptaMenuComponent;
