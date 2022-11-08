"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmployeeListComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var employee_identity_bean_1 = require("src/app/employees-mg/models/employee-identity-bean");
var confirm_delete_component_1 = require("src/app/utilities/confirm-delete/confirm-delete.component");
var employee_form_component_1 = require("../employee-form/employee-form.component");
var EmployeeListComponent = /** @class */ (function () {
    function EmployeeListComponent(auth, dialog, dataService) {
        this.auth = auth;
        this.dialog = dialog;
        this.dataService = dataService;
        this.displayedColumns = [
            'num',
            'nom',
            'prenom',
            'civility',
            'tel',
            'email',
            'modify',
            'suppr'
        ];
        this.filteredList = [];
        this.holeList = [];
    }
    EmployeeListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    EmployeeListComponent.prototype.ngOnDestroy = function () { };
    EmployeeListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.holeList = resp;
            _this.filteredList = _this.holeList;
        });
    };
    EmployeeListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.identity.lastName + ' ' + obj.identity.firstName }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService["delete"](obj.id).subscribe(function (resp) {
                console.log('deleted: ' + obj);
                _this.refresh();
            });
            _this.refresh();
        });
    };
    EmployeeListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    EmployeeListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(employee_form_component_1.EmployeeFormComponent, {
            width: '1000px',
            data: { titre: 'Ajouter un employee', obj: new employee_identity_bean_1.EmployeeIdentityBean() }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    EmployeeListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(employee_form_component_1.EmployeeFormComponent, {
            width: '1000px',
            data: { titre: 'Modifier', obj: data }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                _this.refresh();
                validationSub.unsubscribe();
            });
        });
    };
    // filter for test autocomplete
    EmployeeListComponent.prototype.filter = function () {
        if (typeof this.filterText !== undefined) {
            var filterValue_1 = this.filterText.toLowerCase();
            this.filteredList = this.holeList.filter(function (option) {
                return (option.identity.lastName + ' ' + option.identity.firstName).toLowerCase().includes(filterValue_1);
            });
        }
    };
    EmployeeListComponent = __decorate([
        core_1.Component({
            selector: 'app-employee-list',
            templateUrl: './employee-list.component.html',
            styleUrls: ['./employee-list.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], EmployeeListComponent);
    return EmployeeListComponent;
}());
exports.EmployeeListComponent = EmployeeListComponent;
