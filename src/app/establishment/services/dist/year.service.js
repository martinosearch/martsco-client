"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.YearService = void 0;
var core_1 = require("@angular/core");
var YearService = /** @class */ (function () {
    function YearService(httpClient, routeService, appConfigsService) {
        this.httpClient = httpClient;
        this.routeService = routeService;
        this.appConfigsService = appConfigsService;
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    YearService.prototype.getAll = function () {
        return this.httpClient.get(this.API_MARTSCO + "/year/list");
    };
    YearService.prototype.getOne = function (id) {
        return this.httpClient.get(this.API_MARTSCO + "/year/info/" + id);
    };
    YearService.prototype.save = function (data) {
        return this.httpClient.post(this.API_MARTSCO + "/year/save", data);
    };
    YearService.prototype["delete"] = function (id) {
        return this.httpClient["delete"](this.API_MARTSCO + "/year/delete/" + id);
    };
    YearService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], YearService);
    return YearService;
}());
exports.YearService = YearService;
