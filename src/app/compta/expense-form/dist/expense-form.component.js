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
exports.ExpenseFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var expense_1 = require("../models/expense");
var expense_amount_setting_1 = require("../models/expense-amount-setting");
var ExpenseFormComponent = /** @class */ (function () {
    function ExpenseFormComponent(data, form, academicStandardService, messageService, constanceService, expenseService) {
        this.data = data;
        this.form = form;
        this.academicStandardService = academicStandardService;
        this.messageService = messageService;
        this.constanceService = constanceService;
        this.expenseService = expenseService;
        this.model = new expense_1.Expense();
        this.event = new core_1.EventEmitter();
        this.standards = [];
        this.disabled = false;
        this.isPayableByTranche = true;
    }
    ExpenseFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.model = _this.data.obj;
            _this.disabled = _this.data.option === 0 ? false : true;
            _this.refresh();
        });
    };
    ExpenseFormComponent.prototype.ngOnDestroy = function () {
        this.event.emit(this.model);
    };
    ExpenseFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    ExpenseFormComponent.prototype.refresh = function () {
        var _this = this;
        this.academicStandardService.getAll().subscribe({
            next: function (value) {
                _this.standards = value;
                if (_this.currentStandardId === undefined) {
                    _this.currentStandardId = _this.standards[0].id;
                }
                _this.expenseService.getAmountByClass(_this.model.id, _this.currentStandardId, _this.currentYear.id).subscribe(function (resp) {
                    if (resp !== null && resp !== undefined) {
                        _this.currentAmount = resp.amount;
                        _this.isPayableByTranche = resp.isPayableByTranche;
                    }
                    else {
                        _this.currentAmount = undefined;
                    }
                });
            }
        });
    };
    ExpenseFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.academicStandardService.getOne(this.currentStandardId).subscribe(function (resp) {
            var setting = new expense_amount_setting_1.ExpenseAmountSetting();
            // to avoid double
            var tempSets = [];
            if (_this.model.amountSettings.length > 0) {
                for (var _i = 0, _a = _this.model.amountSettings; _i < _a.length; _i++) {
                    var set = _a[_i];
                    if (set.standard !== null && set.year !== null) {
                        if (set.standard.id === _this.currentStandardId && set.year.id === _this.currentYear.id) {
                            setting = set;
                        }
                        else {
                            tempSets.push(set); // other settings
                        }
                    }
                }
            }
            setting.year = _this.currentYear;
            setting.standard = resp;
            setting.amount = _this.currentAmount;
            setting.isPayableByTranche = _this.isPayableByTranche;
            tempSets.push(setting);
            _this.model.amountSettings = tempSets;
            console.log("on expense submit:  " + _this.model.amountSettings);
            _this.expenseService.save(_this.model).subscribe(function (resp) {
                _this.refresh();
            });
            _this.messageService.showSucces("Succès!", true);
        });
    };
    ExpenseFormComponent.prototype.addTranche = function () {
    };
    ExpenseFormComponent = __decorate([
        core_1.Component({
            selector: 'app-expense-form',
            templateUrl: './expense-form.component.html',
            styleUrls: ['./expense-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], ExpenseFormComponent);
    return ExpenseFormComponent;
}());
exports.ExpenseFormComponent = ExpenseFormComponent;
