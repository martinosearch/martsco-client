"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SchoolClassListComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var school_class_identity_bean_1 = require("src/app/establishment/models/school-class-identity-bean");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var school_class_form_component_1 = require("../school-class-form/school-class-form.component");
var SchoolClassListComponent = /** @class */ (function () {
    function SchoolClassListComponent(auth, dialog, schoolClassIdentityService) {
        this.auth = auth;
        this.dialog = dialog;
        this.schoolClassIdentityService = schoolClassIdentityService;
        this.displayedColumns = ['num', 'designation', 'niveau', 'modify', 'suppr', 'setting'];
        this.filteredList = [];
        this.list = [];
        this.filterControl = new forms_1.FormControl();
    }
    SchoolClassListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    SchoolClassListComponent.prototype.ngOnDestroy = function () { };
    SchoolClassListComponent.prototype.refresh = function () {
        var _this = this;
        this.schoolClassIdentityService.getAll().subscribe(function (resp) {
            _this.list = resp;
            _this.filteredList = _this.list;
            _this.filter();
        });
    };
    SchoolClassListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.schoolClassIdentityService["delete"](obj.id).subscribe(function (resp) {
                console.log('deleted: ' + obj);
                _this.refresh();
            });
        });
    };
    SchoolClassListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    SchoolClassListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(school_class_form_component_1.SchoolClassFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter une classe', obj: new school_class_identity_bean_1.SchoolClassIdentityBean() }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    SchoolClassListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(school_class_form_component_1.SchoolClassFormComponent, {
            width: '600px',
            data: { titre: 'Modifier', obj: data }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    SchoolClassListComponent.prototype.onSetting = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(school_class_form_component_1.SchoolClassFormComponent, {
            width: '600px',
            data: { titre: 'Configuration', obj: data, isSetting: true }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    // filter for test autocomplete
    SchoolClassListComponent.prototype.filter = function () {
        if (this.filterText !== undefined) {
            var filterValue_1 = this.filterText.toLowerCase();
            this.filteredList = this.list.filter(function (option) {
                return (option.designation).toLowerCase().includes(filterValue_1);
            });
        }
    };
    SchoolClassListComponent = __decorate([
        core_1.Component({
            selector: 'app-school-class-list',
            templateUrl: './school-class-list.component.html',
            styleUrls: ['./school-class-list.component.scss']
        })
    ], SchoolClassListComponent);
    return SchoolClassListComponent;
}());
exports.SchoolClassListComponent = SchoolClassListComponent;
