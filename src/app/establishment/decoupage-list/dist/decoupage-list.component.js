"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DecoupageListComponent = void 0;
var core_1 = require("@angular/core");
var decoupage_1 = require("../../establishment/models/decoupage");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var decoupage_form_component_1 = require("../decoupage-form/decoupage-form.component");
var DecoupageListComponent = /** @class */ (function () {
    function DecoupageListComponent(auth, dialog, dataService) {
        this.auth = auth;
        this.dialog = dialog;
        this.dataService = dataService;
        this.displayedColumns = ['num', 'designation', 'index', 'modify', 'suppr'];
        this.liste = [];
    }
    DecoupageListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    DecoupageListComponent.prototype.ngOnDestroy = function () { };
    DecoupageListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.liste = resp;
        });
    };
    DecoupageListComponent.prototype.onDelete = function (obj) {
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
    DecoupageListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(decoupage_form_component_1.DecoupageFormComponent, {
            width: '600px',
            data: { titre: 'Modifier', obj: data }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.dataService.setCurrentObject(response2);
                _this.refresh();
                validationSub.unsubscribe();
            });
        });
    };
    DecoupageListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    DecoupageListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(decoupage_form_component_1.DecoupageFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter un découpage', obj: new decoupage_1.Decoupage() }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    DecoupageListComponent = __decorate([
        core_1.Component({
            selector: 'app-decoupage-list',
            templateUrl: './decoupage-list.component.html',
            styleUrls: ['./decoupage-list.component.scss']
        })
    ], DecoupageListComponent);
    return DecoupageListComponent;
}());
exports.DecoupageListComponent = DecoupageListComponent;
