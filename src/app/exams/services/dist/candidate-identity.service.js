"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CandidateIdentityService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var CandidateIdentityService = /** @class */ (function () {
    function CandidateIdentityService(httpClient, appConfigsService, progressService, authService) {
        var _this = this;
        this.httpClient = httpClient;
        this.appConfigsService = appConfigsService;
        this.progressService = progressService;
        this.authService = authService;
        this.API = this.appConfigsService.apiUrl;
        this.authService.currentUserSubj.subscribe(function (resp) {
            _this.currentUserId = resp;
        });
    }
    CandidateIdentityService.prototype.save = function (model) {
        return this.httpClient.post(this.API + "/candidate-identity/save", model);
    };
    CandidateIdentityService.prototype.getAll = function (examId) {
        return this.httpClient.get(this.API + "/candidate-identity/list/" + examId);
    };
    CandidateIdentityService.prototype.getAllByTableNumber = function (examId) {
        return this.httpClient.get(this.API + "/candidate-identity/list-by-num-table/" + examId);
    };
    CandidateIdentityService.prototype["delete"] = function (id) {
        return this.httpClient["delete"](this.API + '/candidate-identity/delete/' + id);
    };
    CandidateIdentityService.prototype.getOne = function (id) {
        return this.httpClient.get(this.API + "/candidate-identity/info/" + id);
    };
    CandidateIdentityService.prototype.importExcel = function (exam, establishment, file) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                observer.next(progressId);
                observer.next(_this.progressService.getProgress(progressId));
                var data = new FormData();
                data.append('file', file);
                //console.log(">>> posting file:" + JSON.stringify(file));
                var action = _this.httpClient.post(_this.API + "/candidate-identity/import-excel/" +
                    exam.id + "/" + establishment.id + "/" + _this.currentUserId
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
    CandidateIdentityService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CandidateIdentityService);
    return CandidateIdentityService;
}());
exports.CandidateIdentityService = CandidateIdentityService;
