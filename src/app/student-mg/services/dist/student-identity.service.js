"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentIdentityService = void 0;
var core_1 = require("@angular/core");
var StudentIdentityService = /** @class */ (function () {
    function StudentIdentityService(appConfigsService, httpClient) {
        this.appConfigsService = appConfigsService;
        this.httpClient = httpClient;
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    StudentIdentityService.prototype.getAll = function () {
        return this.httpClient.get(this.API_MARTSCO + "/student-identity/list");
    };
    StudentIdentityService.prototype.getOne = function (studentId) {
        return this.httpClient.get(this.API_MARTSCO + "/student-identity/info/" + studentId);
    };
    StudentIdentityService.prototype["delete"] = function (studentId) {
        return this.httpClient["delete"](this.API_MARTSCO + "/student-identity/delete/" + studentId);
    };
    StudentIdentityService.prototype.save = function (student, schoolClass) {
        var body = { schoolClass: schoolClass, student: student };
        console.log("body" + JSON.stringify(body));
        return this.httpClient.post(this.API_MARTSCO + "/student-identity/save", body);
    };
    StudentIdentityService.prototype.getStudentIdentities = function (studentCursusBeans) {
        return this.httpClient.post(this.API_MARTSCO + "/student-identity/list-identities", studentCursusBeans);
    };
    StudentIdentityService.prototype.getEffectifBeans = function (yearId) {
        var url = this.API_MARTSCO + "/student-identity/effectifs-beans/" + yearId;
        return this.httpClient.get(url);
    };
    StudentIdentityService.prototype.getTotalEffectifBean = function (yearId) {
        var url = this.API_MARTSCO + "/student-identity/total-effectif-bean/" + yearId;
        return this.httpClient.get(url);
    };
    StudentIdentityService.prototype.getNthRegistered = function (yearId, nthRegistered) {
        return this.httpClient.get(this.API_MARTSCO + "/student-identity/nth-registered/" + yearId + "/" + nthRegistered);
    };
    StudentIdentityService.prototype.getIdentityBean = function (identities, studentId) {
        return identities.filter(function (st) { return st.id === studentId; })[0];
    };
    StudentIdentityService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StudentIdentityService);
    return StudentIdentityService;
}());
exports.StudentIdentityService = StudentIdentityService;
