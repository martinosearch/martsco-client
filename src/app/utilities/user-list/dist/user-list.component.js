"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserListComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var identity_1 = require("src/app/establishment/models/identity");
var confirm_delete_component_1 = require("src/app/utilities/confirm-delete/confirm-delete.component");
var app_user_1 = require("../models/app-user");
var user_form_component_1 = require("./../user-form/user-form.component");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(authService, dialog, employeeService, employeeAuthService, router, routeService) {
        this.authService = authService;
        this.dialog = dialog;
        this.employeeService = employeeService;
        this.employeeAuthService = employeeAuthService;
        this.router = router;
        this.routeService = routeService;
        this.displayedColumns = [
            'num',
            'login',
            'modify',
            'suppr',
            'isConnected'
        ];
        this.users = [];
        this.employeeAuths = [];
    }
    UserListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    UserListComponent.prototype.ngOnDestroy = function () { };
    UserListComponent.prototype.refresh = function () {
        var _this = this;
        this.employeeService.getAll().subscribe({
            next: function (respId) {
                _this.employeeAuthService.getAll().subscribe({
                    next: function (respAuth) {
                        var _loop_1 = function (user) {
                            _this.employeeAuths = respAuth;
                            var appUser = new app_user_1.AppUser();
                            appUser.id = user.id;
                            appUser.login = user.conxInfo.login;
                            appUser.password = user.conxInfo.password;
                            appUser.wasPersonnalized = user.conxInfo.wasPersonnalized;
                            appUser.isAuth = user.conxInfo.isAuth;
                            var userId = respId.filter(function (item) { return item.id === user.id; })[0];
                            if (userId !== undefined) {
                                appUser.identity = userId.identity;
                            }
                            else {
                                appUser.identity = new identity_1.Identity();
                            }
                            _this.users.push(appUser);
                        };
                        for (var _i = 0, respAuth_1 = respAuth; _i < respAuth_1.length; _i++) {
                            var user = respAuth_1[_i];
                            _loop_1(user);
                        }
                        _this.users = _this.users.slice();
                    }
                });
            }
        });
    };
    UserListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.login }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.employeeService["delete"](obj.id).subscribe(function (resp) {
                _this.refresh();
            });
            _this.refresh();
        });
    };
    UserListComponent.prototype.onDetail = function (obj) {
        this.router.navigate([this.routeService.userShowRoute]).then(function (data) {
        });
    };
    UserListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    UserListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(user_form_component_1.UserFormComponent, {
            width: '1000px',
            data: { titre: 'Ajouter un utilisateur', obj: new app_user_1.AppUser() }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.employeeService.save(response.obj).subscribe(function (response2) {
                _this.refresh();
            });
        });
    };
    UserListComponent.prototype.onModify = function (user) {
        var _this = this;
        var data = this.employeeAuths.filter(function (item) { return item.id === user.id; })[0];
        var dialogRef = this.dialog.open(user_form_component_1.UserFormComponent, {
            width: '1000px',
            data: { titre: 'Modifier les infos.', obj: data }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.employeeService.save(response).subscribe(function (response2) {
                _this.refresh();
            });
        });
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'app-user-list',
            templateUrl: './user-list.component.html',
            styleUrls: ['./user-list.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
