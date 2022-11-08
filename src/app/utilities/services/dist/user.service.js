"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var UserService = /** @class */ (function () {
    function UserService(httpClient, appConfigsService) {
        this.httpClient = httpClient;
        this.appConfigsService = appConfigsService;
        // api url
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    UserService.prototype.getAll = function () {
        return this.httpClient.get(this.API_MARTSCO + '/user/list');
    };
    UserService.prototype.getOne = function (id) {
        return this.httpClient.get(this.API_MARTSCO + '/user/info/' + id);
    };
    UserService.prototype.sleep = function (ms) {
        return new Promise(function (resolve) {
            var date = new Date();
            setTimeout(function () {
                resolve(date);
            }, ms);
        });
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
