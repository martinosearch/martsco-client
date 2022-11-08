"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AssuranceMenuComponent = void 0;
var core_1 = require("@angular/core");
var AssuranceMenuComponent = /** @class */ (function () {
    function AssuranceMenuComponent(router, routeService) {
        this.router = router;
        this.routeService = routeService;
    }
    AssuranceMenuComponent.prototype.ngOnInit = function () {
    };
    AssuranceMenuComponent.prototype.toAssuranceList = function () {
        this.router.navigate([this.routeService.assuranceListRoute]);
    };
    AssuranceMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-assurance-menu',
            templateUrl: './assurance-menu.component.html',
            styleUrls: ['./assurance-menu.component.scss']
        })
    ], AssuranceMenuComponent);
    return AssuranceMenuComponent;
}());
exports.AssuranceMenuComponent = AssuranceMenuComponent;
