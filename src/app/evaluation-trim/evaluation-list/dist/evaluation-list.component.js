"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EvaluationListComponent = void 0;
var core_1 = require("@angular/core");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var evaluation_form_component_1 = require("../evaluation-form/evaluation-form.component");
var evaluation_1 = require("../models/evaluation");
var EvaluationListComponent = /** @class */ (function () {
    function EvaluationListComponent(auth, dialog, constanceService, dataService) {
        this.auth = auth;
        this.dialog = dialog;
        this.constanceService = constanceService;
        this.dataService = dataService;
        this.displayedColumns = ['num', 'designation', 'type', 'decoupage', 'annee', 'modify', 'suppr'];
        this.filteredList = [];
        this.evaluations = [];
        this.list = [];
    }
    EvaluationListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.refresh();
        });
    };
    EvaluationListComponent.prototype.ngOnDestroy = function () { };
    EvaluationListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.list = resp.filter(function (elmt) { return (elmt.year.id === _this.currentYear.id); });
            _this.filteredList = _this.list;
        });
    };
    EvaluationListComponent.prototype.onDelete = function (obj) {
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
    EvaluationListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    EvaluationListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(evaluation_form_component_1.EvaluationFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter une évaluation', obj: new evaluation_1.Evaluation() }
        });
        dialogRef.componentInstance.event.subscribe(function () { return _this.refresh(); });
    };
    EvaluationListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(evaluation_form_component_1.EvaluationFormComponent, {
            width: '600px',
            data: { titre: 'Modifier', obj: data }
        });
        dialogRef.componentInstance.event.subscribe(function () { return _this.refresh(); });
    };
    // filter for test autocomplete
    EvaluationListComponent.prototype.filter = function () {
        if (typeof this.filterText !== undefined) {
            var filterValue_1 = this.filterText.toLowerCase();
            this.filteredList = this.evaluations.filter(function (option) {
                return (option.designation).toLowerCase().includes(filterValue_1);
            });
        }
    };
    EvaluationListComponent = __decorate([
        core_1.Component({
            selector: 'app-evaluation-list',
            templateUrl: './evaluation-list.component.html',
            styleUrls: ['./evaluation-list.component.scss']
        })
    ], EvaluationListComponent);
    return EvaluationListComponent;
}());
exports.EvaluationListComponent = EvaluationListComponent;
