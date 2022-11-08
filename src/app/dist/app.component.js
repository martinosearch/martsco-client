"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, routeService, yearService, constanceService, authService, establishmentService, fileService) {
        this.router = router;
        this.routeService = routeService;
        this.yearService = yearService;
        this.constanceService = constanceService;
        this.authService = authService;
        this.establishmentService = establishmentService;
        this.fileService = fileService;
        this.viewHeight = 300;
        this.title = 'MartSCO';
        this.isAcceuil = true;
        this.events = [];
        this.opened = true;
        this.isRunning = false;
        this.shouldRun = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.viewHeight = window.innerHeight - 150;
        this.establishmentService.getThisEstablishment().subscribe(function (resp) {
            _this.thisEstablishmentName = resp.type.dim + " | " + resp.identity.name;
        });
    };
    AppComponent.prototype.onResize = function (event) {
        this.viewHeight = window.innerHeight - 150;
    };
    __decorate([
        core_1.ViewChild('wrapper', { static: false })
    ], AppComponent.prototype, "wrapper");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], AppComponent.prototype, "onResize");
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
