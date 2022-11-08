"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentCursusService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var student_cursus_1 = require("../models/student-cursus");
var StudentCursusService = /** @class */ (function () {
    function StudentCursusService(httpClient, pdfViewerService, authService, typeService, appConfigsService, progressService) {
        var _this = this;
        this.httpClient = httpClient;
        this.pdfViewerService = pdfViewerService;
        this.authService = authService;
        this.typeService = typeService;
        this.appConfigsService = appConfigsService;
        this.progressService = progressService;
        // api url
        this.API_MARTSCO = this.appConfigsService.apiUrl;
        this.types = [];
        this.authService.currentUserSubj.subscribe(function (resp) {
            _this.currentUserId = resp;
        });
    }
    StudentCursusService.prototype.getAllByYear = function (yearId) {
        console.log("getting all student");
        return this.httpClient.get(this.API_MARTSCO + "/student-cursus/list/" + yearId);
    };
    StudentCursusService.prototype.getAllByClass = function (classId, yearId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-cursus/list/" + classId + "/" + yearId);
    };
    StudentCursusService.prototype.getOne = function (studentId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-cursus/info/" + studentId);
    };
    StudentCursusService.prototype.getOneByYear = function (studentId, yearId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-cursus/info/" + studentId + "/" + yearId);
    };
    StudentCursusService.prototype.save = function (student, schoolClass, year, schooling) {
        var curs = new student_cursus_1.StudentCursus();
        curs.schoolClass = schoolClass;
        curs.year = year;
        curs.schooling = schooling;
        var body = { studentIdentityBean: student, studentCursus: curs };
        console.log("student cursus bean:" + JSON.stringify(body));
        return this.httpClient.post(this.API_MARTSCO + "/student-cursus/save", body);
    };
    StudentCursusService.prototype.importExcel = function (classParam, file) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                observer.next(progressId);
                observer.next(_this.progressService.getProgress(progressId));
                var data = new FormData();
                data.append('file', file);
                console.log(">>> posting file:" + JSON.stringify(file));
                var action = _this.httpClient.post(_this.API_MARTSCO + "/student-cursus/import-excel/" +
                    classParam.schoolClass.id + "/" + classParam.year.id + "/" + _this.currentUserId
                    + "/" + progressId, data);
                action.subscribe(function (resp) {
                    observer.next(resp);
                }, function (error) {
                    observer.error(error);
                }, function () {
                    observer.next();
                });
            });
        });
    };
    StudentCursusService.prototype.deleteCursus = function (studentId, yearId) {
        console.log('to be delete: ' + studentId + ' year : ' + yearId);
        return this.httpClient["delete"](this.API_MARTSCO + "/student-cursus/cursus-delete/" + studentId + "/" + yearId);
    };
    StudentCursusService.prototype.deleteAllCursus = function (stagged, yearId) {
        return this.httpClient.post(this.API_MARTSCO + "/student-cursus/cursus-all-delete/" + yearId, stagged);
    };
    StudentCursusService.prototype.setAsRedoublantAll = function (stagged, yearId) {
        return this.httpClient.post(this.API_MARTSCO + "/student-cursus/set-as-redoublant-all/" + yearId, stagged);
    };
    StudentCursusService.prototype.getTypes = function () {
        return this.typeService.getAll();
    };
    StudentCursusService.prototype.getCurrentCursus = function (studentId, currentYearId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-cursus/current-cursus/" + studentId + "/" + currentYearId);
    };
    StudentCursusService.prototype.getCurrentCursusFromList = function (cursusList, studentId, yearId) {
        return new rxjs_1.Observable(function (observer) {
            var result = cursusList.filter(function (item) { return item.id === studentId; })[0];
            if (result !== undefined) {
                var curs = result.cursuses.filter(function (item) { return item.year.id === yearId; })[0];
                observer.next(curs);
            }
        });
    };
    StudentCursusService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StudentCursusService);
    return StudentCursusService;
}());
exports.StudentCursusService = StudentCursusService;
