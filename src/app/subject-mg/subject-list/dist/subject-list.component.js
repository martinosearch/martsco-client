"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubjectListComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var subject_1 = require("src/app/subject-mg/models/subject");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var subject_form_component_1 = require("../subject-form/subject-form.component");
var SubjectListComponent = /** @class */ (function () {
    function SubjectListComponent(auth, messageService, dialog, actionService, progressService, dataService) {
        this.auth = auth;
        this.messageService = messageService;
        this.dialog = dialog;
        this.actionService = actionService;
        this.progressService = progressService;
        this.dataService = dataService;
        this.displayedColumns = ['num', 'designation', 'type', 'dim', 'modify', 'suppr'];
        this.expandedElement = null;
        this.filteredList = new rxjs_1.Observable();
        this.list = [];
        this.filterControl = new forms_1.FormControl();
        this.contentHeight = 300;
    }
    SubjectListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refresh();
        // for autocomplete
        this.filterControl.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this.filter(value); })).subscribe(function (resp) {
            _this.filteredList = rxjs_1.of(resp);
        });
        this.resize();
    };
    SubjectListComponent.prototype.onResize = function (event) {
        this.resize();
    };
    SubjectListComponent.prototype.resize = function () {
        this.contentHeight = window.innerHeight - (window.innerHeight * 0.22);
    };
    SubjectListComponent.prototype.ngOnDestroy = function () { };
    SubjectListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.list = resp;
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    SubjectListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation !== null ? obj.designation : 'cette matière ' + '?' }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService["delete"](obj.id).subscribe(function (resp) {
                console.log('deleted: ' + obj);
                _this.refresh();
            }, function (error) {
                _this.messageService.showErrorMessage(error.error.message);
            });
        });
    };
    SubjectListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    SubjectListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(subject_form_component_1.SubjectFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter une matière', obj: new subject_1.MySubject() }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    SubjectListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(subject_form_component_1.SubjectFormComponent, {
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
    // filter for test autocomplete
    SubjectListComponent.prototype.filter = function (value) {
        if (typeof value === 'string') {
            console.log('the current value for analyse is: ' + value);
            if (value === '') {
                console.log('je suis ici: ' + value);
                return this.list;
            }
            else {
                var filterValue_1 = value.toLowerCase();
                return this.list.filter(function (option) {
                    return (option.designation).toLowerCase().includes(filterValue_1);
                });
            }
        }
        else {
            return this.list;
        }
    };
    SubjectListComponent.prototype.onSetting = function () {
    };
    SubjectListComponent.prototype.moveDown = function () {
        var _this = this;
        var index = this.expandedElement.orderSubj;
        console.log("order current: " + this.expandedElement.orderSubj);
        var i = 0;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var subj = _a[_i];
            if (index < this.list.length - 1) {
                if (subj.id === this.expandedElement.id) {
                    subj.orderSubj = index + 1;
                    this.expandedElement = subj;
                }
                else {
                    subj.orderSubj = i;
                }
            }
            else {
                subj.orderSubj = i;
            }
            i++;
        }
        this.list[index + 1].orderSubj = index;
        this.list.forEach(function (subj) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                _this.actionService.launchWaiting(progressId);
                _this.dataService.save(subj).subscribe(function (resp) {
                    _this.refresh();
                    _this.actionService.stopWaiting(progressId);
                });
            });
        });
    };
    SubjectListComponent.prototype.moveUp = function () {
        var _this = this;
        var index = this.expandedElement.orderSubj;
        console.log("order current: " + this.expandedElement.orderSubj);
        var i = 0;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var subj = _a[_i];
            if (index > 0) {
                if (subj.id === this.expandedElement.id) {
                    subj.orderSubj = index - 1;
                    this.expandedElement = subj;
                }
                else {
                    subj.orderSubj = i;
                }
            }
            else {
                subj.orderSubj = i;
            }
            i++;
        }
        this.list[index - 1].orderSubj = index;
        this.list.forEach(function (subj) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                _this.actionService.launchWaiting(progressId);
                _this.dataService.save(subj).subscribe(function (resp) {
                    _this.refresh();
                    _this.actionService.stopWaiting(progressId);
                });
            });
        });
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], SubjectListComponent.prototype, "onResize");
    SubjectListComponent = __decorate([
        core_1.Component({
            selector: 'app-subject-list',
            templateUrl: './subject-list.component.html',
            styleUrls: ['./subject-list.component.scss']
        })
    ], SubjectListComponent);
    return SubjectListComponent;
}());
exports.SubjectListComponent = SubjectListComponent;
