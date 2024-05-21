"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstablishmentTypeService = void 0;
var core_1 = require("@angular/core");
var EstablishmentTypeService = /** @class */ (function () {
    function EstablishmentTypeService(httpClient, routeService) {
        this.httpClient = httpClient;
        this.routeService = routeService;
    }
    EstablishmentTypeService.prototype.getAll = function () {
        return this.httpClient.get(this.routeService.establishmentTypeListeUrl);
    };
    EstablishmentTypeService.prototype.getOne = function (id) {
        return this.httpClient.get(this.routeService.establishmentTypeInfoUrl + id);
    };
    EstablishmentTypeService.prototype.save = function (data) {
        return this.httpClient.post(this.routeService.establishmentTypeSaveUrl, data);
    };
    EstablishmentTypeService.prototype["delete"] = function (id) {
        return this.httpClient["delete"](this.routeService.establishmentTypeDeleteUrl + id);
    };
    EstablishmentTypeService.prototype.sleep = function (ms) {
        return new Promise(function (resolve) {
            var date = new Date();
            setTimeout(function () {
                resolve(date);
            }, ms);
        });
    };
    EstablishmentTypeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EstablishmentTypeService);
    return EstablishmentTypeService;
}());
exports.EstablishmentTypeService = EstablishmentTypeService;
