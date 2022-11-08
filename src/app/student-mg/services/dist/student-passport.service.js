"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentPassportService = void 0;
var core_1 = require("@angular/core");
var StudentPassportService = /** @class */ (function () {
    function StudentPassportService(appConfigsService, httpClient) {
        this.appConfigsService = appConfigsService;
        this.httpClient = httpClient;
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    StudentPassportService.prototype.getCurrentPassport = function (studentId, currentYearId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-passport/current-passport/"
            + studentId + "/" + currentYearId);
    };
    StudentPassportService.prototype.save = function (studentIdentityBean, year, passport) {
        var body = { "studentIdentityBean": studentIdentityBean, "year": year, "passport": passport };
        return this.httpClient.post(this.API_MARTSCO
            + "/student-passport/save/", body);
    };
    StudentPassportService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StudentPassportService);
    return StudentPassportService;
}());
exports.StudentPassportService = StudentPassportService;
