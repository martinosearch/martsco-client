"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.PaymentFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var PaymentFormComponent = /** @class */ (function () {
    function PaymentFormComponent(data, form, expenseService, constanceService) {
        this.data = data;
        this.form = form;
        this.expenseService = expenseService;
        this.constanceService = constanceService;
        this.event = new core_1.EventEmitter();
        this.disabled = false;
        this.expenses = new rxjs_1.Observable();
    }
    PaymentFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
        });
        this.model = this.data.obj;
        this.currentSchoolClass = this.data.schoolClass;
        this.expenses = this.expenseService.getAll();
        this.expenses.subscribe(function (resp) {
            _this.expenseId = resp[0] !== undefined ? resp[0].id : undefined;
            _this.refreshAmountSettings();
        });
    };
    PaymentFormComponent.prototype.ngOnDestroy = function () {
    };
    PaymentFormComponent.prototype.refreshAmountSettings = function () {
        var _this = this;
        this.expenseService.getAmountByClass(this.expenseId, this.currentSchoolClass.standard.id, this.currentYear.id).subscribe(function (setting) {
            console.log("Current setting: " + JSON.stringify(setting));
            if (setting !== null) {
                if (setting.isPayableByTranche) {
                    _this.disabled = false;
                }
                else {
                    _this.disabled = true;
                    _this.model.currentAmount = setting.amount;
                }
            }
            else {
                _this.disabled = false;
            }
        });
    };
    PaymentFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    PaymentFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.expenseService.getOne(this.expenseId).subscribe(function (resp) {
            _this.model.expense = resp;
        });
        this.event.emit(this.model);
        this.form.close();
    };
    PaymentFormComponent = __decorate([
        core_1.Component({
            selector: 'app-payment-form',
            templateUrl: './payment-form.component.html',
            styleUrls: ['./payment-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], PaymentFormComponent);
    return PaymentFormComponent;
}());
exports.PaymentFormComponent = PaymentFormComponent;
