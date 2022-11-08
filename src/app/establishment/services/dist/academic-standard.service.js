"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AcademicStandardService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var AcademicStandardService = /** @class */ (function () {
    function AcademicStandardService(httpClient, routeService, typeService, appConfigsService) {
        this.httpClient = httpClient;
        this.routeService = routeService;
        this.typeService = typeService;
        this.appConfigsService = appConfigsService;
        this.types = [];
        // api url
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    AcademicStandardService.prototype.getAll = function () {
        return this.httpClient.get(this.API_MARTSCO + '/academic-standard/list');
    };
    AcademicStandardService.prototype.getOne = function (id) {
        return this.httpClient.get(this.API_MARTSCO + '/academic-standard/info/' + id);
    };
    AcademicStandardService.prototype.getAcademicStandardBullResultModel = function (id) {
        return this.httpClient.get(this.API_MARTSCO + '/academic-standard-settings/info/' + id);
    };
    AcademicStandardService.prototype.saveIdentity = function (data) {
        return this.httpClient.post(this.API_MARTSCO + '/academic-standard/save', data);
    };
    AcademicStandardService.prototype.saveSettings = function (data) {
        return this.httpClient.post(this.API_MARTSCO + '/academic-standard-settings/save', data);
    };
    AcademicStandardService.prototype["delete"] = function (id) {
        return this.httpClient["delete"](this.API_MARTSCO + '/academic-standard/delete/' + id);
    };
    AcademicStandardService.prototype.sleep = function (ms) {
        return new Promise(function (resolve) {
            var date = new Date();
            setTimeout(function () {
                resolve(date);
            }, ms);
        });
    };
    AcademicStandardService.prototype.getCurrentSetting = function (standardSettingBean, yearId) {
        return new rxjs_1.Observable(function (observer) {
            var result = standardSettingBean.settings.filter(function (set) { return set.year.id === yearId; })[0];
            observer.next(result);
        });
    };
    AcademicStandardService.prototype.findCoefForThisYear = function (settingBean, yearId) {
        return new rxjs_1.Observable((function (observer) {
            var rest = settingBean.coefAttributions
                .filter(function (attrib) { return (attrib.year.id === yearId); });
            observer.next(rest);
        }));
    };
    AcademicStandardService.prototype.findCoefsForOtherYear = function (settingBean, yearId) {
        return new rxjs_1.Observable((function (observer) {
            var rest = settingBean.coefAttributions.filter(function (attrib) { return (attrib.year.id !== yearId); });
            observer.next(rest);
        }));
    };
    AcademicStandardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AcademicStandardService);
    return AcademicStandardService;
}());
exports.AcademicStandardService = AcademicStandardService;
