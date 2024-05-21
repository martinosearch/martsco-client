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
exports.ExamEstablishmentFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var exam_establishment_identity_bean_1 = require("../models/exam-establishment-identity-bean");
var ExamEstablishmentFormComponent = /** @class */ (function () {
    function ExamEstablishmentFormComponent(data, form, dataService) {
        this.data = data;
        this.form = form;
        this.dataService = dataService;
        this.model = new exam_establishment_identity_bean_1.EstablishmentExamIdentityBean();
        this.event = new core_1.EventEmitter();
    }
    ExamEstablishmentFormComponent.prototype.ngOnInit = function () {
        this.model = this.data.obj;
    };
    ExamEstablishmentFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    ExamEstablishmentFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.dataService.save(this.model).subscribe(function (resp) {
            _this.event.emit();
            _this.form.close();
        });
    };
    ExamEstablishmentFormComponent = __decorate([
        core_1.Component({
            selector: 'app-exam-establishment-form',
            templateUrl: './exam-establishment-form.component.html',
            styleUrls: ['./exam-establishment-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], ExamEstablishmentFormComponent);
    return ExamEstablishmentFormComponent;
}());
exports.ExamEstablishmentFormComponent = ExamEstablishmentFormComponent;
