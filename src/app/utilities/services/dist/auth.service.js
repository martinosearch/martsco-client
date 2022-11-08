"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var user_type_1 = require("../models/user-type");
var AuthService = /** @class */ (function () {
    function AuthService(dialog, snackBar, appConfigService, httpClient, router, userTypeService, tokenStorageService, messageService) {
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.appConfigService = appConfigService;
        this.httpClient = httpClient;
        this.router = router;
        this.userTypeService = userTypeService;
        this.tokenStorageService = tokenStorageService;
        this.messageService = messageService;
        this.listUser = [];
        this.currentUserSubj = new rxjs_1.ReplaySubject();
        this.superAdmin = new user_type_1.UserType();
        this.API = this.appConfigService.apiUrl;
        // for production
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.isCaissier = false;
        this.isSecretaire = false;
        this.isSuperAdmin = false;
        this.isComptable = false;
        this.updateCurrentUser();
        //for development
        // this.isAuthenticated = true;
        // this.isAdmin = true;
    }
    AuthService.prototype.login = function (login, password) {
        var _this = this;
        console.log(" reception login: " + login + " password: " + password);
        var body = { username: login, password: password };
        this.httpClient.post(this.API + "/login", body).subscribe(function (response) {
            _this.tokenStorageService.saveToken(response);
            _this.isAuthenticated = true;
            _this.messageService.showSucces("Authentifié", true);
            _this.setRoles();
            _this.updateCurrentUser();
        }, function (error) {
            _this.isAuthenticated = false;
            _this.messageService.showReject("Accès refusé", true);
        });
    };
    AuthService.prototype.updateCurrentUser = function () {
        var _this = this;
        //set App user id
        this.findUserIdByLogin(this.tokenStorageService.getUserLogin()).subscribe(function (resp) {
            if (resp !== undefined) {
                _this.currentUserSubj.next(resp);
            }
        });
    };
    AuthService.prototype.findUserIdByLogin = function (login) {
        if (login !== null && login !== undefined) {
            return this.httpClient.get(this.API + "/employee-auth/find-user-id-by-login/" + login);
        }
        else {
            return rxjs_1.of(undefined);
        }
    };
    AuthService.prototype.logout = function () {
        this.tokenStorageService.removeAuthToken();
        this.removeRoles();
        this.router.navigate(["/"]);
    };
    AuthService.prototype.removeRoles = function () {
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.isSuperAdmin = false;
        this.isCaissier = false;
        this.isSecretaire = false;
        this.isComptable = false;
    };
    AuthService.prototype.setRoles = function () {
        var authorities = this.tokenStorageService.getUserAuthorities();
        console.log("authorities: " + authorities);
        if (authorities) {
            for (var _i = 0, authorities_1 = authorities; _i < authorities_1.length; _i++) {
                var auth = authorities_1[_i];
                if (auth.authority === "ROLE_ADMIN") {
                    this.isAdmin = true;
                }
                else if (auth.authority === "ROLE_CAISSIER") {
                    this.isCaissier = true;
                }
                else if (auth.authority === "ROLE_SECRETAIRE") {
                    this.isSecretaire = true;
                }
                else if (auth.authority === "ROLE_SUPER_ADMIN") {
                    this.isSuperAdmin = true;
                }
                else if (auth.authority === "ROLE_COMPTABLE") {
                    this.isComptable = true;
                }
            }
        }
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
