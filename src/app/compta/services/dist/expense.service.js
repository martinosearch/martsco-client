"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExpenseService = void 0;
var core_1 = require("@angular/core");
var ExpenseService = /** @class */ (function () {
    function ExpenseService(httpClient, appConfigsService) {
        this.httpClient = httpClient;
        this.appConfigsService = appConfigsService;
        // api url
        this.API_MARTSCO = this.appConfigsService.apiUrl;
    }
    ExpenseService.prototype.getAll = function () {
        return this.httpClient.get(this.API_MARTSCO + '/expense/list');
    };
    ExpenseService.prototype.getAllByYear = function (yearId) {
        return this.httpClient.get(this.API_MARTSCO + '/expense/list' + '/' + yearId);
    };
    ExpenseService.prototype.getOne = function (id) {
        return this.httpClient.get(this.API_MARTSCO + '/expense/info/' + id);
    };
    ExpenseService.prototype.getAmountByClass = function (expenseId, standardId, yearId) {
        return this.httpClient.get(this.API_MARTSCO + '/expense/info/' + expenseId + '/' + standardId + '/' + yearId);
    };
    ExpenseService.prototype.save = function (data) {
        return this.httpClient.post(this.API_MARTSCO + '/expense/save', data);
    };
    ExpenseService.prototype["delete"] = function (id) {
        return this.httpClient["delete"](this.API_MARTSCO + '/expense/delete/' + id);
    };
    ExpenseService.prototype.sleep = function (ms) {
        return new Promise(function (resolve) {
            var date = new Date();
            setTimeout(function () {
                resolve(date);
            }, ms);
        });
    };
    ExpenseService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ExpenseService);
    return ExpenseService;
}());
exports.ExpenseService = ExpenseService;
