"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResultAnnuelDataService = void 0;
var core_1 = require("@angular/core");
var ResultAnnuelDataService = /** @class */ (function () {
    function ResultAnnuelDataService(httpClient, routeService, appConfigsService) {
        this.httpClient = httpClient;
        this.routeService = routeService;
        this.appConfigsService = appConfigsService;
        // api url
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    ResultAnnuelDataService.prototype.getAllAdmis = function (yearId, schoolClassId) {
        return this.httpClient.get(this.API_MARTSCO +
            "/result-annuel/list-admis/" + yearId + "/" + schoolClassId);
    };
    ResultAnnuelDataService.prototype.getAllAjournes = function (yearId, schoolClassId) {
        return this.httpClient.get(this.API_MARTSCO +
            "/result-annuel/list-ajournes/" + yearId + "/" + schoolClassId);
    };
    ResultAnnuelDataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ResultAnnuelDataService);
    return ResultAnnuelDataService;
}());
exports.ResultAnnuelDataService = ResultAnnuelDataService;
