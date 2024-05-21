"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RepartionManuelleComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var studentIdentityBean_1 = require("src/app/student-mg/models/studentIdentityBean");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var class_chooser_form_component_1 = require("../../establishment/school-class-chooser-form/class-chooser-form.component");
var student_form_component_1 = require("../student-form/student-form.component");
var RepartionManuelleComponent = /** @class */ (function () {
    function RepartionManuelleComponent(dialog, studentCursusService, studentIdentityService, authService, messageService, employeeService, progressService, snackBar, actionService, yearService, constanceService, comptaReportingService) {
        this.dialog = dialog;
        this.studentCursusService = studentCursusService;
        this.studentIdentityService = studentIdentityService;
        this.authService = authService;
        this.messageService = messageService;
        this.employeeService = employeeService;
        this.progressService = progressService;
        this.snackBar = snackBar;
        this.actionService = actionService;
        this.yearService = yearService;
        this.constanceService = constanceService;
        this.comptaReportingService = comptaReportingService;
        this.displayedColumns = ['num', 'nom', 'prenom', 'sex'];
        // for autocomplete
        this.studentControl = new forms_1.FormControl();
        this.studentIdentityList = [];
        this.studentCursusList = [];
        this.listStudentThisClass = [];
        this.studentFilteredList = [];
        this.currentStudentIdentityBean = new studentIdentityBean_1.StudentIdentityBean();
        this.filterText = "";
    }
    RepartionManuelleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.setCurrentSection("Redistribution des élèves");
        var dialogRef = this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
            width: '600px',
            data: { titre: 'Choisir la classe d\'accueil' }
        });
        dialogRef.componentInstance.eventEmitter.subscribe(function (resp) {
            _this.currentYear = resp.year;
            _this.currentSchoolClass = resp.schoolClass;
            _this.refreshThisClass();
            _this.refreshHoleSchool();
        });
    };
    RepartionManuelleComponent.prototype.onModifierClassActuelle = function () {
        var _this = this;
        var dialogRef = this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
            width: '600px',
            data: { titre: 'Choisir la classe d\'accueil' }
        });
        dialogRef.componentInstance.eventEmitter.subscribe(function (resp) {
            _this.currentSchoolClass = resp.schoolClass;
            _this.refreshThisClass();
        });
    };
    RepartionManuelleComponent.prototype.refreshHoleSchool = function () {
        var _this = this;
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            // getting list of hole students
            _this.studentCursusService.getAllByYear(_this.currentYear.id).subscribe(function (respAll) {
                _this.studentCursusList = respAll;
                _this.studentIdentityService.getStudentIdentities(respAll).subscribe(function (respIds) {
                    _this.studentIdentityList = respIds;
                    _this.effectif = respIds.length;
                    _this.studentFilteredList = respIds;
                    _this.onFilterStudent();
                    _this.actionService.stopWaiting(progressId);
                });
            });
        });
    };
    RepartionManuelleComponent.prototype.refreshThisClass = function () {
        var _this = this;
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            _this.studentCursusService.getAllByClass(_this.currentSchoolClass.id, _this.currentYear.id)
                .subscribe(function (resp) {
                _this.studentIdentityService.getStudentIdentities(resp).subscribe(function (respIds) {
                    _this.listStudentThisClass = respIds;
                    _this.actionService.stopWaiting(progressId);
                });
            });
        });
    };
    RepartionManuelleComponent.prototype.onFilterStudent = function () {
        console.log("filter text: " + this.filterText);
        if (typeof this.filterText === 'string') {
            var filterValue_1 = this.filterText.toLowerCase();
            this.studentFilteredList = this.studentIdentityList.filter(function (option) {
                return (option.identity.lastName + ' ' + option.identity.firstName).toLowerCase().includes(filterValue_1);
            });
        }
        else {
            this.refreshCurrentStudent(this.filterText);
        }
    };
    RepartionManuelleComponent.prototype.refreshCurrentStudent = function (student) {
        var _this = this;
        this.currentStudentIdentityBean = student;
        if (student.id !== undefined) {
            this.studentCursusService.getCurrentCursusFromList(this.studentCursusList, this.currentStudentIdentityBean.id, this.currentYear.id).subscribe(function (rsp) {
                _this.currentStudentSchoolClass = rsp.schoolClass;
            });
        }
        else {
            this.messageService.showAlertMessage("Veuillez choisir un apprenant!");
        }
    };
    RepartionManuelleComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    // this display filtered objet in the autocomplete component
    RepartionManuelleComponent.prototype.displayStudent = function (obj) {
        if (obj !== null && obj !== undefined) {
            if (obj.identity !== undefined) {
                if (obj.identity.lastName !== undefined) {
                    var name = obj.identity.lastName;
                    if (obj.identity.lastName !== undefined) {
                        name += ' ' + obj.identity.firstName;
                    }
                    return name;
                }
            }
        }
        return undefined;
    };
    RepartionManuelleComponent.prototype.onStudentSubmit = function () {
        var _this = this;
        if (this.currentStudentIdentityBean.id === undefined) {
            var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
                width: '600px',
                data: { titre: 'Cet élève n\'existe pas. Voulez- vous l\'ajouter?' }
            });
            dialogRef.componentInstance.event.subscribe(function (resp) {
                var dialogStudentRef = _this.dialog.open(student_form_component_1.StudentFormComponent, {
                    width: '1000px',
                    data: { titre: 'Ajouter un élève' }
                });
                dialogStudentRef.componentInstance.event.subscribe(function (newStudent) {
                    _this.refreshThisClass();
                    _this.refreshHoleSchool();
                    _this.effectif++;
                });
            });
        }
        else {
            this.progressService.getNewProgressId().subscribe(function (progressId) {
                _this.actionService.launchWaiting(progressId);
                _this.studentIdentityService.save(_this.currentStudentIdentityBean, _this.currentSchoolClass).subscribe(function (respId) {
                    _this.refreshHoleSchool();
                    _this.studentCursusService.save(_this.currentStudentIdentityBean, _this.currentSchoolClass, _this.currentYear, 0).subscribe(function (resp) {
                        _this.refreshThisClass();
                        _this.refreshHoleSchool();
                        _this.reInit();
                        _this.actionService.stopWaiting(progressId);
                    });
                });
            });
        }
    };
    RepartionManuelleComponent.prototype.reInit = function () {
        this.filterText = "";
        this.currentStudentIdentityBean = new studentIdentityBean_1.StudentIdentityBean();
        this.currentStudentSchoolClass = undefined;
    };
    RepartionManuelleComponent.prototype.onModifierInfo = function () {
        var _this = this;
        var data = Object.assign({}, this.currentStudentIdentityBean);
        var dialogRef = this.dialog.open(student_form_component_1.StudentFormComponent, {
            width: '1000px',
            data: { titre: 'Modifier', obj: data }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refreshHoleSchool();
        });
    };
    RepartionManuelleComponent = __decorate([
        core_1.Component({
            selector: 'app-repartion-manuelle',
            templateUrl: './repartion-manuelle.component.html',
            styleUrls: ['./repartion-manuelle.component.scss']
        })
    ], RepartionManuelleComponent);
    return RepartionManuelleComponent;
}());
exports.RepartionManuelleComponent = RepartionManuelleComponent;
