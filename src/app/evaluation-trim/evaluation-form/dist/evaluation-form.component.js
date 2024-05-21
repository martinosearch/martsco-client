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
exports.EvaluationFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var evaluation_1 = require("../models/evaluation");
var EvaluationFormComponent = /** @class */ (function () {
    function EvaluationFormComponent(data, form, decoupageService, yearService, evaluationService, constanceService, evaluationTypeService) {
        this.data = data;
        this.form = form;
        this.decoupageService = decoupageService;
        this.yearService = yearService;
        this.evaluationService = evaluationService;
        this.constanceService = constanceService;
        this.evaluationTypeService = evaluationTypeService;
        this.event = new core_1.EventEmitter();
        this.types = [];
        this.decoupages = [];
        this.years = [];
    }
    EvaluationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = this.data.obj !== undefined ? this.data.obj : new evaluation_1.Evaluation();
        this.typeId = this.model.type !== null ? this.model.type.id : undefined;
        this.decoupageId = this.model.decoupage !== null ? this.model.decoupage.id : undefined;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.yearId = _this.currentYear.id;
            _this.evaluationTypeService.getAll().subscribe(function (resp) {
                _this.types = resp;
            });
            _this.decoupageService.getAll().subscribe(function (resp) {
                _this.decoupages = resp;
            });
            _this.yearService.getAll().subscribe(function (resp) {
                _this.years = resp;
            });
        });
    };
    EvaluationFormComponent.prototype.ngOnDestroy = function () {
    };
    EvaluationFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    EvaluationFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.decoupageService.getOne(this.decoupageId).subscribe(function (respDec) {
            _this.evaluationTypeService.getOne(_this.typeId).subscribe(function (respType) {
                _this.model.year = _this.currentYear;
                _this.model.decoupage = respDec;
                _this.model.type = respType;
                _this.evaluationService.save(_this.model).subscribe(function (response2) {
                    _this.event.emit();
                    _this.form.close();
                });
            });
        });
    };
    EvaluationFormComponent = __decorate([
        core_1.Component({
            selector: 'app-evaluation-form',
            templateUrl: './evaluation-form.component.html',
            styleUrls: ['./evaluation-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], EvaluationFormComponent);
    return EvaluationFormComponent;
}());
exports.EvaluationFormComponent = EvaluationFormComponent;
