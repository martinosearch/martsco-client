"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AcademicStandartListComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var academic_standart_form_component_1 = require("../academic-standart-form/academic-standart-form.component");
var AcademicStandartListComponent = /** @class */ (function () {
    function AcademicStandartListComponent(auth, dialog, messageService, dataService) {
        this.auth = auth;
        this.dialog = dialog;
        this.messageService = messageService;
        this.dataService = dataService;
        this.displayedColumns = [
            'num',
            'designation',
            'modify',
            'suppr', 'setting'
        ];
        this.filteredList = new rxjs_1.Observable();
        this.list = [];
        this.filterControl = new forms_1.FormControl();
    }
    AcademicStandartListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refresh();
        // for autocomplete
        this.filterControl.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this.filter(value); })).subscribe(function (resp) {
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    AcademicStandartListComponent.prototype.ngOnDestroy = function () { };
    AcademicStandartListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.list = resp;
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    AcademicStandartListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(academic_standart_form_component_1.AcademicStandartFormComponent, {
            width: '600px',
            data: { titre: 'Modifier', obj: data }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.saveIdentity(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
                validationSub.unsubscribe();
            });
        });
    };
    AcademicStandartListComponent.prototype.onSetting = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(academic_standart_form_component_1.AcademicStandartFormComponent, {
            width: '800px',
            data: { titre: 'Configuration (' + data.designation + ')', obj: data, isSetting: true }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    AcademicStandartListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService["delete"](obj.id).subscribe(function (resp) {
                console.log('deleted: ' + obj);
                _this.refresh();
            }, function (error) {
                _this.messageService.showErrorMessage(error.error.message);
            });
        });
    };
    AcademicStandartListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    AcademicStandartListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(academic_standart_form_component_1.AcademicStandartFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter un niveau' }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    // filter for test autocomplete
    AcademicStandartListComponent.prototype.filter = function (value) {
        if (typeof value === 'string') {
            console.log('the current value for analyse is: ' + value);
            if (value === '') {
                console.log('je suis ici: ' + value);
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
    AcademicStandartListComponent = __decorate([
        core_1.Component({
            selector: 'app-academic-standart-list',
            templateUrl: './academic-standart-list.component.html',
            styleUrls: ['./academic-standart-list.component.scss']
        })
    ], AcademicStandartListComponent);
    return AcademicStandartListComponent;
}());
exports.AcademicStandartListComponent = AcademicStandartListComponent;
