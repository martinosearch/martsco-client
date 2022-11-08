"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExamMenuComponent = void 0;
var core_1 = require("@angular/core");
var exam_chooser_component_1 = require("../exam-chooser/exam-chooser.component");
var saisie_note_form_exam_component_1 = require("../saisie-note-form-exam/saisie-note-form-exam.component");
var ExamMenuComponent = /** @class */ (function () {
    function ExamMenuComponent(router, dialog, actionService, examResultReportService, examStatReportService, constanceService, routeService) {
        this.router = router;
        this.dialog = dialog;
        this.actionService = actionService;
        this.examResultReportService = examResultReportService;
        this.examStatReportService = examStatReportService;
        this.constanceService = constanceService;
        this.routeService = routeService;
        this.expanded = false;
    }
    ExamMenuComponent.prototype.ngOnInit = function () {
    };
    ExamMenuComponent.prototype.toListExam = function () {
        this.router.navigate([this.routeService.examListRoutes]);
    };
    ExamMenuComponent.prototype.toListSubject = function () {
        this.router.navigate([this.routeService.subjectListRoutes]);
    };
    ExamMenuComponent.prototype.toEstablishmentList = function () {
        this.router.navigate([this.routeService.establishementListRoutes]);
    };
    ExamMenuComponent.prototype.toCandidateList = function () {
        var _this = this;
        this.constanceService.toAccueil();
        var chooserData = { titre: 'Choisir un examen' };
        var dialogRef = this.dialog.open(exam_chooser_component_1.ExamChooserComponent, {
            width: '600px',
            data: chooserData
        });
        dialogRef.componentInstance.eventEmitter.subscribe(function (resp) {
            _this.router.navigate([_this.routeService.candidateListRoutes], { state: { chooserModel: resp } });
        });
    };
    ExamMenuComponent.prototype.toSaisieNotes = function () {
        var _this = this;
        this.constanceService.toAccueil();
        var dialogChooser = this.dialog.open(exam_chooser_component_1.ExamChooserComponent, {
            width: '600px',
            data: { titre: 'Choisir les paramètres', isSubjectChooser: true }
        });
        dialogChooser.componentInstance.eventEmitter.subscribe(function (resp) {
            var dialogSaisieForm = _this.dialog.open(saisie_note_form_exam_component_1.SaisieNoteFormExamComponent, {
                width: '600px',
                data: { titre: "Saisie des notes", chooserModel: resp }
            });
        });
    };
    ExamMenuComponent.prototype.toRapportSaisie = function () {
        this.actionService.launchAction(this.examResultReportService
            .generateRapportSaisiePdf()).subscribe();
    };
    ExamMenuComponent.prototype.toReleveNotes = function () {
        this.actionService.launchAction(this.examResultReportService
            .generateRelevePdf()).subscribe();
    };
    ExamMenuComponent.prototype.toResultGen = function () {
        this.actionService.launchAction(this.examResultReportService
            .generateResultGenPdf()).subscribe();
    };
    ExamMenuComponent.prototype.toStatEstablishment = function () {
        this.actionService.launchAction(this.examStatReportService
            .generateStatEstablishmentPdf()).subscribe();
    };
    ExamMenuComponent.prototype.toStatAll = function () {
    };
    ExamMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-exam-menu',
            templateUrl: './exam-menu.component.html',
            styleUrls: ['./exam-menu.component.scss']
        })
    ], ExamMenuComponent);
    return ExamMenuComponent;
}());
exports.ExamMenuComponent = ExamMenuComponent;
