"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExamComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var confirm_delete_component_1 = require("src/app/utilities/confirm-delete/confirm-delete.component");
var exam_form_component_1 = require("../exam-form/exam-form.component");
var exam_identity_bean_1 = require("../models/exam-identity-bean");
var ExamComponent = /** @class */ (function () {
    function ExamComponent(auth, messageService, dialog, examService) {
        this.auth = auth;
        this.messageService = messageService;
        this.dialog = dialog;
        this.examService = examService;
        this.displayedColumns = [
            'num',
            'designation',
            'modify',
            'suppr', 'setting'
        ];
        this.filteredList = [];
        this.holeList = [];
    }
    ExamComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    ExamComponent.prototype.ngOnDestroy = function () { };
    ExamComponent.prototype.refresh = function () {
        var _this = this;
        this.examService.getAll().subscribe(function (resp) {
            _this.holeList = resp;
            _this.filteredList = resp;
        });
    };
    ExamComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.examService["delete"](obj.id).subscribe(function (resp) {
                console.log('deleted: ' + obj);
                _this.refresh();
            }, function (error) {
                _this.messageService.showErrorMessage(error.error.message);
            });
        });
    };
    ExamComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(exam_form_component_1.ExamFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter un établissement', obj: new exam_identity_bean_1.ExamIdentityBean() }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    ExamComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(exam_form_component_1.ExamFormComponent, {
            width: '600px',
            data: { titre: 'Modifier', obj: data }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    ExamComponent.prototype.onSetting = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(exam_form_component_1.ExamFormComponent, {
            width: '1000px',
            data: { titre: 'Configuration', obj: data, isSetting: true }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    // filter for test autocomplete
    ExamComponent.prototype.filter = function () {
        if (typeof this.filterText !== undefined) {
            var filterValue_1 = this.filterText.toLowerCase();
            this.filteredList = this.holeList.filter(function (option) {
                return (option.designation).toLowerCase().includes(filterValue_1);
            });
        }
    };
    ExamComponent = __decorate([
        core_1.Component({
            selector: 'app-exam',
            templateUrl: './exam.component.html',
            styleUrls: ['./exam.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], ExamComponent);
    return ExamComponent;
}());
exports.ExamComponent = ExamComponent;
