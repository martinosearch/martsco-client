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
exports.SubjectAttributionComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var subject_attribution_1 = require("src/app/subject-mg/models/subject-attribution");
var SubjectAttributionComponent = /** @class */ (function () {
    function SubjectAttributionComponent(auth, data, messageService, dialog, form, subjectService, schoolClassSettingService, schoolClassService, constanceService, employeeService, yearService) {
        this.auth = auth;
        this.data = data;
        this.messageService = messageService;
        this.dialog = dialog;
        this.form = form;
        this.subjectService = subjectService;
        this.schoolClassSettingService = schoolClassSettingService;
        this.schoolClassService = schoolClassService;
        this.constanceService = constanceService;
        this.employeeService = employeeService;
        this.yearService = yearService;
        this.displayedColumns = [
            'num',
            'designation',
            'type'
        ];
        this.displayedColumnsSelected = [
            'num', 'designation', 'charge'
        ];
        this.filteredList = [];
        this.filteredListAdd = new rxjs_1.Subject();
        this.notSelected = [];
        this.defaultSubjects = [];
        this.employees = [];
        this.classes = [];
        this.chargeIds = [];
        this.selected = [];
        this.selectedAdd = new rxjs_1.Subject();
        this.isRunning = false;
        this.showActions = false;
        this.filterControl = new forms_1.FormControl();
        this.event = new core_1.EventEmitter();
        this.numberOfResult = 0;
        this.numSubject = 0;
        this.numSubjectSelected = 0;
        this.enableAction = true;
    }
    SubjectAttributionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRunning = true;
        this.currentYear = this.data.year;
        this.currentSchoolClass = this.data.schoolClass;
        // for autocomplete
        this.filterControl.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) {
            _this.currentFilterValue = value;
            return _this.filter(value);
        })).subscribe(function (resp) {
            _this.numSubject = resp.length;
            _this.filteredListAdd.next(resp.slice());
        });
        this.filteredListAdd.subscribe(function (resp) {
            console.log('susbcription filter ok !!!');
            _this.filteredList = resp;
            _this.numSubject = resp.length;
            _this.refreshAttribs();
        });
        this.selectedAdd.subscribe(function (resp) {
            _this.selected = resp;
            _this.numSubjectSelected = _this.selected.length;
            _this.refreshAttribs();
            console.log('susbcription ok !!!: ' + _this.selected.length);
        });
        this.employeeService.getAll().subscribe(function (respEmpl) {
            _this.employees = respEmpl;
            _this.schoolClassService.getAll().subscribe(function (respSch) {
                _this.classes = respSch;
                _this.schoolClassSettingService.findSubjectBean(_this.currentSchoolClass.id).subscribe(function (resp) {
                    _this.currentSchoolClassSubjectBean = resp;
                    _this.refresh();
                });
            });
        });
    };
    SubjectAttributionComponent.prototype.refreshAttribs = function () {
        // attribution of class
        this.chargeIds = [];
        for (var _i = 0, _a = this.selected; _i < _a.length; _i++) {
            var item = _a[_i];
            var exists = false;
            for (var _b = 0, _c = this.currentSchoolClassSubjectBean.subjectAttributions; _b < _c.length; _b++) {
                var subj = _c[_b];
                if (item.subject.id === subj.subject.id && subj.year.id === this.currentYear.id) {
                    exists = true;
                    if (subj.employee !== null && subj.employee !== undefined) {
                        this.chargeIds.push(subj.employee.id);
                    }
                    else {
                        this.chargeIds.push(undefined);
                    }
                }
            }
            if (!exists) {
                this.chargeIds.push(undefined);
            }
        }
    };
    SubjectAttributionComponent.prototype.ngOnDestroy = function () { };
    SubjectAttributionComponent.prototype.refresh = function () {
        var _this = this;
        //for progress
        this.isRunning = true;
        this.selected = this.currentSchoolClassSubjectBean.subjectAttributions.filter(function (subj) { return (subj.year.id === _this.currentYear.id); });
        this.selectedAdd.next(this.selected.slice());
        this.notSelected = [];
        this.subjectService.getAll().subscribe(function (resp) {
            _this.defaultSubjects = resp;
            //we move subject that are alreday selected
            for (var _i = 0, resp_1 = resp; _i < resp_1.length; _i++) {
                var subj = resp_1[_i];
                var exists = false;
                for (var _a = 0, _b = _this.selected; _a < _b.length; _a++) {
                    var attrib = _b[_a];
                    if (attrib.subject.id === subj.id) {
                        exists = true;
                    }
                }
                // we add it if not found
                if (exists === false) {
                    _this.notSelected.push(subj);
                }
            }
            _this.filteredListAdd.next(_this.notSelected.slice());
            //for progress
            _this.isRunning = false;
        }, function () {
            console.log('finished lodding!!!!!!!');
            //for progress
            _this.isRunning = false;
        });
    };
    SubjectAttributionComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    // filter for test autocomplete
    SubjectAttributionComponent.prototype.filter = function (value) {
        if (typeof value === 'string') {
            if (value === '') {
                return this.notSelected;
            }
            else {
                var filterValue_1 = value.toLowerCase();
                return this.notSelected.filter(function (option) {
                    return (option.designation).toLowerCase().includes(filterValue_1);
                });
            }
        }
        else {
            return this.notSelected;
        }
    };
    SubjectAttributionComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isRunning = true;
        console.log('before submit Attribution::::::: ' + JSON.stringify(this.chargeIds));
        this.count = 0;
        var orderSubjAttribs = this.currentSchoolClassSubjectBean.subjectAttributions.filter(function (subj) { return (subj.year.id !== _this.currentYear.id); });
        for (var _i = 0, _a = this.selected; _i < _a.length; _i++) {
            var attrib = _a[_i];
            orderSubjAttribs.push(attrib);
        }
        this.currentSchoolClassSubjectBean.subjectAttributions = orderSubjAttribs;
        this.schoolClassSettingService.saveSubjectBean(this.currentSchoolClassSubjectBean).subscribe(function (resp) {
            _this.isRunning = false;
            _this.currentSchoolClassSubjectBean = resp;
            _this.refresh();
            _this.messageService.showSucces();
        });
    };
    SubjectAttributionComponent.prototype.onExit = function () {
        this.form.close();
    };
    SubjectAttributionComponent.prototype.setCharger = function (index) {
        var _this = this;
        this.enableAction = false;
        this.employeeService.getOne(this.chargeIds[index]).subscribe(function (resp) {
            _this.selected[index].employee = resp;
            _this.enableAction = true;
        });
    };
    // movement
    SubjectAttributionComponent.prototype.defaultSelected = function (element) {
        console.log('I was called!!');
        this.currentDefaultSubject = element;
        this.currentSelectedSubject = undefined;
    };
    SubjectAttributionComponent.prototype.isSelected = function (element) {
        console.log('I was called for selected !!!');
        this.currentSelectedSubject = element;
        this.currentDefaultSubject = undefined;
    };
    SubjectAttributionComponent.prototype.moveDefault = function (selected) {
        if (selected !== undefined) {
            this.currentDefaultSubject = selected;
        }
        // we move the selected element from the list
        var temp = [];
        for (var _i = 0, _a = this.filteredList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id !== this.currentDefaultSubject.id) {
                temp.push(item);
            }
            else {
                var attrib = new subject_attribution_1.SubjectAttribution();
                attrib.year = this.currentYear;
                attrib.subject = item;
                this.selected.push(attrib);
                this.selectedAdd.next(this.selected.slice());
            }
        }
        this.filteredList = temp;
        this.filteredListAdd.next(this.filteredList.slice());
        this.currentDefaultSubject = undefined;
    };
    SubjectAttributionComponent.prototype.moveAllDefault = function () {
        for (var _i = 0, _a = this.filteredList; _i < _a.length; _i++) {
            var item = _a[_i];
            this.moveDefault(item);
        }
        ;
    };
    SubjectAttributionComponent.prototype.moveSelected = function (selected) {
        if (selected !== undefined) {
            this.currentSelectedSubject = selected;
        }
        var temp = [];
        // we put default either selected to have typeSubject
        for (var _i = 0, _a = this.selected; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.subject.id !== this.currentSelectedSubject.subject.id) {
                temp.push(item);
            }
            else {
                this.filteredList.push(item.subject);
            }
        }
        this.selectedAdd.next(temp);
        this.filteredListAdd.next(this.filteredList.slice());
        this.currentSelectedSubject = undefined;
        //on rafraichi les attribution
    };
    SubjectAttributionComponent.prototype.moveAllSelected = function () {
        for (var _i = 0, _a = this.selected; _i < _a.length; _i++) {
            var item = _a[_i];
            this.moveSelected(item);
        }
    };
    SubjectAttributionComponent = __decorate([
        core_1.Component({
            selector: 'app-subject-attribution',
            templateUrl: './subject-attribution.component.html',
            styleUrls: ['./subject-attribution.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], SubjectAttributionComponent);
    return SubjectAttributionComponent;
}());
exports.SubjectAttributionComponent = SubjectAttributionComponent;
