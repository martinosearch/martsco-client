"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstablishmentTypeListComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var establishment_type_1 = require("../models/establishment-type");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var establishment_type_form_component_1 = require("../establishment-type-form/establishment-type-form.component");
var EstablishmentTypeListComponent = /** @class */ (function () {
    function EstablishmentTypeListComponent(auth, dialog, dataService, router) {
        this.auth = auth;
        this.dialog = dialog;
        this.dataService = dataService;
        this.router = router;
        this.displayedColumns = ['num', 'designation', 'dim', 'detail', 'suppr'];
        this.filteredList = new rxjs_1.Observable();
        this.list = [];
        this.filterControl = new forms_1.FormControl();
    }
    EstablishmentTypeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refresh(); // for autocomplete
        this.filterControl.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this.filter(value); })).subscribe(function (resp) {
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    EstablishmentTypeListComponent.prototype.ngOnDestroy = function () { };
    EstablishmentTypeListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.list = resp;
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    EstablishmentTypeListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService["delete"](obj.id).subscribe(function (resp) {
                console.log('deleted: ' + obj);
                _this.refresh();
            });
            _this.refresh();
        });
    };
    EstablishmentTypeListComponent.prototype.onModify = function (obj) {
        var _this = this;
        var data = Object.assign({}, obj);
        var dialogRef = this.dialog.open(establishment_type_form_component_1.EstablishmentTypeFormComponent, {
            width: '600px',
            data: { titre: 'Modifier', obj: data }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    EstablishmentTypeListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    EstablishmentTypeListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(establishment_type_form_component_1.EstablishmentTypeFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter un type d\' école', obj: new establishment_type_1.EstablishmentType() }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    // filter for test autocomplete
    EstablishmentTypeListComponent.prototype.filter = function (value) {
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
    EstablishmentTypeListComponent = __decorate([
        core_1.Component({
            selector: 'app-establishment-type-list',
            templateUrl: './establishment-type-list.component.html',
            styleUrls: ['./establishment-type-list.component.scss']
        })
    ], EstablishmentTypeListComponent);
    return EstablishmentTypeListComponent;
}());
exports.EstablishmentTypeListComponent = EstablishmentTypeListComponent;
