"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CurrentClass = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var CurrentClass = /** @class */ (function () {
    function CurrentClass(studentCursusService, constanceService) {
        var _this = this;
        this.studentCursusService = studentCursusService;
        this.constanceService = constanceService;
        constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
        });
    }
    CurrentClass.prototype.transform = function (id) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.studentCursusService.getCurrentCursus(id, _this.currentYear.id).subscribe(function (resp) {
                if (resp !== null) {
                    observer.next(resp.schoolClass.designation);
                }
                else {
                    observer.next("");
                }
            });
        });
    };
    CurrentClass = __decorate([
        core_1.Pipe({ name: 'currentClass' })
    ], CurrentClass);
    return CurrentClass;
}());
exports.CurrentClass = CurrentClass;
