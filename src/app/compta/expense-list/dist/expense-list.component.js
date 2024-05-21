"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExpenseListComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var expense_1 = require("src/app/compta/models/expense");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var expense_form_component_1 = require("../expense-form/expense-form.component");
var ExpenseListComponent = /** @class */ (function () {
    function ExpenseListComponent(auth, dialog, dataService, constanceService) {
        this.auth = auth;
        this.dialog = dialog;
        this.dataService = dataService;
        this.constanceService = constanceService;
        this.displayedColumns = [
            'num',
            'designation',
            'code',
            'modify',
            'suppr',
            'setting'
        ];
        this.filteredList = new rxjs_1.Observable();
        this.list = [];
        this.filterControl = new forms_1.FormControl();
    }
    ExpenseListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.refresh();
        });
        // for autocomplete
        this.filterControl.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this.filter(value); })).subscribe(function (resp) {
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    ExpenseListComponent.prototype.ngOnDestroy = function () { };
    ExpenseListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.list = resp;
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    ExpenseListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService["delete"](obj.id).subscribe(function (resp) {
                console.log('deleted: ' + obj);
                _this.refresh();
            });
            _this.refresh();
        });
    };
    ExpenseListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    ExpenseListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(expense_form_component_1.ExpenseFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter un Frais', obj: new expense_1.Expense(), option: 0 }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    ExpenseListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(expense_form_component_1.ExpenseFormComponent, {
            width: '600px',
            data: { titre: 'Modifier', obj: data, option: 0 }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    ExpenseListComponent.prototype.onSetting = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(expense_form_component_1.ExpenseFormComponent, {
            width: '1000px',
            data: { titre: 'Configurations', obj: data, option: 1 }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    // filter for test autocomplete
    ExpenseListComponent.prototype.filter = function (value) {
        if (typeof value === 'string') {
            if (value === '') {
                return this.list;
            }
            else {
                var filterValue_1 = value.toLowerCase();
                return this.list.filter(function (option) {
                    return (option.designation).toLowerCase().includes(filterValue_1);
                });
            }
        }
        else {
            return this.list;
        }
    };
    // to avoid double
    ExpenseListComponent.prototype.getParsedListAmount = function (element) {
        var _this = this;
        var temp = [];
        return element.amountSettings.filter(function (elmt) { return (elmt.year.id === _this.currentYear.id); });
    };
    ExpenseListComponent = __decorate([
        core_1.Component({
            selector: 'app-expense-list',
            templateUrl: './expense-list.component.html',
            styleUrls: ['./expense-list.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], ExpenseListComponent);
    return ExpenseListComponent;
}());
exports.ExpenseListComponent = ExpenseListComponent;
