"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstablishmentService = void 0;
var core_1 = require("@angular/core");
var EstablishmentService = /** @class */ (function () {
    function EstablishmentService(httpClient, appConfigsService, routeService) {
        this.httpClient = httpClient;
        this.appConfigsService = appConfigsService;
        this.routeService = routeService;
        // api url
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    EstablishmentService.prototype.getAll = function () {
        return this.httpClient.get(this.API_MARTSCO + '/establishment-identity/list');
    };
    EstablishmentService.prototype.getOne = function (id) {
        return this.httpClient.get(this.API_MARTSCO + '/establishment-identity/info/' + id);
    };
    EstablishmentService.prototype.getThisEstablishment = function () {
        return this.httpClient.get(this.API_MARTSCO + '/establishment-identity/my-agency');
    };
    EstablishmentService.prototype.save = function (data) {
        return this.httpClient.post(this.API_MARTSCO + '/establishment-identity/save', data);
    };
    EstablishmentService.prototype["delete"] = function (id) {
        return this.httpClient["delete"](this.API_MARTSCO + '/establishment-identity/delete/' + id);
    };
    EstablishmentService.prototype.getSettingBean = function (id) {
        return this.httpClient.get(this.API_MARTSCO + '/establishment-setting/info/' + id);
    };
    EstablishmentService.prototype.saveSettingBean = function (data) {
        return this.httpClient.post(this.API_MARTSCO + '/establishment-setting/save', data);
    };
    EstablishmentService.prototype.getImageBean = function (id) {
        return this.httpClient.get(this.API_MARTSCO + '/establishment-image/info/' + id);
    };
    EstablishmentService.prototype.saveImageBean = function (data) {
        return this.httpClient.post(this.API_MARTSCO + '/establishment-image/save', data);
    };
    EstablishmentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EstablishmentService);
    return EstablishmentService;
}());
exports.EstablishmentService = EstablishmentService;
