"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RepartionComponent = void 0;
var core_1 = require("@angular/core");
var studentIdentityBean_1 = require("src/app/student-mg/models/studentIdentityBean");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var rxjs_1 = require("rxjs");
var RepartionComponent = /** @class */ (function () {
    function RepartionComponent(constanceService, yearService, standardService, schoolClasseService, resultAnnuelDataService, actionService, progressService, studentCursusService, studentIdentityService, messageService, dialog) {
        this.constanceService = constanceService;
        this.yearService = yearService;
        this.standardService = standardService;
        this.schoolClasseService = schoolClasseService;
        this.resultAnnuelDataService = resultAnnuelDataService;
        this.actionService = actionService;
        this.progressService = progressService;
        this.studentCursusService = studentCursusService;
        this.studentIdentityService = studentIdentityService;
        this.messageService = messageService;
        this.dialog = dialog;
        this.years = [];
        this.standards = [];
        this.classes = [];
        this.filteredClasses = [];
        this.results = [];
        this.filteredStudentList = [];
        this.studentCursuBeanList = [];
        this.currentStudentIdBean = new studentIdentityBean_1.StudentIdentityBean();
        this.indexStudent = 0;
        this.yearChange = 0;
        this.displayedColumns = [
            'num',
            'name',
        ];
        this.listAdmis = true;
        this.actualized = false;
        this.sendAll = false;
        this.notPreInitialised = true;
    }
    RepartionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.yearChange = 0;
        this.constanceService.currentYearSubject.subscribe(function (respYear) {
            _this.currentYear = respYear;
            _this.currentYearId = _this.currentYear.id;
            _this.yearService.getAll().subscribe(function (resp) {
                _this.years = resp;
                _this.previousYear = _this.years[0];
                _this.previousYearId = _this.previousYear.id;
                _this.standardService.getAll().subscribe(function (resp) {
                    _this.standards = resp;
                    _this.currentStandardId = _this.standards[0].id;
                    _this.schoolClasseService.getAll().subscribe(function (resp) {
                        _this.classes = resp;
                        _this.filteredClass();
                        _this.previousSchoolClassId = _this.classes[0].id;
                        _this.setPreInitialized();
                        _this.yearChange++;
                    });
                });
            });
        });
    };
    RepartionComponent.prototype.filteredClass = function () {
        var _this = this;
        this.filteredClasses = this.classes.filter(function (elmt) { return (elmt.standard.id === _this.currentStandardId); });
    };
    RepartionComponent.prototype.refresh = function (option) {
        var _this = this;
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            _this.studentCursusService.getAllByClass(_this.previousSchoolClassId, _this.previousYearId).subscribe(function (respCurs) {
                _this.studentCursuBeanList = respCurs;
                if (option === true) {
                    _this.loadListAdmis().subscribe(function (resp) {
                        _this.actualized = true;
                        _this.actionService.stopWaiting(progressId);
                    });
                }
                else {
                    _this.loadListAjournes().subscribe(function (resp) {
                        _this.actualized = true;
                        _this.actionService.stopWaiting(progressId);
                    });
                }
                _this.indexStudent = 0;
            });
        });
    };
    RepartionComponent.prototype.loadListAdmis = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                _this.resultAnnuelDataService.getAllAdmis(_this.previousYearId, _this.previousSchoolClassId).subscribe(function (resp) {
                    console.log("taille result admis: " + _this.results.length);
                    _this.results = resp;
                    var tempListStudent = _this.results.map(function (elmt) {
                        return elmt.student;
                    });
                    //filter those who are already treated
                    _this.filteredStudentList = tempListStudent.filter(function (st) {
                        var studentCursBean = _this.findCursBean(_this.studentCursuBeanList, st.id);
                        var exists = false;
                        for (var _i = 0, _a = studentCursBean.cursuses; _i < _a.length; _i++) {
                            var curs = _a[_i];
                            if (curs.year !== null && curs.year !== undefined) {
                                if (curs.year.id === _this.currentYearId) {
                                    exists = true;
                                }
                            }
                        }
                        return !exists;
                    });
                    if (_this.filteredStudentList.length > 0) {
                        _this.currentStudentIdBean = _this.filteredStudentList[0];
                    }
                    else {
                        _this.currentStudentIdBean = new studentIdentityBean_1.StudentIdentityBean();
                    }
                    observer.next(true);
                }, function (error) {
                    _this.messageService.showErrorMessage(error.error.message);
                    observer.next(true);
                });
            });
        });
    };
    RepartionComponent.prototype.findCursBean = function (studentCursuBeanList, id) {
        return studentCursuBeanList.filter(function (item) { return item.id === id; })[0];
    };
    RepartionComponent.prototype.loadListAjournes = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                _this.resultAnnuelDataService.getAllAjournes(_this.previousYearId, _this.previousSchoolClassId).subscribe(function (resp) {
                    console.log("taille result: " + _this.results.length);
                    _this.results = resp;
                    var tempListStudent = _this.results.map(function (elmt) {
                        return elmt.student;
                    });
                    _this.filteredStudentList = tempListStudent.filter(function (st) {
                        var studentCursBean = _this.findCursBean(_this.studentCursuBeanList, st.id);
                        var exists = false;
                        for (var _i = 0, _a = studentCursBean.cursuses; _i < _a.length; _i++) {
                            var curs = _a[_i];
                            if (curs.year !== null && curs.year !== undefined) {
                                if (curs.year.id === _this.currentYearId) {
                                    exists = true;
                                }
                            }
                        }
                        return !exists;
                    });
                    if (_this.filteredStudentList.length > 0) {
                        _this.currentStudentIdBean = _this.filteredStudentList[0];
                    }
                    else {
                        _this.currentStudentIdBean = new studentIdentityBean_1.StudentIdentityBean();
                    }
                    observer.next(true);
                }, function (error) {
                    _this.messageService.showErrorMessage("liste introuvable!");
                    observer.next(true);
                });
            });
        });
    };
    RepartionComponent.prototype.setClasse = function (classe) {
        var _this = this;
        console.log("Classe d'accueil: " + classe.designation);
        var dialogRef;
        if (this.sendAll) {
            dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
                width: '600px',
                data: {
                    titre: "Voulez- vous vraiment introduire tous les apprenants de cette classe à un instant?"
                }
            });
        }
        else {
            dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
                width: '600px',
                data: {
                    titre: "Voulez- vous vraiment introduire l'apprenant: " +
                        this.currentStudentIdBean.identity.lastName + " "
                        + this.currentStudentIdBean.identity.firstName
                        + " en " + classe.designation + " ?"
                }
            });
        }
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                _this.actionService.launchWaiting(progressId);
                if (_this.sendAll) {
                    var tempList = _this.filteredStudentList;
                    var count_1 = 0;
                    var _loop_1 = function (student) {
                        console.log("current student: " + student.identity.lastName);
                        _this.sleep(500).then(function () {
                            _this.saveStudent(student, classe).subscribe(function (resp) {
                                _this.filteredStudentList = _this.filteredStudentList.filter(function (elmt) { return (elmt.id !== student.id); });
                                count_1++;
                                console.log(count_1 + " student: " + resp.id);
                                if (_this.filteredStudentList.length === 0) {
                                    _this.actionService.stopWaiting(progressId);
                                    _this.currentStudentIdBean = undefined;
                                    _this.messageService.showAlertMessage("Terminé !");
                                }
                            });
                        });
                    };
                    for (var _i = 0, tempList_1 = tempList; _i < tempList_1.length; _i++) {
                        var student = tempList_1[_i];
                        _loop_1(student);
                    }
                }
                else {
                    console.log("single send");
                    _this.saveStudent(_this.currentStudentIdBean, classe).subscribe(function (resp) {
                        // remove this student
                        _this.filteredStudentList = _this.filteredStudentList.filter(function (elmt) { return (elmt.id !== _this.currentStudentIdBean.id); });
                        _this.actionService.stopWaiting(progressId);
                        if (_this.filteredStudentList.length > 0) {
                            _this.setCurrentStudent(0);
                        }
                        else {
                            _this.currentStudentIdBean = undefined;
                            _this.messageService.showAlertMessage("Terminé !");
                        }
                    });
                }
            });
        });
    };
    RepartionComponent.prototype.saveStudent = function (student, classe) {
        return this.studentCursusService.save(student, classe, this.currentYear, 0);
    };
    RepartionComponent.prototype.nextStudent = function () {
        if (this.indexStudent + 1 < this.filteredStudentList.length) {
            this.indexStudent++;
            this.setCurrentStudent(this.indexStudent);
        }
        else {
            this.currentStudentIdBean = undefined;
            this.messageService.showAlertMessage("Terminé !");
        }
    };
    RepartionComponent.prototype.setCurrentStudent = function (indexStudent) {
        this.currentStudentIdBean = this.filteredStudentList[indexStudent];
    };
    RepartionComponent.prototype.previousStudent = function () {
        if (this.indexStudent > 0) {
            this.indexStudent--;
            this.setCurrentStudent(this.indexStudent);
        }
    };
    RepartionComponent.prototype.previousYearChange = function () {
        var _this = this;
        this.yearService.getOne(this.previousYearId).subscribe(function (resp) {
            _this.previousYearId = resp.id;
            _this.actualized = false;
            _this.setPreInitialized();
        });
    };
    RepartionComponent.prototype.previousClassChange = function () {
        this.actualized = false;
        this.setPreInitialized();
    };
    RepartionComponent.prototype.accueilChange = function () {
        this.filteredClass();
        this.setPreInitialized();
    };
    RepartionComponent.prototype.typeListChange = function () {
        this.actualized = false;
        this.setPreInitialized();
    };
    RepartionComponent.prototype.canChooseClass = function () {
        return !this.notPreInitialised && this.currentStudentIdBean !== undefined;
    };
    RepartionComponent.prototype.setPreInitialized = function () {
        console.log("setPreInitialized");
        this.notPreInitialised = this.previousYearId === undefined || this.currentYearId === this.previousYearId;
    };
    RepartionComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) {
            var date = new Date();
            setTimeout(function () {
                resolve(date);
            }, ms);
        });
    };
    RepartionComponent = __decorate([
        core_1.Component({
            selector: 'app-repartion',
            templateUrl: './repartion.component.html',
            styleUrls: ['./repartion.component.scss']
        })
    ], RepartionComponent);
    return RepartionComponent;
}());
exports.RepartionComponent = RepartionComponent;
