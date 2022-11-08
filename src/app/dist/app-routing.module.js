"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var assurance_form_component_1 = require("./assurance/assurance-form/assurance-form.component");
var assurance_list_component_1 = require("./assurance/assurance-list/assurance-list.component");
var cash_register_form_component_1 = require("./compta/cash-register-form/cash-register-form.component");
var expense_form_component_1 = require("./compta/expense-form/expense-form.component");
var expense_list_component_1 = require("./compta/expense-list/expense-list.component");
var reduction_motif_form_component_1 = require("./compta/reduction-motif-form/reduction-motif-form.component");
var reduction_motif_list_component_1 = require("./compta/reduction-motif-list/reduction-motif-list.component");
var reduction_student_form_component_1 = require("./compta/reduction-student-form/reduction-student-form.component");
var reduction_student_list_component_1 = require("./compta/reduction-student-list/reduction-student-list.component");
var evaluation_form_component_1 = require("./evaluation-trim/evaluation-form/evaluation-form.component");
var evaluation_list_component_1 = require("./evaluation-trim/evaluation-list/evaluation-list.component");
var evaluation_type_form_component_1 = require("./evaluation-trim/evaluation-type-form/evaluation-type-form.component");
var evaluation_type_list_component_1 = require("./evaluation-trim/evaluation-type-list/evaluation-type-list.component");
var academic_standart_form_component_1 = require("./establishment/academic-standart-form/academic-standart-form.component");
var academic_standart_list_component_1 = require("./establishment/academic-standart-list/academic-standart-list.component");
var decoupage_list_component_1 = require("./establishment/decoupage-list/decoupage-list.component");
var employee_form_component_1 = require("./employees-mg/employee-form/employee-form.component");
var employee_list_component_1 = require("./employees-mg/employee-list/employee-list.component");
var establishment_form_component_1 = require("./establishment/establishment-form/establishment-form.component");
var establishment_list_component_1 = require("./establishment/establishment-list/establishment-list.component");
var establishment_type_form_component_1 = require("./establishment/establishment-type-form/establishment-type-form.component");
var establishment_type_list_component_1 = require("./establishment/establishment-type-list/establishment-type-list.component");
var param_school_component_1 = require("./establishment/param-school/param-school.component");
var school_class_form_component_1 = require("./establishment/school-class-form/school-class-form.component");
var school_class_list_component_1 = require("./establishment/school-class-list/school-class-list.component");
var subject_form_component_1 = require("./subject-mg/subject-form/subject-form.component");
var subject_list_component_1 = require("./subject-mg/subject-list/subject-list.component");
var subject_type_form_component_1 = require("./subject-mg/subject-type-form/subject-type-form.component");
var subject_type_list_component_1 = require("./subject-mg/subject-type-list/subject-type-list.component");
var year_form_component_1 = require("./establishment/year-form/year-form.component");
var year_list_component_1 = require("./establishment/year-list/year-list.component");
var journal_show_component_1 = require("./utilities/journal-show/journal-show.component");
var user_list_component_1 = require("./utilities/user-list/user-list.component");
var user_parameters_component_1 = require("./utilities/user-parameters/user-parameters.component");
var old_version_component_1 = require("./utilities/old-version/old-version.component");
var param_soft_component_1 = require("./utilities/param-soft/param-soft.component");
var pdf_viewer_component_1 = require("./utilities/pdf-viewer/pdf-viewer.component");
var welcome_component_1 = require("./establishment/welcome/welcome.component");
var user_dashboard_component_1 = require("./utilities/user-dashboard/user-dashboard.component");
var user_form_component_1 = require("./utilities/user-form/user-form.component");
var forfait_state_component_1 = require("./utilities/forfait-state/forfait-state.component");
var cache_interceptor_service_1 = require("./utilities/services/cache-interceptor.service");
var decoupage_form_component_1 = require("./establishment/decoupage-form/decoupage-form.component");
var routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: welcome_component_1.WelcomeComponent },
    // user
    { path: 'user/list', component: user_list_component_1.UserListComponent },
    { path: 'user/form', component: user_form_component_1.UserFormComponent },
    // employee
    { path: 'employee/list', component: employee_list_component_1.EmployeeListComponent },
    { path: 'employee/form', component: employee_form_component_1.EmployeeFormComponent },
    // year
    { path: 'year-app/list', component: year_list_component_1.YearListComponent },
    { path: 'year-app/form', component: year_form_component_1.YearFormComponent },
    // school-class
    { path: 'school-class/list', component: school_class_list_component_1.SchoolClassListComponent },
    { path: 'school-class/form', component: school_class_form_component_1.SchoolClassFormComponent },
    // assurance
    { path: 'assurance/list', component: assurance_list_component_1.AssuranceListComponent },
    { path: 'assurance/form', component: assurance_form_component_1.AssuranceFormComponent },
    // academic-standart
    { path: 'academic-standart/list', component: academic_standart_list_component_1.AcademicStandartListComponent },
    { path: 'academic-standart/form', component: academic_standart_form_component_1.AcademicStandartFormComponent },
    // type establishment
    { path: 'establishment-type/list', component: establishment_type_list_component_1.EstablishmentTypeListComponent },
    { path: 'establishment-type/form', component: establishment_type_form_component_1.EstablishmentTypeFormComponent },
    // type expense
    { path: 'expense/list', component: expense_list_component_1.ExpenseListComponent },
    { path: 'expense/form', component: expense_form_component_1.ExpenseFormComponent },
    // establishment
    { path: 'establishment/list', component: establishment_list_component_1.EstablishmentListComponent },
    { path: 'establishment/form', component: establishment_form_component_1.EstablishmentFormComponent },
    //subject
    { path: 'subject/list', component: subject_list_component_1.SubjectListComponent },
    { path: 'subject/form', component: subject_form_component_1.SubjectFormComponent },
    { path: 'subject-type/list', component: subject_type_list_component_1.SubjectTypeListComponent },
    { path: 'subject-type/form', component: subject_type_form_component_1.SubjectTypeFormComponent },
    //evaluation
    { path: 'evaluation/list', component: evaluation_list_component_1.EvaluationListComponent },
    { path: 'evaluation/form', component: evaluation_form_component_1.EvaluationFormComponent },
    { path: 'evaluation-type/list', component: evaluation_type_list_component_1.EvaluationTypeListComponent },
    { path: 'evaluation-type/form', component: evaluation_type_form_component_1.EvaluationTypeFormComponent },
    // principal menu
    { path: 'mycash-register/form', component: cash_register_form_component_1.CashRegisterFormComponent },
    { path: 'app-journal/show', component: journal_show_component_1.JournalShowComponent },
    { path: 'param-soft/show', component: param_soft_component_1.ParamSoftComponent },
    { path: 'param-school/show', component: param_school_component_1.ParamSchoolComponent },
    // forfait state
    { path: 'forfait-state/show', component: forfait_state_component_1.ForfaitStateComponent },
    // pdfViewer
    { path: 'pdfViewer/show', component: pdf_viewer_component_1.PdfViewerComponent },
    // user menu
    { path: 'user-params/show', component: user_parameters_component_1.UserParametersComponent },
    { path: 'user-dashboard/show', component: user_dashboard_component_1.UserDashboardComponent },
    // old version tool
    { path: 'old-version/show', component: old_version_component_1.OldVersionComponent },
    // redution motive
    { path: 'reduction-motive/list', component: reduction_motif_list_component_1.ReductionMotifListComponent },
    { path: 'reduction-motive/form', component: reduction_motif_form_component_1.ReductionMotifFormComponent },
    { path: 'reduction-student/list', component: reduction_student_list_component_1.ReductionStudentListComponent },
    { path: 'reduction-student/list', component: reduction_student_form_component_1.ReductionStudentFormComponent },
    // decoupage
    { path: 'decoupage/list', component: decoupage_list_component_1.DecoupageListComponent },
    { path: 'decoupage/form', component: decoupage_form_component_1.DecoupageFormComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule],
            providers: [cache_interceptor_service_1.cacheInterceptorProviders]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
