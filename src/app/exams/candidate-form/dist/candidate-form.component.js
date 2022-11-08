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
exports.CandidateFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var candidate_identity_bean_1 = require("../models/candidate-identity-bean");
var exam_identity_bean_1 = require("../models/exam-identity-bean");
var CandidateFormComponent = /** @class */ (function () {
    function CandidateFormComponent(data, form, dialog, constanceService, establishmentExamService, schoolClassService, messageService, candidateIdentityService) {
        this.data = data;
        this.form = form;
        this.dialog = dialog;
        this.constanceService = constanceService;
        this.establishmentExamService = establishmentExamService;
        this.schoolClassService = schoolClassService;
        this.messageService = messageService;
        this.candidateIdentityService = candidateIdentityService;
        this.candidateIdentityBean = new candidate_identity_bean_1.CandidateIdentityBean();
        this.examIdentityBean = new exam_identity_bean_1.ExamIdentityBean();
        this.establishments = [];
        this.event = new core_1.EventEmitter();
    }
    CandidateFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.viewHeight = window.innerHeight * 0.45;
        this.examIdentityBean = this.data.exam !== undefined ? this.data.exam : new exam_identity_bean_1.ExamIdentityBean();
        this.candidateIdentityBean = this.data.candidate !== undefined ? this.data.candidate : new candidate_identity_bean_1.CandidateIdentityBean();
        this.establishmentExamService.getAll().subscribe(function (resp) {
            _this.establishments = resp;
            _this.currentEstablishmentId = _this.candidateIdentityBean.establishment.id !== undefined ? _this.candidateIdentityBean.establishment.id : resp[0].id;
        });
    };
    CandidateFormComponent.prototype.onResize = function (event) {
        this.viewHeight = window.innerHeight * 0.45;
        console.log("windows resizing::::" + event);
    };
    CandidateFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    CandidateFormComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.examIdentityBean.id !== undefined) {
            this.candidateIdentityBean.exam = this.examIdentityBean;
            var currentEstablishment = this.establishments.filter(function (item) { return (item.id === _this.currentEstablishmentId); })[0];
            this.candidateIdentityBean.establishment = currentEstablishment;
            this.candidateIdentityService.save(this.candidateIdentityBean).subscribe(function (resp) {
                _this.event.emit(resp);
                _this.form.close();
            }, function (error) {
                _this.event.emit();
                _this.form.close();
            });
        }
        else {
            this.messageService.showErrorMessage("Aucun examen n'est défini");
        }
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], CandidateFormComponent.prototype, "onResize");
    CandidateFormComponent = __decorate([
        core_1.Component({
            selector: 'app-candidate-form',
            templateUrl: './candidate-form.component.html',
            styleUrls: ['./candidate-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], CandidateFormComponent);
    return CandidateFormComponent;
}());
exports.CandidateFormComponent = CandidateFormComponent;
