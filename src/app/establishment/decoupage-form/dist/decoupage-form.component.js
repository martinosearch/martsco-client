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
exports.DecoupageFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var decoupage_1 = require("../../establishment/models/decoupage");
var DecoupageFormComponent = /** @class */ (function () {
    function DecoupageFormComponent(data, form, decTypeService) {
        this.data = data;
        this.form = form;
        this.decTypeService = decTypeService;
        this.model = new decoupage_1.Decoupage();
        this.event = new core_1.EventEmitter();
        //public decTypeId: number;
        this.decTypes = new rxjs_1.Observable();
    }
    DecoupageFormComponent.prototype.ngOnInit = function () {
        this.model = this.data.obj;
        // this.decTypeId = this.model.type !== undefined ? this.model.type.id : undefined;
        this.decTypes = this.decTypeService.getAll();
    };
    DecoupageFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    DecoupageFormComponent.prototype.onSubmit = function () {
        this.event.emit(this.model);
        this.form.close();
    };
    DecoupageFormComponent = __decorate([
        core_1.Component({
            selector: 'app-decoupage-form',
            templateUrl: './decoupage-form.component.html',
            styleUrls: ['./decoupage-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], DecoupageFormComponent);
    return DecoupageFormComponent;
}());
exports.DecoupageFormComponent = DecoupageFormComponent;
