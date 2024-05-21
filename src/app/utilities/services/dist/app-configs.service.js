"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppConfigurationFactory = exports.appInitializerProvider = exports.AppConfigsService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var AppConfigsService = /** @class */ (function () {
    function AppConfigsService(httpClient, handler) {
        this.httpClient = httpClient;
        this.handler = handler;
    }
    AppConfigsService.prototype.ensureInit = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpClient = new http_1.HttpClient(_this.handler);
            _this.httpClient.get("./assets/configs/configs.json")
                .subscribe(function (content) {
                Object.assign(_this, content);
                //   console.log("configs load successfuly: " + this.apiUrl);
                resolve(_this);
            }, function (error) {
                console.log("unable to load config file");
                reject(error);
            });
        });
    };
    AppConfigsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppConfigsService);
    return AppConfigsService;
}());
exports.AppConfigsService = AppConfigsService;
exports.appInitializerProvider = {
    provide: core_1.APP_INITIALIZER,
    useFactory: AppConfigurationFactory,
    deps: [AppConfigsService, http_1.HttpClient], multi: true
};
function AppConfigurationFactory(appConfig) {
    return function () { return appConfig.ensureInit(); };
}
exports.AppConfigurationFactory = AppConfigurationFactory;
