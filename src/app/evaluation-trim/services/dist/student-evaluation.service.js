"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MarkData = exports.StudentEvaluationService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var StudentEvaluationService = /** @class */ (function () {
    function StudentEvaluationService(httpClient, appConfigsService) {
        this.httpClient = httpClient;
        this.appConfigsService = appConfigsService;
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    StudentEvaluationService.prototype.saveMark = function (student) {
        //  console.log("markbean to save: " + JSON.stringify(student));
        return this.httpClient.post(this.API_MARTSCO + "/marks/save", student);
    };
    StudentEvaluationService.prototype.findMark = function (evaluationId, subjectId, studentMarkBean) {
        return new rxjs_1.Observable(function (observer) {
            var result = studentMarkBean.marks.filter(function (item) {
                // console.log("mark:" + JSON.stringify(item));
                if (item.evaluation !== null
                    || item.subject !== null) {
                    if (item.evaluation.id === evaluationId
                        && item.subject.id === subjectId) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            })[0];
            var value = result !== undefined ? result.value : undefined;
            observer.next(value);
        });
    };
    StudentEvaluationService.prototype.findAllByClass = function (studentOfThisClass) {
        return this.httpClient.post(this.API_MARTSCO + "/marks/find-all-by-class", studentOfThisClass);
    };
    StudentEvaluationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StudentEvaluationService);
    return StudentEvaluationService;
}());
exports.StudentEvaluationService = StudentEvaluationService;
var MarkData = /** @class */ (function () {
    function MarkData() {
    }
    return MarkData;
}());
exports.MarkData = MarkData;
