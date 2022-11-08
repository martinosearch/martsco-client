"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InfoService = void 0;
var core_1 = require("@angular/core");
var InfoService = /** @class */ (function () {
    function InfoService(httpClient, routeService) {
        this.httpClient = httpClient;
        this.routeService = routeService;
    }
    InfoService.prototype.getListTypeUser = function () {
        return this.httpClient.get(this.routeService.userTypeUrl);
    };
    InfoService.prototype.getUserType = function (id) {
        this.getListTypeUser().subscribe(function (response) {
            for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                var type = response_1[_i];
                if (type.id === id) {
                    return type;
                }
            }
        });
        return null;
    };
    InfoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], InfoService);
    return InfoService;
}());
exports.InfoService = InfoService;
