"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CountryListComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var country_identity_bean_1 = require("src/app/governement-informations/models/country-identity-bean");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var country_form_component_1 = require("../country-form/country-form.component");
var CountryListComponent = /** @class */ (function () {
    function CountryListComponent(auth, dialog, dataService) {
        this.auth = auth;
        this.dialog = dialog;
        this.dataService = dataService;
        this.displayedColumns = ['num', 'name', 'devise', 'modify', 'suppr'];
        this.filteredList = [];
        this.holeList = [];
    }
    CountryListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    CountryListComponent.prototype.ngOnDestroy = function () { };
    CountryListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.holeList = resp;
            _this.filteredList = resp;
        });
    };
    CountryListComponent.prototype.onDelete = function (obj) {
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
    CountryListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    CountryListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(country_form_component_1.CountryFormComponent, {
            width: '1000px',
            data: { titre: 'Ajouter un établissement', obj: new country_identity_bean_1.CountryIdentityBean() }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    CountryListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(country_form_component_1.CountryFormComponent, {
            width: '1000px',
            data: { titre: 'Modifier', obj: data }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    CountryListComponent.prototype.onSetting = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(country_form_component_1.CountryFormComponent, {
            width: '1000px',
            data: { titre: 'Configuration', obj: data, isSetting: true }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    // filter for test autocomplete
    CountryListComponent.prototype.filter = function () {
        if (typeof this.filterText !== undefined) {
            var filterValue_1 = this.filterText.toLowerCase();
            this.filteredList = this.holeList.filter(function (option) {
                return (option.designation).toLowerCase().includes(filterValue_1);
            });
        }
    };
    CountryListComponent = __decorate([
        core_1.Component({
            selector: 'app-country-list',
            templateUrl: './country-list.component.html',
            styleUrls: ['./country-list.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], CountryListComponent);
    return CountryListComponent;
}());
exports.CountryListComponent = CountryListComponent;
