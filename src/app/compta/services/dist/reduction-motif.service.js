"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReductionMotifService = void 0;
var core_1 = require("@angular/core");
var ReductionMotifService = /** @class */ (function () {
    function ReductionMotifService(httpClient, appConfigsService, routeService) {
        this.httpClient = httpClient;
        this.appConfigsService = appConfigsService;
        this.routeService = routeService;
        // api url
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    ReductionMotifService.prototype.getAll = function () {
        return this.httpClient.get(this.API_MARTSCO + '/reduction-motive/list');
    };
    ReductionMotifService.prototype.getOne = function (id) {
        return this.httpClient.get(this.API_MARTSCO + '/reduction-motive/info/' + id);
    };
    ReductionMotifService.prototype.save = function (data) {
        return this.httpClient.post(this.API_MARTSCO + '/reduction-motive/save', data);
    };
    ReductionMotifService.prototype["delete"] = function (id) {
        return this.httpClient["delete"](this.API_MARTSCO + '/reduction-motive/delete/' + id);
    };
    ReductionMotifService.prototype.sleep = function (ms) {
        return new Promise(function (resolve) {
            var date = new Date();
            setTimeout(function () {
                resolve(date);
            }, ms);
        });
    };
    ReductionMotifService.prototype.refresh = function () {
        this.getAll();
    };
    ReductionMotifService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ReductionMotifService);
    return ReductionMotifService;
}());
exports.ReductionMotifService = ReductionMotifService;
