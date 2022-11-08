"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ParamSchoolComponent = void 0;
var core_1 = require("@angular/core");
var ParamSchoolComponent = /** @class */ (function () {
    function ParamSchoolComponent(authService, dialog, actionService, progressService, employeeService, softService, settingService, studentService) {
        this.authService = authService;
        this.dialog = dialog;
        this.actionService = actionService;
        this.progressService = progressService;
        this.employeeService = employeeService;
        this.softService = softService;
        this.settingService = settingService;
        this.studentService = studentService;
        this.isRunning = false;
        this.isDownloading = false;
    }
    ParamSchoolComponent.prototype.ngOnInit = function () {
    };
    ParamSchoolComponent.prototype.onSubmit = function () {
    };
    ParamSchoolComponent.prototype.onMakeCorrections = function () {
        var _this = this;
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            _this.softService.makeCorrections().subscribe(function (resp) {
                _this.actionService.stopWaiting(progressId);
                console.log('resolved!!!!' + resp);
            });
        });
    };
    ParamSchoolComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    ParamSchoolComponent = __decorate([
        core_1.Component({
            selector: 'app-param-school',
            templateUrl: './param-school.component.html',
            styleUrls: ['./param-school.component.scss']
        })
    ], ParamSchoolComponent);
    return ParamSchoolComponent;
}());
exports.ParamSchoolComponent = ParamSchoolComponent;
