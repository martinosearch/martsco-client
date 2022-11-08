"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExamNationalListComponent = void 0;
var core_1 = require("@angular/core");
var year_1 = require("src/app/establishment/models/year");
var year_form_component_1 = require("src/app/establishment/year-form/year-form.component");
var confirm_delete_component_1 = require("src/app/utilities/confirm-delete/confirm-delete.component");
var exam_national_form_component_1 = require("../exam-national-form/exam-national-form.component");
var ExamNationalListComponent = /** @class */ (function () {
    function ExamNationalListComponent(auth, dialog, dataService) {
        this.auth = auth;
        this.dialog = dialog;
        this.dataService = dataService;
        this.displayedColumns = [
            'num',
            'designation',
            'modify',
            'suppr'
        ];
        this.holeList = [];
        this.filteredList = [];
    }
    ExamNationalListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    ExamNationalListComponent.prototype.ngOnDestroy = function () { };
    ExamNationalListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.holeList = resp;
            _this.filter();
        });
    };
    ExamNationalListComponent.prototype.onDelete = function (obj) {
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
    ExamNationalListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(exam_national_form_component_1.ExamNationalFormComponent, {
            width: '600px',
            data: { titre: 'Modifier', obj: data }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
                validationSub.unsubscribe();
            });
        });
    };
    ExamNationalListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    ExamNationalListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(year_form_component_1.YearFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter un examen', obj: new year_1.Year() }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    ExamNationalListComponent.prototype.filter = function () {
        if (this.filterText !== undefined) {
            var filterValue_1 = this.filterText.toLowerCase();
            this.filteredList = this.holeList.filter(function (value) {
                return (value.designation).toLowerCase().includes(filterValue_1);
            });
        }
        else {
            this.filteredList = this.holeList;
        }
    };
    ExamNationalListComponent = __decorate([
        core_1.Component({
            selector: 'app-exam-national-list',
            templateUrl: './exam-national-list.component.html',
            styleUrls: ['./exam-national-list.component.scss']
        })
    ], ExamNationalListComponent);
    return ExamNationalListComponent;
}());
exports.ExamNationalListComponent = ExamNationalListComponent;
