"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SchoolClassSettingService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var SchoolClassSettingService = /** @class */ (function () {
    function SchoolClassSettingService(httpClient, routeService, appConfigsService, typeService) {
        this.httpClient = httpClient;
        this.routeService = routeService;
        this.appConfigsService = appConfigsService;
        this.typeService = typeService;
        // api url
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    SchoolClassSettingService.prototype.findOne = function (schoolClassId) {
        return this.httpClient.get(this.API_MARTSCO + '/school-class-settings/info/' + schoolClassId);
    };
    SchoolClassSettingService.prototype.findSubjAttributions = function (bean, yearId) {
        return new rxjs_1.Observable(function (observer) {
            var rst = bean.subjectAttributions.filter(function (item) { return item.year.id === yearId; });
            observer.next(rst);
        });
    };
    SchoolClassSettingService.prototype.findCurrentSetting = function (settingBean, currentYearId) {
        return new rxjs_1.Observable(function (observer) {
            var employee = null;
            for (var _i = 0, _a = settingBean.titulaires; _i < _a.length; _i++) {
                var tit = _a[_i];
                if (tit.year.id === currentYearId) {
                    employee = tit.employee;
                }
            }
            observer.next(employee);
        });
    };
    SchoolClassSettingService.prototype.findEvaluationBean = function (schoolClassId) {
        return this.httpClient.get(this.API_MARTSCO +
            '/school-class-evaluation/info/' + schoolClassId);
    };
    SchoolClassSettingService.prototype.findSubjectBean = function (schoolClassId) {
        return this.httpClient.get(this.API_MARTSCO +
            '/school-class-subject/info/' + schoolClassId);
    };
    SchoolClassSettingService.prototype.saveSettings = function (modelSetting) {
        return this.httpClient.post(this.API_MARTSCO +
            '/school-class-settings/save', modelSetting);
    };
    SchoolClassSettingService.prototype.saveEvaluationSettingBean = function (settingBean) {
        return this.httpClient.post(this.API_MARTSCO +
            '/school-class-evaluation/save', settingBean);
    };
    SchoolClassSettingService.prototype.saveSubjectBean = function (subjectBean) {
        return this.httpClient.post(this.API_MARTSCO +
            '/school-class-subject/save', subjectBean);
    };
    SchoolClassSettingService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SchoolClassSettingService);
    return SchoolClassSettingService;
}());
exports.SchoolClassSettingService = SchoolClassSettingService;
