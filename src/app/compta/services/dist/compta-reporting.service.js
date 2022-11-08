"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComptaReportingService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var class_chooser_form_component_1 = require("../../establishment/school-class-chooser-form/class-chooser-form.component");
var ComptaReportingService = /** @class */ (function () {
    function ComptaReportingService(dialog, studentService, constanceService, progressService, routeService, httpClient, fileService, pdfViewerService, authService, appConfigsService) {
        var _this = this;
        this.dialog = dialog;
        this.studentService = studentService;
        this.constanceService = constanceService;
        this.progressService = progressService;
        this.routeService = routeService;
        this.httpClient = httpClient;
        this.fileService = fileService;
        this.pdfViewerService = pdfViewerService;
        this.authService = authService;
        this.appConfigsService = appConfigsService;
        // API url;
        this.API_MARTSCO = this.appConfigsService.apiUrl;
        this.API_END_POINT = this.API_MARTSCO + '/doc-compta';
        authService.currentUserSubj.subscribe(function (resp) {
            _this.currentUserId = resp;
        });
    }
    ComptaReportingService.prototype.paymentStatementPerClass = function () {
        var _this = this;
        console.log("I am called for paymentStatement");
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                observer.next(_this.progressService.getProgress(progressId));
                var chooserData = { titre: 'Choisir la classe', expenseChooser: true };
                var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                    width: '600px',
                    data: chooserData
                });
                dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                    var url = _this.API_END_POINT + "/payment-statement/" + chooserModel.expense.id + "/" + chooserModel.schoolClass.id + "\n            /" + chooserModel.year.id + "/" + _this.currentUserId + "/" + progressId;
                    _this.fileService.downloadAndShowPdf(url, "bordereau_payement", progressId);
                    return observer.next();
                });
            });
        });
    };
    ComptaReportingService.prototype.generateReceiptOf = function (student, serial, option) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                observer.next(_this.progressService.getProgress(progressId));
                var url = _this.API_END_POINT + "/payment-receipt/" + serial + "/" + _this.currentUserId + "/" + progressId;
                if (option === 0) {
                    _this.downloadReceipt(url, student);
                }
                else {
                    _this.downloadAndPrintReceipt(url, student);
                }
            });
        });
    };
    ComptaReportingService.prototype.downloadAndPrintReceipt = function (url, student) {
        var _this = this;
        var httpOptions = { responseType: 'blob' };
        this.httpClient.post(url, student, httpOptions).subscribe(function (response) {
            var pdf = new Blob([response], { type: 'application/pdf' });
            var fileURL = window.URL.createObjectURL(pdf);
            console.log('file downloaded !');
            _this.fileService.printUrl(fileURL);
        }, function (error) {
            console.log('Error downloading ' + error);
        });
    };
    ComptaReportingService.prototype.downloadReceipt = function (url, student) {
        var _this = this;
        var httpOptions = { responseType: 'blob' };
        this.httpClient.post(url, student, httpOptions).subscribe(function (response) {
            var pdf = new Blob([response], { type: "application/pdf" });
            _this.pdfViewerService.show(pdf);
            console.log('file downloaded !');
        }, function (error) {
            console.log('Error downloading ' + error);
        });
    };
    ComptaReportingService.prototype.getNewReceiptSerial = function (studentId, currentYearId) {
        var url = this.API_END_POINT + "/new-receipt-serial/" + studentId + "/" + currentYearId;
        return this.httpClient.get(url);
    };
    ComptaReportingService.BULLETIN = 1;
    ComptaReportingService.RESULT_GEN = 2;
    ComptaReportingService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ComptaReportingService);
    return ComptaReportingService;
}());
exports.ComptaReportingService = ComptaReportingService;
