"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubjectTypeListComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var subject_type_1 = require("src/app/subject-mg/models/subject-type");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var subject_type_form_component_1 = require("../subject-type-form/subject-type-form.component");
var SubjectTypeListComponent = /** @class */ (function () {
    function SubjectTypeListComponent(auth, messageService, dialog, dataService) {
        this.auth = auth;
        this.messageService = messageService;
        this.dialog = dialog;
        this.dataService = dataService;
        this.displayedColumns = [
            'num',
            'designation',
            'modify',
            'suppr'
        ];
        this.filteredList = new rxjs_1.Observable();
        this.list = [];
        this.filterControl = new forms_1.FormControl();
    }
    SubjectTypeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refresh();
        // for autocomplete
        this.filterControl.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this.filter(value); })).subscribe(function (resp) {
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    SubjectTypeListComponent.prototype.ngOnDestroy = function () { };
    SubjectTypeListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.list = resp;
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    SubjectTypeListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(subject_type_form_component_1.SubjectTypeFormComponent, {
            width: '600px',
            data: { titre: 'Modifier', obj: data }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.dataService.setCurrentObject(response2);
                _this.refresh();
                validationSub.unsubscribe();
            });
        });
    };
    SubjectTypeListComponent.prototype.onDelete = function (obj) {
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
    SubjectTypeListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    SubjectTypeListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(subject_type_form_component_1.SubjectTypeFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter un type de matière', obj: new subject_type_1.SubjectType() }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    // filter for test autocomplete
    SubjectTypeListComponent.prototype.filter = function (value) {
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
    SubjectTypeListComponent = __decorate([
        core_1.Component({
            selector: 'app-subject-type-list',
            templateUrl: './subject-type-list.component.html',
            styleUrls: ['./subject-type-list.component.scss']
        })
    ], SubjectTypeListComponent);
    return SubjectTypeListComponent;
}());
exports.SubjectTypeListComponent = SubjectTypeListComponent;
