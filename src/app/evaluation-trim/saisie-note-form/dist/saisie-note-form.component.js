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
exports.SaisieNoteFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var mark_1 = require("src/app/evaluation-trim/models/mark");
var SaisieNoteFormComponent = /** @class */ (function () {
    function SaisieNoteFormComponent(data, form, studentCursusService, studentIdentityService, evaluationService, studentEvaluationService, messageService, formBuilder) {
        this.data = data;
        this.form = form;
        this.studentCursusService = studentCursusService;
        this.studentIdentityService = studentIdentityService;
        this.evaluationService = evaluationService;
        this.studentEvaluationService = studentEvaluationService;
        this.messageService = messageService;
        this.formBuilder = formBuilder;
        this.studentIdenditiesList = [];
        this.markBeanList = [];
        // express
        this.express = false;
        //note fields
        this.showNote1 = true;
        this.showNote2 = true;
        this.showNote3 = true;
        this.showNote4 = true;
        this.enableNote1 = true;
        this.enableNote2 = true;
        this.enableNote3 = true;
        this.enableNote4 = true;
        // enseignant
        this.chargeName = "";
        // decoupage
        this.decoupage = 1;
        this.isFirst = true;
        this.isLast = false;
        this.studentIndex = 0;
        this.total = 0;
        this.noteMax = 20;
        this.evaluations = [];
    }
    SaisieNoteFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.chooserModel = this.data.chooserModel;
        this.express = this.data.express;
        this.chargeName =
            this.chooserModel.charge != undefined
                ? this.define(this.chooserModel.charge)
                : "";
        // in case of express
        this.evaluationService.findEvaluationOfThisTrimestre(this.chooserModel.decoupage.id, this.chooserModel.year.id).subscribe({
            next: function (resp) {
                _this.evaluations = resp;
                _this.evaluationService
                    .findEvaluationSettings(_this.chooserModel.schoolClass.id, _this.chooserModel.year.id)
                    .subscribe(function (evalSetting) {
                    _this.currentEvalSetting = evalSetting;
                    //refresh setting
                    if (_this.express) {
                        _this.updateEvaluation();
                    }
                    else {
                        if (_this.chooserModel.decoupage.index === 3) {
                            _this.eval1 = _this.currentEvalSetting.eval31;
                            _this.eval2 = _this.currentEvalSetting.eval32;
                            _this.eval3 = _this.currentEvalSetting.eval33;
                            _this.eval4 = _this.currentEvalSetting.eval34;
                        }
                        else if (_this.chooserModel.decoupage.index === 2) {
                            _this.eval1 = _this.currentEvalSetting.eval21;
                            _this.eval2 = _this.currentEvalSetting.eval22;
                            _this.eval3 = _this.currentEvalSetting.eval23;
                            _this.eval4 = _this.currentEvalSetting.eval24;
                        }
                        else {
                            _this.eval1 = _this.currentEvalSetting.eval11;
                            _this.eval2 = _this.currentEvalSetting.eval12;
                            _this.eval3 = _this.currentEvalSetting.eval13;
                            _this.eval4 = _this.currentEvalSetting.eval14;
                        }
                    }
                    // field to be shown
                    _this.showNote1 = _this.eval1 ? true : false;
                    _this.showNote2 = (_this.eval2 && !_this.express) ? true : false;
                    _this.showNote3 = (_this.eval3 && !_this.express) ? true : false;
                    _this.showNote4 = (_this.eval4 && !_this.express) ? true : false;
                    // **********************************************************************
                    _this.studentCursusService
                        .getAllByClass(_this.chooserModel.schoolClass.id, _this.chooserModel.year.id)
                        .subscribe(function (cursList) {
                        _this.total = cursList.length;
                        //get student identities
                        _this.studentIdentityService
                            .getStudentIdentities(cursList)
                            .subscribe(function (idsList) {
                            _this.studentIdenditiesList = idsList;
                            _this.studentEvaluationService
                                .findAllByClass(cursList)
                                .subscribe(function (mlist) {
                                //console.log("map:::::" + JSON.stringify(map));
                                _this.markBeanList = mlist;
                                _this.setCurrentStudent(_this.studentIndex);
                                _this.onFocusFirst();
                            });
                        });
                    });
                });
            }
        });
    };
    SaisieNoteFormComponent.prototype.updateEvaluation = function () {
        var _this = this;
        if (this.evaluationId === undefined) {
            this.evaluationId = this.evaluations[0].id;
        }
        this.eval1 = this.evaluations.filter(function (item) { return item.id === _this.evaluationId; })[0];
        this.setCurrentStudent(0);
    };
    SaisieNoteFormComponent.prototype.initForm = function () {
        this.markForm = this.formBuilder.group({
            note1: new forms_1.FormControl("", [forms_1.Validators.max(this.noteMax)]),
            note2: new forms_1.FormControl("", [forms_1.Validators.max(this.noteMax)]),
            note3: new forms_1.FormControl("", [forms_1.Validators.max(this.noteMax)]),
            note4: new forms_1.FormControl("", [forms_1.Validators.max(this.noteMax)])
        });
    };
    SaisieNoteFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    SaisieNoteFormComponent.prototype.setCurrentStudent = function (studentIndex) {
        var _this = this;
        if (studentIndex === 0) {
            this.isFirst = true;
            this.isLast = false;
        }
        else if (studentIndex === this.total - 1) {
            this.isLast = true;
            this.isFirst = false;
        }
        else {
            this.isFirst = false;
            this.isLast = false;
        }
        this.currentStudent = this.studentIdenditiesList[studentIndex];
        this.currentMarkBean = this.markBeanList.filter(function (item) { return item.id === _this.currentStudent.id; })[0];
        // console.log(JSON.stringify(this.currentMarkBean.marks));
        //update marks
        if (this.eval1 !== null) {
            this.studentEvaluationService
                .findMark(this.eval1.id, this.chooserModel.subject.id, this.currentMarkBean)
                .subscribe(function (resp) {
                // console.log('note 1 finded !!!!!!: ' + resp);
                _this.markForm.patchValue({ note1: resp });
            });
        }
        if (this.eval2 !== null && !this.express) {
            this.studentEvaluationService
                .findMark(this.eval2.id, this.chooserModel.subject.id, this.currentMarkBean)
                .subscribe(function (resp) {
                //  console.log('note 2 finded !!!!!!: ' + resp);
                _this.markForm.patchValue({ note2: resp });
            });
        }
        if (this.eval3 !== null && !this.express) {
            this.studentEvaluationService
                .findMark(this.eval3.id, this.chooserModel.subject.id, this.currentMarkBean)
                .subscribe(function (resp) {
                //  console.log('note 3 finded !!!!!!: ' + resp);
                _this.markForm.patchValue({ note3: resp });
            });
        }
        if (this.eval4 !== null && !this.express) {
            this.studentEvaluationService
                .findMark(this.eval4.id, this.chooserModel.subject.id, this.currentMarkBean)
                .subscribe(function (resp) {
                // console.log('note 4 finded !!!!!!: ' + resp);
                _this.markForm.patchValue({ note4: resp });
            });
        }
    };
    SaisieNoteFormComponent.prototype.onEvaluationChange = function () {
        this.updateEvaluation();
    };
    SaisieNoteFormComponent.prototype.next = function () {
        this.studentIndex++;
        this.setCurrentStudent(this.studentIndex);
    };
    SaisieNoteFormComponent.prototype.previous = function () {
        this.studentIndex--;
        this.setCurrentStudent(this.studentIndex);
    };
    SaisieNoteFormComponent.prototype.toLast = function () {
        this.studentIndex = this.total - 1;
        this.setCurrentStudent(this.studentIndex);
    };
    SaisieNoteFormComponent.prototype.toFirst = function () {
        this.studentIndex = 0;
        this.setCurrentStudent(this.studentIndex);
    };
    SaisieNoteFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var stagedStudent = this.currentMarkBean;
        //list mark
        var tempListMarks = [];
        tempListMarks.push(new mark_1.Mark(this.eval1, this.chooserModel.subject, this.markForm.value["note1"]));
        if (!this.express) {
            tempListMarks.push(new mark_1.Mark(this.eval2, this.chooserModel.subject, this.markForm.value["note2"]));
            tempListMarks.push(new mark_1.Mark(this.eval3, this.chooserModel.subject, this.markForm.value["note3"]));
            tempListMarks.push(new mark_1.Mark(this.eval4, this.chooserModel.subject, this.markForm.value["note4"]));
        }
        // this to remove eventual old value of marks
        var stagedListMarks = stagedStudent.marks.filter(function (item) {
            for (var _i = 0, tempListMarks_2 = tempListMarks; _i < tempListMarks_2.length; _i++) {
                var mark = tempListMarks_2[_i];
                if (mark.evaluation !== null && mark.subject !== null) {
                    if (item.evaluation !== null && item.subject !== null) {
                        if (mark.evaluation.id === item.evaluation.id && mark.subject.id === item.subject.id) {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }
            }
            return true;
        });
        // then this to push new marks
        for (var _i = 0, tempListMarks_1 = tempListMarks; _i < tempListMarks_1.length; _i++) {
            var mark = tempListMarks_1[_i];
            if (mark.evaluation !== null) {
                stagedListMarks.push(mark);
            }
        }
        // set new marks list to this student
        this.currentMarkBean.marks = stagedListMarks;
        this.studentEvaluationService
            .saveMark(this.currentMarkBean)
            .subscribe(function (resp) {
            //update index
            if (_this.studentIndex < _this.total - 1) {
                _this.studentIndex++;
                //on rafraichi les données
                _this.setCurrentStudent(_this.studentIndex);
            }
            else {
                _this.messageService.showAlertMessage("Terminé!");
            }
            _this.onFocusFirst();
            _this.updateMarks(resp);
        });
    };
    SaisieNoteFormComponent.prototype.updateMarks = function (student) {
        var tempList = this.markBeanList.filter(function (item) { return item.id !== student.id; });
        tempList.push(student);
        this.markBeanList = tempList;
    };
    //focus first
    SaisieNoteFormComponent.prototype.onFocusFirst = function () {
        if (this.showNote1) {
            if (this.firstNote !== undefined) {
                if (this.firstNote.nativeElement !== undefined) {
                    this.firstNote.nativeElement.focus();
                    this.firstNote.nativeElement.select();
                }
            }
        }
        else if (this.showNote2) {
            if (this.secondNote !== undefined) {
                if (this.secondNote.nativeElement !== undefined) {
                    this.secondNote.nativeElement.focus();
                    this.secondNote.nativeElement.select();
                }
            }
        }
        else if (this.showNote3) {
            if (this.thirdNote !== undefined) {
                if (this.thirdNote.nativeElement !== undefined) {
                    this.thirdNote.nativeElement.focus();
                    this.thirdNote.nativeElement.select();
                }
            }
        }
        else if (this.showNote4) {
            if (this.fourthNote !== undefined) {
                if (this.fourthNote.nativeElement !== undefined) {
                    this.fourthNote.nativeElement.select();
                    this.fourthNote.nativeElement.focus();
                }
            }
        }
    };
    SaisieNoteFormComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) {
            var date = new Date();
            setTimeout(function () {
                resolve(date);
            }, ms);
        });
    };
    SaisieNoteFormComponent.prototype.define = function (charge) {
        var name = "";
        if (charge.identity) {
            if (charge.identity.lastName && charge.identity.firstName) {
                name = charge.identity.lastName + " " + charge.identity.firstName;
            }
            else if (charge.identity.lastName) {
                name = charge.identity.lastName;
            }
            else if (charge.identity.firstName) {
                name = charge.identity.firstName;
            }
        }
        return name;
    };
    __decorate([
        core_1.ViewChild("firstNote", { static: false })
    ], SaisieNoteFormComponent.prototype, "firstNote");
    __decorate([
        core_1.ViewChild("secondNote", { static: false })
    ], SaisieNoteFormComponent.prototype, "secondNote");
    __decorate([
        core_1.ViewChild("thirdNote", { static: false })
    ], SaisieNoteFormComponent.prototype, "thirdNote");
    __decorate([
        core_1.ViewChild("fourthNote", { static: false })
    ], SaisieNoteFormComponent.prototype, "fourthNote");
    SaisieNoteFormComponent = __decorate([
        core_1.Component({
            selector: "app-saisie-note-form",
            templateUrl: "./saisie-note-form.component.html",
            styleUrls: ["./saisie-note-form.component.scss"]
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], SaisieNoteFormComponent);
    return SaisieNoteFormComponent;
}());
exports.SaisieNoteFormComponent = SaisieNoteFormComponent;
