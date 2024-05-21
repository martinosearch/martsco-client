"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReductionStudentListComponent = void 0;
var animations_1 = require("@angular/animations");
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var confirm_delete_component_1 = require("src/app/utilities/confirm-delete/confirm-delete.component");
var reduction_student_form_component_1 = require("../reduction-student-form/reduction-student-form.component");
var studentIdentityBean_1 = require("src/app/student-mg/models/studentIdentityBean");
var ReductionStudentListComponent = /** @class */ (function () {
    function ReductionStudentListComponent(auth, progressService, dialog, actionService, expenseService, studentComptaService, studentIdentityService, schoolClassService, constanceService, expenseReductionService) {
        this.auth = auth;
        this.progressService = progressService;
        this.dialog = dialog;
        this.actionService = actionService;
        this.expenseService = expenseService;
        this.studentComptaService = studentComptaService;
        this.studentIdentityService = studentIdentityService;
        this.schoolClassService = schoolClassService;
        this.constanceService = constanceService;
        this.expenseReductionService = expenseReductionService;
        this.currentSchoolClassId = 0;
        this.displayedColumns = [
            'num',
            'nom',
            'prenom', 'sex',
            'modify',
            'suppr'
        ];
        this.filteredList = [];
        this.holeList = [];
        this.listCursusBean = [];
        this.classes = [];
        this.showActions = false;
        this.filterControl = new forms_1.FormControl();
        // for checkbox in the table
        this.selection = new collections_1.SelectionModel(true, []);
        this.numberOfResult = 0;
        this.reductionMotives = [];
        this.expenses = [];
    }
    ReductionStudentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.expenseService.getAll().subscribe(function (resp) {
                _this.expenses = resp;
                _this.currentExpenseId = resp[0].id;
                _this.expenseReductionService.getAll().subscribe(function (resp) {
                    _this.reductionMotives = resp;
                    _this.currentReductionMotiveId = resp[0].id;
                    _this.schoolClassService.getAll().subscribe(function (resp) {
                        _this.classes = resp;
                        _this.refresh();
                    });
                });
            });
        });
        this.selection.changed.subscribe(function () {
            if (_this.selection.selected.length > 1) {
                _this.showActions = true;
            }
            else {
                _this.showActions = false;
            }
        });
    };
    ReductionStudentListComponent.prototype.ngOnDestroy = function () { };
    ReductionStudentListComponent.prototype.refresh = function () {
        var _this = this;
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            _this.studentComptaService.getStudentThatHasReduction(_this.currentExpenseId, _this.currentReductionMotiveId, _this.currentSchoolClassId, _this.currentYear.id).subscribe(function (resp) {
                _this.listCursusBean = resp;
                _this.studentIdentityService.getStudentIdentities(_this.listCursusBean).subscribe(function (respId) {
                    _this.holeList = respId;
                    _this.filter();
                    // console.log("number of result: >>>>> " + this.listCursusBean.length);
                    _this.actionService.stopWaiting(progressId);
                });
            });
        });
    };
    ReductionStudentListComponent.prototype.onDeleteReduction = function (student, red) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '1000px',
            data: {
                titre: 'Voulez- vous vraiment supprimer la réduction de ' + red.amount + ' pour ' +
                    red.motive.designation + ' de l\'élève ' + student.identity.lastName + ' ' +
                    student.identity.firstName
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.studentComptaService.deleteReduction(student.id, red).subscribe(function (resp) {
                console.log('done!!');
                _this.refresh();
            });
        });
    };
    ReductionStudentListComponent.prototype.getParsedList = function (list) {
        var temp = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var curs = list_1[_i];
            var exist = false;
            for (var _a = 0, temp_1 = temp; _a < temp_1.length; _a++) {
                var old = temp_1[_a];
                if (curs.year.id === old.year.id) {
                    exist = true;
                }
            }
            if (exist === false) {
                temp.push(curs);
            }
        }
        return temp;
    };
    ReductionStudentListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    ReductionStudentListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(reduction_student_form_component_1.ReductionStudentFormComponent, {
            width: '1800px',
            data: { titre: 'Définir une réduction', obj: new studentIdentityBean_1.StudentIdentityBean(), currentSchoolClassId: this.currentSchoolClassId }
        });
        var time = 0;
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            time++;
            console.log("nombre de fois: " + time);
            validationSub.unsubscribe();
            _this.studentComptaService.save(response).subscribe(function (response2) {
                _this.refresh();
            });
        });
    };
    // filter for test autocomplete
    ReductionStudentListComponent.prototype.filter = function () {
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
    ReductionStudentListComponent = __decorate([
        core_1.Component({
            selector: 'app-reduction-student-list',
            templateUrl: './reduction-student-list.component.html',
            styleUrls: ['./reduction-student-list.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], ReductionStudentListComponent);
    return ReductionStudentListComponent;
}());
exports.ReductionStudentListComponent = ReductionStudentListComponent;
