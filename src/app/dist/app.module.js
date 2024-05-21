"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var fr_1 = require("@angular/common/locales/extra/fr");
var fr_2 = require("@angular/common/locales/fr");
var core_1 = require("@angular/core");
var flex_layout_1 = require("@angular/flex-layout");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var student_form_component_1 = require("./student-mg/student-form/student-form.component");
var year_form_component_1 = require("./establishment/year-form/year-form.component");
var login_form_component_1 = require("./utilities/login-form/login-form.component");
var file_chooser_component_1 = require("./utilities/file-chooser/file-chooser.component");
var assurance_module_1 = require("./assurance/assurance.module");
var biblio_module_1 = require("./biblio/biblio.module");
var cantine_module_1 = require("./cantine/cantine.module");
var compta_module_1 = require("./compta/compta.module");
var establishment_module_1 = require("./establishment/establishment.module");
var evaluation_trim_module_1 = require("./evaluation-trim/evaluation-trim.module");
var planning_module_1 = require("./planning/planning.module");
var compta_routing_module_1 = require("./compta/compta-routing.module");
var school_routing_module_1 = require("./establishment/school-routing.module");
var employees_mg_module_1 = require("./employees-mg/employees-mg.module");
var utilities_module_1 = require("./utilities/utilities.module");
var student_mg_module_1 = require("./student-mg/student-mg.module");
var student_mg_routing_module_1 = require("./student-mg/student-mg-routing.module");
var exams_module_1 = require("./exams/exams.module");
common_1.registerLocaleData(fr_2["default"], 'fr-FR', fr_1["default"]);
var AppModule = /** @class */ (function () {
    function AppModule() {
        this.viewHeight = window.innerHeight - 55;
    }
    AppModule.prototype.onResize = function (event) {
        this.viewHeight = window.innerHeight - 55;
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], AppModule.prototype, "onResize");
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule, compta_routing_module_1.ComptaRoutingModule,
                school_routing_module_1.SchoolRoutingModule, student_mg_routing_module_1.StudentMgRoutingModule, http_1.HttpClientModule,
                flex_layout_1.FlexLayoutModule, establishment_module_1.EstablishmentModule, compta_module_1.ComptaModule, employees_mg_module_1.EmployeesMgModule,
                evaluation_trim_module_1.EvaluationTrimModule, utilities_module_1.UtilitiesModule, assurance_module_1.AssuranceModule, student_mg_module_1.StudentMgModule,
                biblio_module_1.BiblioModule, planning_module_1.PlanningModule, cantine_module_1.CantineModule, exams_module_1.ExamsModule
            ],
            //some addition here for externalization of configs
            providers: [
                { provide: core_1.LOCALE_ID, useValue: 'fr-FR' },
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            ],
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [student_form_component_1.StudentFormComponent, login_form_component_1.LoginFormComponent, year_form_component_1.YearFormComponent,
                file_chooser_component_1.FileChooserComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
