"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.LoginFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var app_user_1 = require("../../security/models/app-user");
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(data, form, employeeService, authService, employeeAuthService) {
        this.data = data;
        this.form = form;
        this.employeeService = employeeService;
        this.authService = authService;
        this.employeeAuthService = employeeAuthService;
        this.model = new app_user_1.AppUser();
        this.types = [];
        this.event = new core_1.EventEmitter();
        this.hide = true;
        this.employees = [];
        this.users = [];
        this.loginExists = false;
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.employeeService.getAll().subscribe(function (resp) {
            _this.employees = resp;
        });
        this.employeeAuthService.getAll().subscribe(function (resp) {
            _this.users = resp;
        });
        if (this.data.obj !== undefined) {
            this.model = this.data.obj;
        }
    };
    LoginFormComponent.prototype.ngOnDestroy = function () {
        this.model = undefined;
    };
    LoginFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    LoginFormComponent.prototype.userExists = function () {
        var _loop_1 = function (user) {
            //console.log("loops: " + user.conxInfo.login);
            if (user.conxInfo.login === this_1.model.login) {
                this_1.loginExists = true;
                this_1.currentEmployee = this_1.employees.filter(function (empl) { return empl.id === user.id; })[0];
                this_1.model.password = undefined;
                return "break";
            }
            else {
                this_1.loginExists = false;
                this_1.currentEmployee = undefined;
            }
        };
        var this_1 = this;
        // console.log("je suis appelé... employees size: " + this.employees.length);
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            var state_1 = _loop_1(user);
            if (state_1 === "break")
                break;
        }
        if (this.loginExists) {
            this.resolveLogin(500).then(function (password) {
                password.nativeElement.focus();
            });
        }
    };
    LoginFormComponent.prototype.resolveLogin = function (ms) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(_this.password);
            }, ms);
        });
    };
    LoginFormComponent.prototype.onSubmit = function () {
        this.model.isAuth = false;
        this.authService.login(this.model.login, this.model.password);
        this.form.close();
    };
    __decorate([
        core_1.ViewChild('password', { static: false })
    ], LoginFormComponent.prototype, "password");
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
