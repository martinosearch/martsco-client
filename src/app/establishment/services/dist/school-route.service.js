"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SchoolRouteService = void 0;
var core_1 = require("@angular/core");
var SchoolRouteService = /** @class */ (function () {
    function SchoolRouteService() {
        // employee
        this.parentsListRoute = '/parent/list';
        // country
        this.countryFormRoute = '/country/form';
        this.countryListRoute = '/country/list';
        // ministary
        this.ministaryFormRoute = '/ministary/form';
        this.ministaryListRoute = '/ministary/list';
        // exam national
        this.ExamNationalFormRoute = '/exam-national/form';
        this.examNationalListRoute = '/exam-national/list';
        // establishment
        this.establishmentTypeFormRoute = '/establishment-type/form';
        this.establishmentTypeListRoute = '/establishment-type/list';
        this.cycleListRoute = '/cycle/list';
        // establishment
        this.establishmentFormRoute = '/establishment/form';
        this.establishmentListRoute = '/establishment/list';
        this.establishmentShowRoute = '/establishment/show';
    }
    SchoolRouteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SchoolRouteService);
    return SchoolRouteService;
}());
exports.SchoolRouteService = SchoolRouteService;
