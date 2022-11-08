"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CivilityPipe = void 0;
var core_1 = require("@angular/core");
var CivilityPipe = /** @class */ (function () {
    function CivilityPipe(civilityService) {
        this.civilityService = civilityService;
    }
    CivilityPipe.prototype.transform = function (id) {
        for (var _i = 0, _a = this.civilityService.civilities; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id === id) {
                return item.intitule;
            }
        }
    };
    CivilityPipe = __decorate([
        core_1.Pipe({ name: 'civility' })
    ], CivilityPipe);
    return CivilityPipe;
}());
exports.CivilityPipe = CivilityPipe;
