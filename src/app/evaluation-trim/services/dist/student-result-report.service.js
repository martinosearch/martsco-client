"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentResultReportService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var class_chooser_form_component_1 = require("src/app/establishment/school-class-chooser-form/class-chooser-form.component");
var StudentResultReportService = /** @class */ (function () {
    function StudentResultReportService(dialog, studentService, routeService, httpClient, fileService, authService, actionService, appConfigsService, progressService) {
        var _this = this;
        this.dialog = dialog;
        this.studentService = studentService;
        this.routeService = routeService;
        this.httpClient = httpClient;
        this.fileService = fileService;
        this.authService = authService;
        this.actionService = actionService;
        this.appConfigsService = appConfigsService;
        this.progressService = progressService;
        // API url;
        this.API_MARTSCO = this.appConfigsService.apiUrl;
        authService.currentUserSubj.subscribe(function (resp) {
            _this.currentUserId = resp;
        });
    }
    StudentResultReportService.prototype.generateBulletinNotePdf = function (singleEval) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                var chooserData = { titre: 'Choisir les paramètres', decoupageChooser: true, evaluationChooser: false };
                if (singleEval) {
                    chooserData = { titre: 'Choisir les paramètres', decoupageChooser: true, evaluationChooser: true };
                }
                var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                    width: '600px',
                    data: chooserData
                });
                dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    var url = _this.API_MARTSCO + "/bulletin-results/bulletin-notes/" + chooserModel.schoolClass.id
                        + "/" + chooserModel.year.id + "/" + chooserModel.decoupage.id + "/" + chooserModel.selectedEvaluationId + "/" + _this.currentUserId + "/" + progressId;
                    _this.fileService.downloadAndShowPdf(url, "bulletin_" + chooserModel.schoolClass.designation, progressId);
                    return observer.next();
                });
            });
        });
    };
    StudentResultReportService.prototype.generateResultatGenPdf = function (singleEval) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            var chooserData = { titre: 'Choisir les paramètres', decoupageChooser: true, evaluationChooser: false };
            if (singleEval) {
                chooserData = { titre: 'Choisir les paramètres', decoupageChooser: true, evaluationChooser: true };
            }
            var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                width: '600px',
                data: chooserData
            });
            dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                _this.progressService.getNewProgressId().subscribe(function (progressId) {
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    var url = _this.API_MARTSCO + "/bulletin-results/result-gen/" + chooserModel.schoolClass.id
                        + "/" + chooserModel.year.id + "/" + chooserModel.decoupage.id + "/" + chooserModel.selectedEvaluationId
                        + "/" + _this.currentUserId + "/" + progressId;
                    _this.fileService.downloadAndShowPdf(url, "resultat_" + chooserModel.schoolClass.designation, progressId);
                    observer.next();
                });
            });
        });
    };
    StudentResultReportService.prototype.generateResultatAnnuelPdf = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                var chooserData = {
                    titre: 'Choisir la classe', decoupageChooser: false
                };
                var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                    width: '600px',
                    data: chooserData
                });
                dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    var url = _this.API_MARTSCO + "/bulletin-results/result-annuel/"
                        + chooserModel.schoolClass.id + "/" + chooserModel.year.id
                        + "/" + _this.currentUserId + "/" + progressId;
                    _this.fileService.downloadAndShowPdf(url, "resultat_annuel_" + chooserModel.schoolClass.designation, progressId);
                    return observer.next();
                });
            });
        });
    };
    StudentResultReportService.prototype.generateBulletinBilanPdf = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                var chooserData = {
                    titre: 'Choisir la classe', decoupageChooser: false
                };
                var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                    width: '600px',
                    data: chooserData
                });
                dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    var url = _this.API_MARTSCO + "/bulletin-results/bulletin-bilan/" + chooserModel.schoolClass.id
                        + "/" + chooserModel.year.id + "/" + _this.currentUserId + "/" + progressId;
                    _this.fileService.downloadAndShowPdf(url, "bulletin_bilan_" + chooserModel.schoolClass.designation, progressId);
                    return observer.next();
                });
            });
        });
    };
    StudentResultReportService.prototype.generateRapportSaisiePdf = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            var chooserData = { titre: 'Choisir la matière', decoupageChooser: true, subjectChooser: true };
            var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                width: '600px',
                data: chooserData
            });
            dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                _this.progressService.getNewProgressId().subscribe(function (progressId) {
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    var url = _this.API_MARTSCO + "/bulletin-results/rapport-saisie/" + chooserModel.subject.id
                        + "/" + chooserModel.schoolClass.id + "/" + chooserModel.year.id + "/"
                        + chooserModel.decoupage.id + "/" + _this.currentUserId + "/" + progressId;
                    _this.fileService.downloadAndShowPdf(url, "rapport_saisie" + chooserModel.schoolClass.designation + "-" + chooserModel.subject.designation, progressId);
                    return observer.next();
                });
            });
        });
    };
    StudentResultReportService.BULLETIN = 1;
    StudentResultReportService.RESULT_GEN = 2;
    StudentResultReportService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StudentResultReportService);
    return StudentResultReportService;
}());
exports.StudentResultReportService = StudentResultReportService;
