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
exports.SchoolClassChooserFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var class_chooser_model_1 = require("../models/class-chooser-model");
var SchoolClassChooserFormComponent = /** @class */ (function () {
    function SchoolClassChooserFormComponent(data, form, messageService, subjectService, schoolClassSettingService, schoolClassService, yearService, constanceService, expenseService, decoupageService, standardService, evaluationService) {
        this.data = data;
        this.form = form;
        this.messageService = messageService;
        this.subjectService = subjectService;
        this.schoolClassSettingService = schoolClassSettingService;
        this.schoolClassService = schoolClassService;
        this.yearService = yearService;
        this.constanceService = constanceService;
        this.expenseService = expenseService;
        this.decoupageService = decoupageService;
        this.standardService = standardService;
        this.evaluationService = evaluationService;
        this.eventEmitter = new core_1.EventEmitter();
        this.types = [];
        this.schoolClasses = [];
        this.years = [];
        this.expenses = [];
        this.standards = [];
        this.subjectAttribs = [];
        this.decoupages = [];
        this.evaluations = [];
        this.disableYearSelection = false;
        this.yearChooser = false;
        this.expenseChooser = false;
        this.subjectChooser = false;
        this.evaluationChooser = false;
        this.decoupageChooser = false;
        this.standardChooser = false;
        this.schoolClassChooser = true;
        this.singleEval = false;
    }
    SchoolClassChooserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.disableYearSelection = this.data.disableYearSelection !== null ? this.data.disableYearSelection : false;
        this.yearChooser = this.data.yearChooser !== null ? this.data.yearChooser : false;
        this.expenseChooser = this.data.expenseChooser !== null ? this.data.expenseChooser : false;
        this.subjectChooser = this.data.subjectChooser !== null ? this.data.subjectChooser : false;
        this.decoupageChooser = this.data.decoupageChooser !== null ? this.data.decoupageChooser : true;
        this.standardChooser = this.data.standardChooser !== null ? this.data.standardChooser : false;
        this.evaluationChooser = this.data.standardChooser !== null ? this.data.evaluationChooser : false;
        this.singleEval = this.data.singleEval !== null ? this.data.singleEval : false;
        if (this.standardChooser) {
            this.schoolClassChooser = false;
        }
        this.model = new class_chooser_model_1.ClassChooserModel();
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.model.year = resp;
        });
        //year get all
        this.yearService.getAll().subscribe(function (years) {
            _this.years = years;
            _this.yearId = _this.model.year.id;
            _this.schoolClassService.getAll().subscribe(function (schoolClasses) {
                _this.schoolClasses = schoolClasses;
                _this.schoolClassId = schoolClasses.length > 0 ? schoolClasses[0].id : undefined;
                _this.model.schoolClass = schoolClasses[0];
                _this.standardService.getAll().subscribe(function (standards) {
                    _this.standards = standards;
                    _this.standardId = standards.length > 0 ? standards[0].id : undefined;
                    _this.decoupageService.getAll().subscribe(function (decoupages) {
                        _this.decoupages = decoupages;
                        _this.decoupageId = decoupages.length > 0 ? decoupages[0].id : undefined;
                        _this.expenseService.getAll().subscribe(function (expenses) {
                            _this.expenses = expenses;
                            _this.expenseId = expenses.length > 0 ? expenses[0].id : undefined;
                            _this.updateAll();
                        }, function (error) {
                            _this.updateAll();
                        });
                    }, function (error) {
                        _this.updateAll();
                    });
                }, function (error) {
                    _this.updateAll();
                });
            }, function (error) {
                _this.updateAll();
            });
        }, function (error) {
            _this.updateAll();
        });
    };
    SchoolClassChooserFormComponent.prototype.updateAll = function () {
        var _this = this;
        this.refreshYear().subscribe(function (resp) {
            _this.refreshAcademicStandard().subscribe(function (resp) {
                _this.niveau = "AcademicStandard";
                _this.refreshSchoolClass().subscribe(function (resp) {
                    _this.niveau = "schoolclasse";
                    _this.refreshAcademicStandardSettings().subscribe(function (resp) {
                        _this.niveau = "stand setting";
                        _this.refreshSubjectAttribList().subscribe(function (resp) {
                            _this.niveau = "subject attrib list";
                            _this.refreshSelectedSubjectAttribInfo().subscribe(function (resp) {
                                _this.refreshExpense().subscribe(function (resp) {
                                    console.log("I was executed");
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    SchoolClassChooserFormComponent.prototype.refreshYear = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.yearService.getOne(_this.yearId).subscribe(function (year) {
                _this.model.year = year;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
    };
    SchoolClassChooserFormComponent.prototype.refreshAcademicStandard = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            if (_this.standardChooser) {
                _this.standardService.getOne(_this.standardId).subscribe(function (standard) {
                    _this.model.standard = standard;
                    _this.refreshEvaluationsSettings().subscribe(function (resp) {
                        observer.next();
                    });
                }, function (error) {
                    _this.refreshEvaluationsSettings().subscribe(function (resp) {
                        observer.next();
                    });
                });
            }
            else {
                _this.refreshEvaluationsSettings().subscribe(function (resp) {
                    observer.next();
                });
            }
        });
    };
    SchoolClassChooserFormComponent.prototype.refreshSchoolClass = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            if (_this.schoolClassChooser) {
                _this.schoolClassService.getOne(_this.schoolClassId).subscribe(function (schoolClass) {
                    _this.model.schoolClass = schoolClass;
                    _this.model.standard = schoolClass.standard;
                    _this.standardId = schoolClass.standard.id;
                    _this.refreshAcademicStandard().subscribe(function (resp) {
                        observer.next();
                    });
                }, function (error) {
                    observer.next();
                });
            }
            else {
                observer.next();
            }
        });
    };
    SchoolClassChooserFormComponent.prototype.refreshEvaluationsSettings = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            if (_this.evaluationChooser) {
                _this.evaluationService.findEvaluationOfThisTrimestre(_this.decoupageId, _this.model.year.id).subscribe(function (resp) {
                    _this.evaluations = resp;
                    observer.next();
                });
            }
            else {
                observer.next();
            }
        });
    };
    SchoolClassChooserFormComponent.prototype.refreshAcademicStandardSettings = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            if (_this.standardChooser || _this.schoolClassChooser) {
                _this.standardService.getAcademicStandardBullResultModel(_this.standardId).subscribe(function (respSetBean) {
                    _this.standardService.getCurrentSetting(respSetBean, _this.yearId).subscribe(function (setting) {
                        _this.currentStandardSetting = setting;
                        // filter decoupage
                        _this.refreshDecoupageList().subscribe(function (resp) {
                            _this.refreshEvaluationsSettings().subscribe(function (resp) {
                                observer.next();
                            });
                        }, function (error) {
                            _this.refreshEvaluationsSettings().subscribe(function (resp) {
                                observer.next();
                            });
                        });
                    }, function (error) {
                        _this.refreshEvaluationsSettings().subscribe(function (resp) {
                            observer.next();
                        });
                    });
                });
            }
            else {
                observer.next();
            }
        });
    };
    SchoolClassChooserFormComponent.prototype.refreshDecoupageList = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            if (_this.decoupageChooser) {
                _this.decoupageService.getAll().subscribe(function (resp) {
                    if (_this.currentStandardSetting !== undefined) {
                        // console.log("decoupage type according to setting: " + this.currentStandardSetting.decoupageType.designation);
                        if (_this.currentStandardSetting.decoupageType.designation.charAt(0).toLowerCase() === "s") {
                            _this.decoupages = resp.filter(function (item) { return (item.index <= 2); });
                        }
                        else {
                            _this.decoupages = resp;
                        }
                    }
                    else {
                        _this.messageService.showAlertMessage("Vous devez faire les configurations de ce niveau d'enseignement!");
                    }
                    console.log("decoupage list size: " + _this.decoupages.length);
                    if (_this.decoupageId !== undefined) {
                        if (_this.model.decoupage !== undefined) {
                            _this.decoupageId = _this.model.decoupage.index <= _this.decoupages.length ?
                                _this.decoupageId : _this.decoupages[0].id;
                        }
                        else {
                            _this.decoupageId = _this.decoupages[0].id;
                        }
                        _this.refreshDecoupage().subscribe(function (resp) {
                            observer.next();
                        }, function (error) {
                            observer.next();
                        });
                    }
                    else {
                        _this.decoupageId = _this.decoupages[0].id;
                        _this.refreshDecoupage().subscribe(function (resp) {
                            observer.next();
                        }, function (error) {
                            observer.next();
                        });
                    }
                }, function (error) {
                    _this.decoupageId = _this.decoupages[0].id;
                    _this.refreshDecoupage().subscribe(function (resp) {
                        observer.next();
                    }, function (error) {
                        observer.next();
                    });
                });
            }
            else {
                observer.next();
            }
        });
    };
    SchoolClassChooserFormComponent.prototype.refreshDecoupage = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            if (_this.decoupageChooser) {
                _this.decoupageService.getOne(_this.decoupageId).subscribe(function (decoupage) {
                    _this.model.decoupage = decoupage;
                    //  console.log("je suis executé: " + JSON.stringify(this.model.decoupage));
                    observer.next();
                }, function (error) {
                    observer.next();
                });
            }
            else {
                observer.next();
            }
        });
    };
    SchoolClassChooserFormComponent.prototype.refreshExpense = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            if (_this.expenseChooser) {
                _this.expenseService.getOne(_this.expenseId).subscribe(function (expense) {
                    _this.model.expense = expense;
                    observer.next();
                }, function (error) {
                    observer.next();
                });
            }
            else {
                observer.next();
            }
        });
    };
    SchoolClassChooserFormComponent.prototype.refreshSubjectAttribList = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            if (_this.subjectChooser) {
                _this.schoolClassSettingService.findSubjectBean(_this.schoolClassId).subscribe(function (resp) {
                    _this.schoolClassSettingService.findSubjAttributions(resp, _this.yearId).subscribe(function (respAttrib) {
                        _this.subjectAttribs = respAttrib;
                        // change current subject or not
                        var changeIndex = true;
                        for (var _i = 0, _a = _this.subjectAttribs; _i < _a.length; _i++) {
                            var attrib = _a[_i];
                            if (_this.subjectId !== undefined) {
                                if (attrib.subject.id === _this.subjectId) {
                                    changeIndex = false;
                                }
                            }
                        }
                        if (changeIndex) {
                            if (_this.subjectAttribs.length > 0) {
                                _this.subjectId = _this.subjectAttribs[0].subject.id;
                            }
                        }
                        observer.next();
                    });
                });
            }
            else {
                observer.next();
            }
        });
    };
    SchoolClassChooserFormComponent.prototype.refreshSelectedSubjectAttribInfo = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            if (_this.subjectChooser) {
                _this.subjectService.getOne(_this.subjectId).subscribe(function (subject) {
                    // subj
                    _this.model.subject = subject;
                    // set charge
                    var currentAttrib = _this.subjectAttribs.filter(function (attrib) { return (attrib.year.id === _this.yearId && attrib.subject.id === _this.subjectId); })[0];
                    _this.model.charge = currentAttrib !== undefined ? currentAttrib.employee : undefined;
                    observer.next();
                    console.log("prof charge: " + _this.model.charge);
                }, function (error) {
                    observer.next();
                });
            }
            else {
                observer.next();
            }
        });
    };
    SchoolClassChooserFormComponent.prototype.ngOnDestroy = function () {
    };
    SchoolClassChooserFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    SchoolClassChooserFormComponent.prototype.onSubmit = function () {
        this.updateAll();
        if (this.selectedEvaluationId === undefined) {
            this.model.selectedEvaluationId = 0;
        }
        else {
            this.model.selectedEvaluationId = this.selectedEvaluationId;
        }
        this.eventEmitter.emit(this.model);
        this.form.close();
    };
    SchoolClassChooserFormComponent = __decorate([
        core_1.Component({
            selector: 'app-class-chooser-form',
            templateUrl: './class-chooser-form.component.html',
            styleUrls: ['./class-chooser-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], SchoolClassChooserFormComponent);
    return SchoolClassChooserFormComponent;
}());
exports.SchoolClassChooserFormComponent = SchoolClassChooserFormComponent;
