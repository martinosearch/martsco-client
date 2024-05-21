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
exports.StudentFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var passport_1 = require("src/app/id-card-mg/models/passport");
var studentIdentityBean_1 = require("src/app/student-mg/models/studentIdentityBean");
var file_chooser_component_1 = require("../../utilities/file-chooser/file-chooser.component");
var studentCursusBean_1 = require("../models/studentCursusBean");
var studentPassportBean_1 = require("src/app/id-card-mg/models/studentPassportBean");
var StudentFormComponent = /** @class */ (function () {
    function StudentFormComponent(data, form, dialog, civilityService, constanceService, yearService, schoolClassService, studentCursusService, studentIdentityService, studentPassportService) {
        this.data = data;
        this.form = form;
        this.dialog = dialog;
        this.civilityService = civilityService;
        this.constanceService = constanceService;
        this.yearService = yearService;
        this.schoolClassService = schoolClassService;
        this.studentCursusService = studentCursusService;
        this.studentIdentityService = studentIdentityService;
        this.studentPassportService = studentPassportService;
        this.stendentCursusBean = new studentCursusBean_1.StudentCursusBean();
        this.studentIdentityBean = new studentIdentityBean_1.StudentIdentityBean();
        this.studentPassportBean = new studentPassportBean_1.StudentPassportBean;
        this.years = [];
        this.classes = [];
        this.isRedoublant = false;
        this.schooling = 0;
        this.event = new core_1.EventEmitter();
        this.viewHeight = 250;
        this.currentPassportSize = 0;
    }
    StudentFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.viewHeight = window.innerHeight * 0.45;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYearId = resp.id;
            _this.currentYear = resp;
            _this.yearService.getAll().subscribe(function (resp) {
                _this.years = resp;
            });
            _this.schoolClassService.getAll().subscribe(function (resp) {
                _this.classes = resp;
            });
            var currentStudent = _this.data.obj;
            if (currentStudent != undefined) {
                _this.updateStudentIdentities(currentStudent);
                _this.studentCursusService.getCurrentCursus(currentStudent.id, _this.currentYearId).subscribe(function (resp) {
                    _this.updateCursus(resp);
                    _this.studentPassportService.getCurrentPassport(currentStudent.id, _this.currentYearId).subscribe(function (resp) {
                        _this.updatePassport(resp);
                    });
                });
            }
        });
    };
    StudentFormComponent.prototype.updateStudentIdentities = function (resp) {
        if (resp != null) {
            this.studentIdentityBean = resp;
        }
    };
    StudentFormComponent.prototype.updateCursus = function (currentCursus) {
        if (currentCursus != null) {
            if (currentCursus.schooling > 0) {
                this.isRedoublant = true;
            }
            else {
                this.isRedoublant = false;
            }
            this.schooling = currentCursus.schooling;
            if (this.data.currentSchoolClassId != null) {
                this.currentSchoolClassId = this.data.currentSchoolClassId;
            }
            else if (currentCursus.schoolClass !== undefined) {
                this.currentSchoolClassId = currentCursus.schoolClass.id;
            }
        }
    };
    StudentFormComponent.prototype.onResize = function (event) {
        this.viewHeight = window.innerHeight * 0.45;
        console.log("windows resizing::::" + event);
    };
    StudentFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    StudentFormComponent.prototype.onYearChange = function () {
        var _this = this;
        this.currentYear = this.years.filter(function (item) { return item.id === _this.currentYearId; })[0];
    };
    StudentFormComponent.prototype.onSubmit = function () {
        var _this = this;
        // save identity
        console.log("current school class id: " + this.currentSchoolClassId);
        this.schoolClassService.getOne(this.currentSchoolClassId).subscribe(function (sch) {
            _this.studentIdentityService.save(_this.studentIdentityBean, sch).subscribe(function (student) {
                //save cursus
                _this.studentCursusService.save(student, sch, _this.currentYear, _this.schooling).subscribe(function (curs) {
                    //save passport
                    _this.studentPassportService.save(student, _this.currentYear, _this.currentPassport)
                        .subscribe(function (respCurs) {
                        console.log("student passport saved!!");
                        _this.event.emit();
                        _this.form.close();
                    }, function (error) {
                        _this.event.emit();
                        _this.form.close();
                    });
                });
            });
        });
    };
    StudentFormComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    StudentFormComponent.prototype.onIsRedoublant = function () {
        if (this.isRedoublant) {
            this.schooling = 1;
        }
        else {
            this.schooling = 0;
        }
    };
    StudentFormComponent.prototype.calculateBirthYear = function () {
        this.studentIdentityBean.identity.birthday = new Date(Date.now() - (this.studentIdentityBean.identity.age * 24
            * 3600 * 365.25 * 1000));
        console.log('date on initialisation: ' + this.studentIdentityBean.identity.birthday);
    };
    StudentFormComponent.prototype.calculateAge = function () {
        this.studentIdentityBean.identity.age = Math.floor(Math.abs((Date.now() - this.studentIdentityBean.identity.birthday.getTime())
            / (24 * 3600 * 365.25 * 1000)));
    };
    StudentFormComponent.prototype.onChoosePassport = function () {
        var _this = this;
        var dialogRef2 = this.dialog.open(file_chooser_component_1.FileChooserComponent, {
            width: '600px',
            data: { titre: 'Choisir la photo' }
        });
        var validationSub2 = dialogRef2.componentInstance.event.subscribe(function (file) {
            console.log('logo entete is selected');
            var passport = new passport_1.Passport();
            var fileReader = new FileReader();
            fileReader.onload = function () {
                // Store base64 encoded representation of file
                passport.namePassport = file.name;
                passport.sizePassport = file.size;
                passport.contentTypePassport = file.type;
                passport.fileAsBase64Passport = fileReader.result.toString();
                passport.year = _this.currentYear;
                _this.updatePassport(passport);
            };
            fileReader.readAsDataURL(file);
        });
    };
    StudentFormComponent.prototype.updatePassport = function (passport) {
        if (passport != null) {
            this.currentPassport = passport;
            this.passportURL = passport.fileAsBase64Passport;
            this.currentPassportSize = Math.round(this.currentPassport.sizePassport / 1000);
        }
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], StudentFormComponent.prototype, "onResize");
    StudentFormComponent = __decorate([
        core_1.Component({
            selector: 'app-student-form',
            templateUrl: './student-form.component.html',
            styleUrls: ['./student-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], StudentFormComponent);
    return StudentFormComponent;
}());
exports.StudentFormComponent = StudentFormComponent;
