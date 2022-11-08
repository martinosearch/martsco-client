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
exports.UserFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var employee_auth_1 = require("../models/employee-auth");
var UserFormComponent = /** @class */ (function () {
    function UserFormComponent(data, form, employeeService, userTypeService) {
        this.data = data;
        this.form = form;
        this.employeeService = employeeService;
        this.userTypeService = userTypeService;
        this.model = new employee_auth_1.EmployeeAuth();
        this.event = new core_1.EventEmitter();
        this.employees = new rxjs_1.Observable();
        this.userTypes = new rxjs_1.Observable();
    }
    UserFormComponent.prototype.ngOnInit = function () {
        this.model = this.data.obj;
        this.userId = this.model.id;
        this.userTypeId = this.model.userType ? this.model.userType.id : undefined;
        this.employees = this.employeeService.getAll();
        this.userTypes = this.userTypeService.getAll();
    };
    UserFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    UserFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.employeeService.getOne(this.userId).subscribe(function (response) {
            response.conxInfo.login = _this.model.conxInfo.login;
            response.conxInfo.password = _this.model.conxInfo.password;
            _this.userTypeService.getOne(_this.userTypeId).subscribe(function (resp) {
                response.conxInfo.userType = resp;
                response.conxInfo.isAuth = false;
                _this.event.emit(response);
                _this.form.close();
            });
        });
    };
    UserFormComponent = __decorate([
        core_1.Component({
            selector: 'app-user-form',
            templateUrl: './user-form.component.html',
            styleUrls: ['./user-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;
