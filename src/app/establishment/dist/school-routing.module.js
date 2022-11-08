"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SchoolRoutingModule = void 0;
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var country_list_component_1 = require("src/app/governement-informations/country-list/country-list.component");
var ministary_list_component_1 = require("src/app/governement-informations/ministary-list/ministary-list.component");
var exam_national_list_component_1 = require("./exam-national-list/exam-national-list.component");
var routes = [
    { path: 'country/list', component: country_list_component_1.CountryListComponent },
    { path: 'ministary/list', component: ministary_list_component_1.MinistaryListComponent },
    { path: 'exam-national/list', component: exam_national_list_component_1.ExamNationalListComponent },
];
var SchoolRoutingModule = /** @class */ (function () {
    function SchoolRoutingModule() {
    }
    SchoolRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], SchoolRoutingModule);
    return SchoolRoutingModule;
}());
exports.SchoolRoutingModule = SchoolRoutingModule;
