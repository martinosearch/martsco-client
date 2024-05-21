"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuComponent = void 0;
var core_1 = require("@angular/core");
var login_form_component_1 = require("../login-form/login-form.component");
var MenuComponent = /** @class */ (function () {
    function MenuComponent(constanceService, dialog, authService, yearService, router, routeService, utilRouteService) {
        this.constanceService = constanceService;
        this.dialog = dialog;
        this.authService = authService;
        this.yearService = yearService;
        this.router = router;
        this.routeService = routeService;
        this.utilRouteService = utilRouteService;
        this.years = [];
    }
    MenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.yearId = resp.id;
            _this.yearService.getAll().subscribe(function (resp) {
                _this.years = resp;
            });
            _this.authService.currentUserSubj.subscribe(function (resp) {
                _this.currentUserId = resp;
            });
        });
    };
    MenuComponent.prototype.login = function () {
        var _this = this;
        var dialogRef = this.dialog.open(login_form_component_1.LoginFormComponent, {
            width: '400px',
            data: { titre: 'Connexion' }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.authService.login(response.login, response.password);
        });
    };
    MenuComponent.prototype.logout = function () {
        this.authService.logout();
    };
    MenuComponent.prototype.yearControl = function () {
        this.constanceService.refreshYearById(this.yearId);
    };
    MenuComponent.prototype.toAccueil = function () {
        this.constanceService.toAccueil();
    };
    MenuComponent.prototype.toForfaitState = function () {
        this.router.navigate([this.routeService.forfaitStateRoute]);
    };
    MenuComponent.prototype.toYearList = function () {
        this.router.navigate([this.routeService.yearListRoute]);
    };
    MenuComponent.prototype.toJournal = function () {
        this.router.navigate([this.utilRouteService.journalRoute]);
    };
    MenuComponent.prototype.toUserList = function () {
        this.router.navigate([this.routeService.userListRoute]);
    };
    MenuComponent.prototype.toUserParams = function () {
        this.router.navigate([this.utilRouteService.userParamsRoute]);
    };
    MenuComponent.prototype.toUserDashBoard = function () {
        this.router.navigate([this.utilRouteService.userDashBoardRoute]);
    };
    MenuComponent.prototype.toParamSoft = function () {
        this.router.navigate([this.routeService.paramSchoolRoute]);
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.scss']
        })
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
