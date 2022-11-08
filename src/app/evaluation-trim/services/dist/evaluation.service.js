"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EvaluationService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var EvaluationService = /** @class */ (function () {
    function EvaluationService(httpClient, routeService, appConfigsService) {
        this.httpClient = httpClient;
        this.routeService = routeService;
        this.appConfigsService = appConfigsService;
        this.types = [];
        // api url
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    EvaluationService.prototype.getAll = function () {
        return this.httpClient.get(this.API_MARTSCO + '/evaluation/list');
    };
    EvaluationService.prototype.getOne = function (id) {
        return this.httpClient.get(this.API_MARTSCO + '/evaluation/info/' + id);
    };
    EvaluationService.prototype.save = function (data) {
        return this.httpClient.post(this.API_MARTSCO + '/evaluation/save', data);
    };
    EvaluationService.prototype["delete"] = function (id) {
        return this.httpClient["delete"](this.API_MARTSCO + '/evaluation/delete/' + id);
    };
    EvaluationService.prototype.sleep = function (ms) {
        return new Promise(function (resolve) {
            var date = new Date();
            setTimeout(function () {
                resolve(date);
            }, ms);
        });
    };
    EvaluationService.prototype.findEvaluationSettings = function (schoolClassId, yearId) {
        return this.httpClient.get(this.API_MARTSCO + "/evaluation/settings/" + schoolClassId + "/" + yearId);
    };
    EvaluationService.prototype.findEvaluationSettingsByStandard = function (standardId, yearId) {
        return this.httpClient.get(this.API_MARTSCO + "/evaluation/settings-by-standard/" + standardId + "/" + yearId);
    };
    EvaluationService.prototype.findNotesOf = function (studentId, evaluationId, subjectId, schoolId, standardId, yearId) {
        return this.httpClient.get(this.API_MARTSCO + "/marks/find/" + studentId + "/" + evaluationId + "/" + subjectId
            + "/" + schoolId + "/" + standardId + "/" + yearId);
    };
    EvaluationService.prototype.findAllEvaluationWithIndex = function (evaluations, currentYear, index) {
        return new rxjs_1.Observable(function (observer) {
            var rst = evaluations.filter(function (elmt) { return (elmt.year.id === currentYear.id
                && elmt.decoupage.index === index); });
            observer.next(rst);
        });
    };
    EvaluationService.prototype.findEvaluationOfThisTrimestre = function (decoupageId, yearId) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            //filter to only evaluations of this trimestre
            _this.getAll().subscribe(function (resp) {
                var evaluations = resp.filter(function (item) { return (item.decoupage.id === decoupageId
                    && item.year.id === yearId); });
                observer.next(evaluations);
            });
        });
    };
    EvaluationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EvaluationService);
    return EvaluationService;
}());
exports.EvaluationService = EvaluationService;
