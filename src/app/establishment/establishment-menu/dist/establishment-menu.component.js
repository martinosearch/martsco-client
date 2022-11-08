"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstablishmentMenuComponent = void 0;
var core_1 = require("@angular/core");
var EstablishmentMenuComponent = /** @class */ (function () {
    function EstablishmentMenuComponent(dialog, router, routeService, schoolRouteService, identityCardService, effectifReportService, actionService) {
        this.dialog = dialog;
        this.router = router;
        this.routeService = routeService;
        this.schoolRouteService = schoolRouteService;
        this.identityCardService = identityCardService;
        this.effectifReportService = effectifReportService;
        this.actionService = actionService;
        this.buttonCaption = "Expand";
    }
    EstablishmentMenuComponent.prototype.ngOnInit = function () {
    };
    EstablishmentMenuComponent.prototype.toCountryList = function () {
        this.router.navigate([this.schoolRouteService.countryListRoute]);
    };
    EstablishmentMenuComponent.prototype.toMinistaryList = function () {
        this.router.navigate([this.schoolRouteService.ministaryListRoute]);
    };
    EstablishmentMenuComponent.prototype.toExamNationalList = function () {
        this.router.navigate([this.schoolRouteService.examNationalListRoute]);
    };
    EstablishmentMenuComponent.prototype.toEstablishmentList = function () {
        this.router.navigate([this.schoolRouteService.establishmentListRoute]);
    };
    EstablishmentMenuComponent.prototype.toCycleList = function () {
        this.router.navigate([this.schoolRouteService.cycleListRoute]);
    };
    EstablishmentMenuComponent.prototype.toDecoupages = function () {
        this.router.navigate([this.routeService.decoupageListRoute]);
    };
    EstablishmentMenuComponent.prototype.toEstablishmentTypeList = function () {
        this.router.navigate([this.schoolRouteService.establishmentTypeListRoute]);
    };
    EstablishmentMenuComponent.prototype.toAcademicStandartList = function () {
        this.router.navigate([this.routeService.academicStandartListRoute]);
    };
    EstablishmentMenuComponent.prototype.toSchoolClassList = function () {
        this.router.navigate([this.routeService.schoolClassListRoute]);
    };
    EstablishmentMenuComponent.prototype.toStudentList = function () {
        this.router.navigate([this.routeService.studentListRoute]);
    };
    EstablishmentMenuComponent.prototype.toEmployeeList = function () {
        this.router.navigate([this.routeService.employeeListRoute]);
    };
    EstablishmentMenuComponent.prototype.toParentsList = function () {
        this.router.navigate([this.schoolRouteService.parentsListRoute]);
    };
    EstablishmentMenuComponent.prototype.toSubjectList = function () {
        this.router.navigate([this.routeService.subjectListRoute]);
    };
    EstablishmentMenuComponent.prototype.toSubjectTypeList = function () {
        this.router.navigate([this.routeService.subjectTypeListRoute]);
    };
    EstablishmentMenuComponent.prototype.onListClassPdf = function (type) {
        this.actionService.launchAction(this.effectifReportService
            .generateListClassNominativeOf(type)).subscribe(function (resp) { });
    };
    EstablishmentMenuComponent.prototype.onStudentCard = function () {
        this.actionService.launchAction(this.identityCardService.generateCardClass())
            .subscribe(function (resp) { });
    };
    EstablishmentMenuComponent.prototype.onListExcel = function (type) {
        this.actionService.launchAction(this.effectifReportService.generateListClassNominativeOf(type))
            .subscribe(function (resp) { });
    };
    EstablishmentMenuComponent.prototype.toStudentRepartition = function () {
        this.router.navigate([this.routeService.studentRepartitionRoute]);
    };
    EstablishmentMenuComponent.prototype.toStudentRepartitionManuelle = function () {
        this.router.navigate([this.routeService.studentRepartitionManuelleRoute]);
    };
    EstablishmentMenuComponent.prototype.onFormulaireImportList = function () {
        console.log("I am called for formulaire");
        this.actionService.launchAction(this.effectifReportService.generateFormulaireImportList())
            .subscribe(function (resp) { });
    };
    EstablishmentMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-establishment-menu',
            templateUrl: './establishment-menu.component.html',
            styleUrls: ['./establishment-menu.component.scss']
        })
    ], EstablishmentMenuComponent);
    return EstablishmentMenuComponent;
}());
exports.EstablishmentMenuComponent = EstablishmentMenuComponent;
