"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstablishmentDashbordComponent = void 0;
var core_1 = require("@angular/core");
var effectif_bean_1 = require("src/app/student-mg/models/effectif-bean");
var EstablishmentDashbordComponent = /** @class */ (function () {
    function EstablishmentDashbordComponent(constanceService, schoolClassIdentityService, employeeService, subjectService, studentIdentityService) {
        this.constanceService = constanceService;
        this.schoolClassIdentityService = schoolClassIdentityService;
        this.employeeService = employeeService;
        this.subjectService = subjectService;
        this.studentIdentityService = studentIdentityService;
        this.displayedColumns = ['class', 'male', 'female', 'sum'];
        this.studentsDisplayedColumns = ['num', 'date', 'nom', 'prenoms', 'sexe', 'matricule', 'classe'];
        this.twentythStudents = [];
        this.classes = [];
        this.employees = [];
        this.effectifBeans = [];
        this.totalEffectifBean = new effectif_bean_1.EffectifBean();
        this.numberOfClasses = 0;
        this.numberOfEmployees = 0;
        this.numberOfSubjects = 0;
    }
    EstablishmentDashbordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (respYear) {
            _this.studentIdentityService.getTotalEffectifBean(respYear.id).subscribe(function (respTot) {
                _this.totalEffectifBean = respTot;
            });
            _this.studentIdentityService.getEffectifBeans(respYear.id).subscribe(function (respEff) {
                _this.effectifBeans = respEff;
            });
            _this.schoolClassIdentityService.getAll().subscribe(function (resp) {
                _this.numberOfClasses = resp.length;
            });
            _this.employeeService.getAll().subscribe(function (resp) {
                _this.numberOfEmployees = resp.length;
                _this.employees = resp;
            });
            _this.subjectService.getAll().subscribe(function (resp) {
                _this.numberOfSubjects = resp.length;
            });
            _this.studentIdentityService.getNthRegistered(respYear.id, 20).subscribe(function (resp) {
                _this.twentythStudents = resp;
            });
        });
    };
    EstablishmentDashbordComponent = __decorate([
        core_1.Component({
            selector: 'app-establishment-dashbord',
            templateUrl: './establishment-dashbord.component.html',
            styleUrls: ['./establishment-dashbord.component.scss']
        })
    ], EstablishmentDashbordComponent);
    return EstablishmentDashbordComponent;
}());
exports.EstablishmentDashbordComponent = EstablishmentDashbordComponent;
