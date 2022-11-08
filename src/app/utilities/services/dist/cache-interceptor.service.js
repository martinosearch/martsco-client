"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.cacheInterceptorProviders = exports.CacheInterceptorService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var CacheInterceptorService = /** @class */ (function () {
    function CacheInterceptorService() {
    }
    CacheInterceptorService.prototype.intercept = function (req, next) {
        var httpRequest = req.clone({
            headers: req.headers
                .set('Cache-Control', 'no-cache')
                .set('Pragma', 'no-cache')
                .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        });
        return next.handle(httpRequest);
    };
    CacheInterceptorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CacheInterceptorService);
    return CacheInterceptorService;
}());
exports.CacheInterceptorService = CacheInterceptorService;
exports.cacheInterceptorProviders = {
    provide: http_1.HTTP_INTERCEPTORS,
    useClass: CacheInterceptorService,
    multi: true
};
