"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentResultStatService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var class_chooser_form_component_1 = require("../../establishment/school-class-chooser-form/class-chooser-form.component");
var StudentResultStatService = /** @class */ (function () {
    function StudentResultStatService(dialog, studentService, routeService, httpClient, fileService, authService, appConfigsService, progressService) {
        var _this = this;
        this.dialog = dialog;
        this.studentService = studentService;
        this.routeService = routeService;
        this.httpClient = httpClient;
        this.fileService = fileService;
        this.authService = authService;
        this.appConfigsService = appConfigsService;
        this.progressService = progressService;
        // API url;
        this.API_MARTSCO = this.appConfigsService.apiUrl;
        this.API_END_POINT = this.API_MARTSCO + '/student-result-stat';
        authService.currentUserSubj.subscribe(function (resp) {
            _this.currentUserId = resp;
        });
    }
    StudentResultStatService.prototype.generateStatStandardPdf = function (evaluation) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                var chooserData = {};
                if (evaluation) {
                    chooserData = {
                        titre: 'Choisir le niveau', decoupageChooser: true, standardChooser: true,
                        evaluationChooser: true, singleEval: true
                    };
                }
                else {
                    chooserData = {
                        titre: 'Choisir le niveau', decoupageChooser: true, standardChooser: true
                    };
                }
                var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                    width: '600px',
                    data: chooserData
                });
                dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    var url = _this.API_END_POINT + "/statistique-standard/" + chooserModel.standard.id
                        + "/" + chooserModel.year.id + "/" + chooserModel.decoupage.id + "/" + chooserModel.selectedEvaluationId
                        + "/" + _this.currentUserId + "/" + progressId;
                    _this.fileService.downloadAndShowPdf(url, "stat_mixte_niveau", progressId);
                    observer.next();
                });
            });
        });
    };
    StudentResultStatService.prototype.generateStatSchoolClassPdf = function (evaluation) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                var chooserData = {};
                if (evaluation) {
                    chooserData = {
                        titre: 'Choisir la classe', decoupageChooser: true, schoolClassChooser: true,
                        evaluationChooser: true, singleEval: true
                    };
                }
                else {
                    chooserData = {
                        titre: 'Choisir la classe', decoupageChooser: true, schoolClassChooser: true
                    };
                }
                var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                    width: '600px',
                    data: chooserData
                });
                dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    var url = _this.API_END_POINT + "/statistique-school-class/" + chooserModel.schoolClass.id +
                        "/" + chooserModel.year.id + "/" + chooserModel.decoupage.id + "/" + chooserModel.selectedEvaluationId + "/"
                        + _this.currentUserId + "/" + progressId;
                    _this.fileService.downloadAndShowPdf(url, "stat_mixte_classe", progressId);
                    observer.next();
                });
            });
        });
    };
    //stat mixte moyenne annuelle
    StudentResultStatService.prototype.generateStatMoyAnSchoolClassPdf = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                var chooserData = {
                    titre: 'Choisir la classe', schoolClassChooser: true, decoupageChooser: false
                };
                var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                    width: '600px',
                    data: chooserData
                });
                dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    var url = _this.API_END_POINT + "/statistique-moy-an-school-class/"
                        + chooserModel.schoolClass.id + "/" + chooserModel.year.id + "/"
                        + _this.currentUserId + "/" + progressId;
                    _this.fileService.downloadAndShowPdf(url, "stat_mixte_classe", progressId);
                    observer.next();
                });
            });
        });
    };
    //stat mixte moyenne annuelle niveau
    StudentResultStatService.prototype.generateStatMoyAnStandardPdf = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                var chooserData = {
                    titre: 'Choisir la classe', standardChooser: true, decoupageChooser: false
                };
                var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                    width: '600px',
                    data: chooserData
                });
                dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    var url = _this.API_END_POINT + "/statistique-moy-an-standard/"
                        + chooserModel.standard.id + "/" + chooserModel.year.id + "/"
                        + _this.currentUserId + "/" + progressId;
                    _this.fileService.downloadAndShowPdf(url, "stat_mixte_niveau", progressId);
                    observer.next();
                });
            });
        });
    };
    StudentResultStatService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StudentResultStatService);
    return StudentResultStatService;
}());
exports.StudentResultStatService = StudentResultStatService;
