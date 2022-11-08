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
exports.ReductionStudentFormComponent = void 0;
var animations_1 = require("@angular/animations");
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var confirm_delete_component_1 = require("src/app/utilities/confirm-delete/confirm-delete.component");
var ReductionStudentFormComponent = /** @class */ (function () {
    function ReductionStudentFormComponent(auth, data, dialog, form, messageService, dataService, schoolClassService, studentComptaService, studentIdentityService, constanceService, expenseService, reductionMotiveService) {
        this.auth = auth;
        this.data = data;
        this.dialog = dialog;
        this.form = form;
        this.messageService = messageService;
        this.dataService = dataService;
        this.schoolClassService = schoolClassService;
        this.studentComptaService = studentComptaService;
        this.studentIdentityService = studentIdentityService;
        this.constanceService = constanceService;
        this.expenseService = expenseService;
        this.reductionMotiveService = reductionMotiveService;
        this.currentSchoolClassId = 0;
        this.displayedColumns = [
            'num',
            'nom',
            'prenom',
            'sex',
            'select'
        ];
        this.selectionDisplayedColumns = [
            'num',
            'nom',
            'prenom', 'sex', 'schoolClass',
        ];
        this.filteredList = [];
        this.holeList = [];
        this.listCursusBean = [];
        this.classes = [];
        this.expenses = [];
        this.isRunning = false;
        this.showActions = false;
        this.filterControl = new forms_1.FormControl();
        this.event = new core_1.EventEmitter();
        this.reductionMotives = [];
        // for checkbox in the table
        this.selection = new collections_1.SelectionModel(true, []);
        this.numberOfResult = 0;
    }
    ReductionStudentFormComponent_1 = ReductionStudentFormComponent;
    ReductionStudentFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRunning = true;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
        });
        this.selection.changed.subscribe(function () {
            if (_this.selection.selected.length > 0) {
                _this.showActions = true;
            }
            else {
                _this.showActions = false;
            }
        });
        this.expenseService.getAll().subscribe(function (resp) {
            _this.expenses = resp;
            _this.expenseId = resp[0] !== undefined ? resp[0].id : undefined;
            _this.reductionMotiveService.getAll().subscribe(function (resp) {
                _this.reductionMotives = resp;
                _this.motiveId = resp[0] !== undefined ? resp[0].id : undefined;
                _this.schoolClassService.getAll().subscribe(function (resp) {
                    _this.classes = resp;
                    _this.refresh();
                });
            });
        });
    };
    ReductionStudentFormComponent.prototype.ngOnDestroy = function () { };
    ReductionStudentFormComponent.prototype.refresh = function () {
        var _this = this;
        //for progress
        this.isRunning = true;
        this.dataService.getAllByClass(this.currentSchoolClassId, this.currentYear.id).subscribe(function (resp) {
            _this.listCursusBean = resp;
            _this.studentIdentityService.getStudentIdentities(_this.listCursusBean).subscribe(function (resp) {
                _this.holeList = resp;
                _this.numberOfResult = resp.length;
                _this.filter();
                _this.selection.clear();
                //for progress
                _this.isRunning = false;
            });
        }, function () {
            console.log('finished lodding!!!!!!! filteredList size= ' + _this.filteredList.length);
            //for progress
            _this.isRunning = false;
        });
    };
    ReductionStudentFormComponent.prototype.onDeleteReduction = function (student, red) {
        var _this = this;
        this.studentIdentityService.getOne(student.id).subscribe(function (resp) {
            var dialogRef = _this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
                width: '1000px',
                data: {
                    titre: 'Voulez- vous vraiment supprimer la réduction de' + red.amount + ' pour:  ' +
                        red.motive.designation + ' de l\'élève: ' + resp.identity.lastName
                        + ' ' + resp.identity.firstName
                }
            });
            dialogRef.componentInstance.event.subscribe(function (response) {
                _this.studentComptaService.deleteReduction(student.id, red).subscribe(function (resp) {
                    console.log('done!!');
                    _this.refresh();
                });
            });
        });
    };
    ReductionStudentFormComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(ReductionStudentFormComponent_1, {
            width: '1000px',
            data: { titre: 'Modifier', obj: data }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    // filter for test autocomplete
    ReductionStudentFormComponent.prototype.filter = function () {
        if (this.filterText !== undefined) {
            var filterValue_1 = this.filterText.toLowerCase();
            this.filteredList = this.holeList.filter(function (option) {
                return (option.identity.lastName + ' ' + option.identity.firstName).toLowerCase().includes(filterValue_1);
            });
        }
        else {
            this.filteredList = this.holeList;
        }
    };
    ReductionStudentFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '1000px',
            data: {
                titre: 'Voulez- vous vraiment appliquer une remise de: '
                    + this.currentAmount + ' F CFA aux élèves choisi?'
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            for (var _i = 0, _a = _this.selection.selected; _i < _a.length; _i++) {
                var studentIdBean = _a[_i];
                _this.studentComptaService.addReduction(studentIdBean.id, _this.currentYear.id, _this.expenseId, _this.motiveId, _this.currentAmount).subscribe(function (resp) {
                    console.log("reduction added for: " + resp.id);
                });
            }
            _this.messageService.showSucces("Super!", true);
        });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    ReductionStudentFormComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.numberOfResult;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    ReductionStudentFormComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() : this.filteredList.forEach(function (row) { return _this.selection.select(row); });
    };
    /** The label for the checkbox on the passed row */
    ReductionStudentFormComponent.prototype.checkboxLabel = function (row, index) {
        if (!row) {
            var option = this.isAllSelected() ? 'select' : 'deselect';
            return option + ' all';
        }
        else {
            var option = this.selection.isSelected(row) ? 'deselect' : 'select';
            return option + ' row ' + (index + 1);
        }
    };
    var ReductionStudentFormComponent_1;
    ReductionStudentFormComponent = ReductionStudentFormComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-reduction-student-form',
            templateUrl: './reduction-student-form.component.html',
            styleUrls: ['./reduction-student-form.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], ReductionStudentFormComponent);
    return ReductionStudentFormComponent;
}());
exports.ReductionStudentFormComponent = ReductionStudentFormComponent;
