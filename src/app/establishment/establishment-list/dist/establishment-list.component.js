"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstablishmentListComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var establishment_identity_bean_1 = require("../models/establishment-identity-bean");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var establishment_form_component_1 = require("../establishment-form/establishment-form.component");
var EstablishmentListComponent = /** @class */ (function () {
    function EstablishmentListComponent(auth, messageService, dialog, dataService) {
        this.auth = auth;
        this.messageService = messageService;
        this.dialog = dialog;
        this.dataService = dataService;
        this.displayedColumns = [
            'num',
            'name',
            'modify',
            'suppr', 'setting'
        ];
        this.filteredList = [];
        this.holeList = [];
    }
    EstablishmentListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    EstablishmentListComponent.prototype.ngOnDestroy = function () { };
    EstablishmentListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.holeList = resp;
            _this.filteredList = resp;
        });
    };
    EstablishmentListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.identity.name }
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
    EstablishmentListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    EstablishmentListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(establishment_form_component_1.EstablishmentFormComponent, {
            width: '1000px',
            data: { titre: 'Ajouter un établissement', obj: new establishment_identity_bean_1.EstablishmentIdentityBean() }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    EstablishmentListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(establishment_form_component_1.EstablishmentFormComponent, {
            width: '1000px',
            data: { titre: 'Modifier', obj: data }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    EstablishmentListComponent.prototype.onSetting = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(establishment_form_component_1.EstablishmentFormComponent, {
            width: '1000px',
            data: { titre: 'Configuration', obj: data, isSetting: true }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    // filter for test autocomplete
    EstablishmentListComponent.prototype.filter = function () {
        if (typeof this.filterText !== undefined) {
            var filterValue_1 = this.filterText.toLowerCase();
            this.filteredList = this.holeList.filter(function (option) {
                return (option.type.dim + ' ' + option.identity.name).toLowerCase().includes(filterValue_1);
            });
        }
    };
    EstablishmentListComponent = __decorate([
        core_1.Component({
            selector: 'app-establishment-list',
            templateUrl: './establishment-list.component.html',
            styleUrls: ['./establishment-list.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], EstablishmentListComponent);
    return EstablishmentListComponent;
}());
exports.EstablishmentListComponent = EstablishmentListComponent;
