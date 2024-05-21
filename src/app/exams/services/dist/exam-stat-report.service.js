"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExamStatReportService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var exam_chooser_component_1 = require("../exam-chooser/exam-chooser.component");
var ExamStatReportService = /** @class */ (function () {
    function ExamStatReportService(dialog, fileService, authService, appConfigsService, progressService) {
        var _this = this;
        this.dialog = dialog;
        this.fileService = fileService;
        this.authService = authService;
        this.appConfigsService = appConfigsService;
        this.progressService = progressService;
        // API url;
        this.API = this.appConfigsService.apiUrl;
        authService.currentUserSubj.subscribe(function (resp) {
            _this.currentUserId = resp;
        });
    }
    ExamStatReportService.prototype.generateStatEstablishmentPdf = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            var dialogRef = _this.dialog.open(exam_chooser_component_1.ExamChooserComponent, {
                width: '600px',
                data: { titre: 'Choisir les paramètres', isEstablishmentChooser: true }
            });
            dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                _this.progressService.getNewProgressId().subscribe(function (progressId) {
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    console.log(JSON.stringify(chooserModel));
                    var url = _this.API + "/exam-stat/stat-establishment/" + chooserModel.exam.id + "/" + chooserModel.establishment.id + "/" + _this.currentUserId + "/" + progressId;
                    console.log(url);
                    _this.fileService.downloadAndShowPdf(url, "stat_" + chooserModel.establishment.designation + "-" + chooserModel.exam.designation, progressId);
                    return observer.next();
                });
            });
        });
    };
    ExamStatReportService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ExamStatReportService);
    return ExamStatReportService;
}());
exports.ExamStatReportService = ExamStatReportService;
