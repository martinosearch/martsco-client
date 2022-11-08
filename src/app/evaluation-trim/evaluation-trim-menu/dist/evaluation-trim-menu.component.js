"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EvaluationTrimMenuComponent = void 0;
var core_1 = require("@angular/core");
var class_chooser_form_component_1 = require("../../establishment/school-class-chooser-form/class-chooser-form.component");
var saisie_note_form_component_1 = require("../saisie-note-form/saisie-note-form.component");
var coef_setting_component_1 = require("../coef-setting/coef-setting.component");
var config_eval_form_component_1 = require("../config-eval-form/config-eval-form.component");
var subject_attribution_component_1 = require("../subject-attribution/subject-attribution.component");
var EvaluationTrimMenuComponent = /** @class */ (function () {
    function EvaluationTrimMenuComponent(dialog, studentResultReportService, studentResultStatBySexService, studentResultStatMixteReportService, actionService, router, routeService) {
        this.dialog = dialog;
        this.studentResultReportService = studentResultReportService;
        this.studentResultStatBySexService = studentResultStatBySexService;
        this.studentResultStatMixteReportService = studentResultStatMixteReportService;
        this.actionService = actionService;
        this.router = router;
        this.routeService = routeService;
        this.expanded = false;
    }
    EvaluationTrimMenuComponent.prototype.ngOnInit = function () {
    };
    EvaluationTrimMenuComponent.prototype.onSaisieNote = function (express) {
        var _this = this;
        var dialogRef = this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
            width: '600px',
            data: { titre: 'Choisir la classe', subjectChooser: true, decoupageChooser: true }
        });
        dialogRef.componentInstance.eventEmitter.subscribe(function (resp) {
            var formData = { titre: 'Espace de saisie des notes', chooserModel: resp, express: false };
            if (express) {
                formData = { titre: 'Espace de saisie des notes (Express)', chooserModel: resp, express: true };
            }
            var dialogSaisie = _this.dialog.open(saisie_note_form_component_1.SaisieNoteFormComponent, {
                width: '600px',
                data: formData
            });
        });
    };
    EvaluationTrimMenuComponent.prototype.toSaisieAllNotes = function () {
        //   const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
        //     width: '600px',
        //     data: { titre: 'Choisir la classe' }
        //   });
        //   const validationSub = dialogRef.componentInstance.eventEmitter.subscribe(
        //     (resp: ClassChooserModel) => {
        //       const dialogSaisie = this.dialog.open(SaisieAllNoteComponent, {
        //         width: '1000px',
        //         data: { title: 'Saisie des notes (toutes les matières)' }
        //       });
        //       validationSub.unsubscribe();
        //     }
        //   );
    };
    EvaluationTrimMenuComponent.prototype.onBulletinNotePdf = function (singleEval) {
        this.actionService.launchAction(this.studentResultReportService
            .generateBulletinNotePdf(singleEval)).subscribe(function (resp) {
            console.log(">>>>>>>>>>>>");
        });
    };
    EvaluationTrimMenuComponent.prototype.onResultatGenPdf = function (singleEval) {
        this.actionService.launchAction(this.studentResultReportService
            .generateResultatGenPdf(singleEval)).subscribe(function (resp) { });
    };
    EvaluationTrimMenuComponent.prototype.onResultatAnnuelPdf = function () {
        this.actionService.launchAction(this.studentResultReportService
            .generateResultatAnnuelPdf()).subscribe(function (resp) { });
    };
    EvaluationTrimMenuComponent.prototype.onBulletinBilanPdf = function () {
        this.actionService.launchAction(this.studentResultReportService
            .generateBulletinBilanPdf()).subscribe(function (resp) { });
    };
    EvaluationTrimMenuComponent.prototype.onRapportSaisiePdf = function () {
        this.actionService.launchAction(this.studentResultReportService
            .generateRapportSaisiePdf()).subscribe(function (resp) { });
    };
    // stat mixte
    EvaluationTrimMenuComponent.prototype.onStatMixteStandardPdf = function (singleEvaluation) {
        this.actionService.launchAction(this.studentResultStatMixteReportService
            .generateStatStandardPdf(singleEvaluation)).subscribe(function (resp) { });
    };
    EvaluationTrimMenuComponent.prototype.onStatMixteSchoolClassPdf = function (singleEvaluation) {
        this.actionService.launchAction(this.studentResultStatMixteReportService
            .generateStatSchoolClassPdf(singleEvaluation)).subscribe(function (resp) { });
    };
    EvaluationTrimMenuComponent.prototype.onStatMixteMoyAnSchoolClassPdf = function () {
        this.actionService.launchAction(this.studentResultStatMixteReportService
            .generateStatMoyAnSchoolClassPdf()).subscribe(function (resp) { });
    };
    EvaluationTrimMenuComponent.prototype.onStatMixteMoyAnStandardPdf = function () {
        this.actionService.launchAction(this.studentResultStatMixteReportService
            .generateStatMoyAnStandardPdf()).subscribe(function (resp) { });
    };
    // stat by sex
    EvaluationTrimMenuComponent.prototype.onStatBySexStandardPdf = function (singleEvaluation) {
        var statMixte = false;
        this.actionService.launchAction(this.studentResultStatBySexService
            .generateStatStandardPdf(singleEvaluation, statMixte)).subscribe(function (resp) { });
    };
    EvaluationTrimMenuComponent.prototype.onStatBySexSchoolClassPdf = function (singleEvaluation) {
        this.actionService.launchAction(this.studentResultStatBySexService
            .generateStatSchoolClassPdf(singleEvaluation)).subscribe(function (resp) { });
    };
    EvaluationTrimMenuComponent.prototype.onStatBySexMoyAnSchoolClassPdf = function () {
        this.actionService.launchAction(this.studentResultStatBySexService
            .generateStatMoyAnSchoolClassPdf()).subscribe(function (resp) { });
    };
    EvaluationTrimMenuComponent.prototype.onStatBySexMoyAnStandardPdf = function () {
        this.actionService.launchAction(this.studentResultStatBySexService
            .generateStatMoyAnStandardPdf()).subscribe(function (resp) { });
    };
    EvaluationTrimMenuComponent.prototype.toEvaluationList = function () {
        this.router.navigate([this.routeService.evaluationListRoute]);
    };
    EvaluationTrimMenuComponent.prototype.toEvaluationTypeList = function () {
        this.router.navigate([this.routeService.evaluationTypeListRoute]);
    };
    EvaluationTrimMenuComponent.prototype.onMatiereProg = function () {
        var _this = this;
        var dialogRef = this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
            width: '600px',
            data: { titre: 'Choisir la classe' }
        });
        var validationSub = dialogRef.componentInstance.eventEmitter.subscribe(function (resp) {
            console.log('choosed year: ' + resp.year.id + ' classe: ' + resp.schoolClass.id);
            // progress
            var dialogRef = _this.dialog.open(subject_attribution_component_1.SubjectAttributionComponent, {
                width: '1200px',
                data: {
                    titre: 'Définir les matières au programme',
                    schoolClass: resp.schoolClass,
                    year: resp.year
                }
            });
            var validationSub2 = dialogRef.componentInstance.event.subscribe(function (resp) {
                console.log('the size of the list : ' + resp.length);
                // progress
            });
        });
    };
    EvaluationTrimMenuComponent.prototype.onConfigEvaluation = function () {
        var _this = this;
        var dialogRef = this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
            width: '600px',
            data: { titre: 'Choisir la classe' }
        });
        var validationSub = dialogRef.componentInstance.eventEmitter.subscribe(function (resp) {
            console.log('choosed year: ' + resp.year.designation + ' classe: ' + resp.schoolClass.designation);
            validationSub.unsubscribe();
            // progress
            var dialogRef = _this.dialog.open(config_eval_form_component_1.ConfigEvalFormComponent, {
                width: '800px',
                data: { titre: 'Configuration du type d\'évaluation', schoolClassChooser: resp }
            });
            var validationSub2 = dialogRef.componentInstance.event.subscribe(function (resp) {
                console.log('choosed year: ' + resp.year.designation + ' classe: ' + resp.schoolClass.designation);
                // progress
            });
        });
    };
    EvaluationTrimMenuComponent.prototype.onConfigCoef = function () {
        var _this = this;
        var dialogRef = this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
            width: '600px',
            data: { titre: 'Choisir le niveau d\'enseignement', standardChooser: true }
        });
        var validationSub = dialogRef.componentInstance.eventEmitter.subscribe(function (resp) {
            console.log('choosed year: ' + resp.year.id + ' standard ' + resp.standard.designation);
            // progress
            resp.titre = "Définir les coefficients des matières";
            var dialogRef = _this.dialog.open(coef_setting_component_1.CoefSettingComponent, {
                width: '600px',
                data: resp
            });
            var validationSub2 = dialogRef.componentInstance.event.subscribe(function (resp) {
                console.log('the size of the list : ' + resp.length);
                // progress
            });
        });
    };
    EvaluationTrimMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-evaluation-trim-menu',
            templateUrl: './evaluation-trim-menu.component.html',
            styleUrls: ['./evaluation-trim-menu.component.scss']
        })
    ], EvaluationTrimMenuComponent);
    return EvaluationTrimMenuComponent;
}());
exports.EvaluationTrimMenuComponent = EvaluationTrimMenuComponent;
