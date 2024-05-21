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
exports.YearFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var year_1 = require("src/app/establishment/models/year");
var YearFormComponent = /** @class */ (function () {
    function YearFormComponent(data, form, dataService) {
        this.data = data;
        this.form = form;
        this.dataService = dataService;
        this.model = new year_1.Year();
        this.event = new core_1.EventEmitter();
    }
    YearFormComponent.prototype.ngOnInit = function () {
        this.model = this.data.obj;
    };
    YearFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    YearFormComponent.prototype.onSubmit = function () {
        this.event.emit(this.model);
        this.form.close();
    };
    YearFormComponent = __decorate([
        core_1.Component({
            selector: 'app-year-form',
            templateUrl: './year-form.component.html',
            styleUrls: ['./year-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], YearFormComponent);
    return YearFormComponent;
}());
exports.YearFormComponent = YearFormComponent;
