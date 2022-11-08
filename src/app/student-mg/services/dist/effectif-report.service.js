"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EffectifReportService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var class_chooser_form_component_1 = require("src/app/establishment/school-class-chooser-form/class-chooser-form.component");
var EffectifReportService = /** @class */ (function () {
    function EffectifReportService(dialog, studentService, routeService, httpClient, fileService, pdfViewerService, authService, appConfigsService, constanceService, progressService) {
        var _this = this;
        this.dialog = dialog;
        this.studentService = studentService;
        this.routeService = routeService;
        this.httpClient = httpClient;
        this.fileService = fileService;
        this.pdfViewerService = pdfViewerService;
        this.authService = authService;
        this.appConfigsService = appConfigsService;
        this.constanceService = constanceService;
        this.progressService = progressService;
        // API url;
        this.API_MARTSCO = this.appConfigsService.apiUrl;
        this.API_END_POINT = this.API_MARTSCO + '/doc-effectif';
        authService.currentUserSubj.subscribe(function (resp) {
            _this.currentUserId = resp;
        });
    }
    // generation of list_class
    EffectifReportService.prototype.generateListClassNominativeOf = function (type) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            var chooserData = { titre: 'Choisir la classe' };
            var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                width: '600px',
                data: chooserData
            });
            dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                _this.progressService.getNewProgressId().subscribe(function (progressId) {
                    var classDesignation = chooserModel.schoolClass.designation;
                    var fileName = "liste_nominative_" + classDesignation;
                    var url = _this.API_END_POINT + "/list-class-nominative-pdf/" + chooserModel.schoolClass.id
                        + "/" + chooserModel.year.id + "/" + _this.currentUserId + "/" + progressId;
                    if (type === 2) {
                        fileName = "liste_de_presence_" + classDesignation;
                        url = _this.API_END_POINT + "/list-class-presence-pdf/" + chooserModel.schoolClass.id +
                            "/" + chooserModel.year.id + "/" + _this.currentUserId + "/" + progressId;
                    }
                    if (type === 3) {
                        fileName = "liste_fiche_de_notes_4_" + classDesignation;
                        url = _this.API_END_POINT + "/list-class-4-notes-pdf/" + chooserModel.schoolClass.id +
                            "/" + chooserModel.year.id + "/" + _this.currentUserId + "/" + progressId;
                    }
                    if (type === 4) {
                        fileName = "liste_fiche_de_notes_10_" + classDesignation;
                        url = _this.API_END_POINT + "/list-class-10-notes-pdf/" + chooserModel.schoolClass.id +
                            "/" + chooserModel.year.id + "/" + _this.currentUserId + "/" + progressId;
                    }
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    _this.fileService.downloadAndShowPdf(url, fileName, progressId);
                    return observer.next();
                });
            });
        });
    };
    // generation of list_class
    EffectifReportService.prototype.generateFormulaireImportList = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                observer.next(_this.progressService.getProgress(progressId));
                console.log("ask for download formule import list");
                var url = _this.API_END_POINT + "/formulaire-import-list";
                _this.fileService.downloadExcel(url, "liste_import");
                return observer.next();
            });
        });
    };
    EffectifReportService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EffectifReportService);
    return EffectifReportService;
}());
exports.EffectifReportService = EffectifReportService;
