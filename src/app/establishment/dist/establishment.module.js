"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstablishmentModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var flex_layout_1 = require("@angular/flex-layout");
var forms_1 = require("@angular/forms");
var assurance_form_component_1 = require("src/app/assurance/assurance-form/assurance-form.component");
var assurance_list_component_1 = require("src/app/assurance/assurance-list/assurance-list.component");
var class_chooser_form_component_1 = require("src/app/establishment/school-class-chooser-form/class-chooser-form.component");
var subject_form_component_1 = require("src/app/subject-mg/subject-form/subject-form.component");
var subject_list_component_1 = require("src/app/subject-mg/subject-list/subject-list.component");
var subject_type_form_component_1 = require("src/app/subject-mg/subject-type-form/subject-type-form.component");
var subject_type_list_component_1 = require("src/app/subject-mg/subject-type-list/subject-type-list.component");
var academic_standart_form_component_1 = require("./academic-standart-form/academic-standart-form.component");
var academic_standart_list_component_1 = require("./academic-standart-list/academic-standart-list.component");
var establishment_form_component_1 = require("./establishment-form/establishment-form.component");
var establishment_list_component_1 = require("./establishment-list/establishment-list.component");
var establishment_menu_component_1 = require("./establishment-menu/establishment-menu.component");
var establishment_type_form_component_1 = require("./establishment-type-form/establishment-type-form.component");
var establishment_type_list_component_1 = require("./establishment-type-list/establishment-type-list.component");
var school_class_form_component_1 = require("./school-class-form/school-class-form.component");
var school_class_list_component_1 = require("./school-class-list/school-class-list.component");
var year_form_component_1 = require("./year-form/year-form.component");
var year_list_component_1 = require("./year-list/year-list.component");
var param_school_component_1 = require("src/app/establishment/param-school/param-school.component");
var country_form_component_1 = require("src/app/governement-informations/country-form/country-form.component");
var country_list_component_1 = require("src/app/governement-informations/country-list/country-list.component");
var ministary_form_component_1 = require("src/app/governement-informations/ministary-form/ministary-form.component");
var ministary_list_component_1 = require("src/app/governement-informations/ministary-list/ministary-list.component");
var establishment_dashbord_component_1 = require("./establishment-dashbord/establishment-dashbord.component");
var cycle_list_component_1 = require("./cycle-list/cycle-list.component");
var cycle_form_component_1 = require("./cycle-form/cycle-form.component");
var utilities_module_1 = require("../utilities/utilities.module");
var compta_module_1 = require("../compta/compta.module");
var exams_module_1 = require("../exams/exams.module");
var welcome_component_1 = require("./welcome/welcome.component");
var exam_national_list_component_1 = require("./exam-national-list/exam-national-list.component");
var exam_national_form_component_1 = require("./exam-national-form/exam-national-form.component");
var decoupage_form_component_1 = require("./decoupage-form/decoupage-form.component");
var decoupage_list_component_1 = require("./decoupage-list/decoupage-list.component");
var EstablishmentModule = /** @class */ (function () {
    function EstablishmentModule() {
    }
    EstablishmentModule = __decorate([
        core_1.NgModule({
            declarations: [
                welcome_component_1.WelcomeComponent,
                establishment_list_component_1.EstablishmentListComponent, establishment_form_component_1.EstablishmentFormComponent, establishment_type_form_component_1.EstablishmentTypeFormComponent,
                establishment_type_list_component_1.EstablishmentTypeListComponent, establishment_menu_component_1.EstablishmentMenuComponent, establishment_dashbord_component_1.EstablishmentDashbordComponent,
                param_school_component_1.ParamSchoolComponent,
                year_list_component_1.YearListComponent, year_form_component_1.YearFormComponent,
                decoupage_list_component_1.DecoupageListComponent, decoupage_form_component_1.DecoupageFormComponent,
                school_class_list_component_1.SchoolClassListComponent, school_class_form_component_1.SchoolClassFormComponent, class_chooser_form_component_1.SchoolClassChooserFormComponent,
                academic_standart_list_component_1.AcademicStandartListComponent, academic_standart_form_component_1.AcademicStandartFormComponent,
                assurance_list_component_1.AssuranceListComponent, assurance_form_component_1.AssuranceFormComponent,
                subject_type_list_component_1.SubjectTypeListComponent, subject_type_form_component_1.SubjectTypeFormComponent, subject_list_component_1.SubjectListComponent,
                subject_form_component_1.SubjectFormComponent,
                country_list_component_1.CountryListComponent, country_form_component_1.CountryFormComponent,
                ministary_form_component_1.MinistaryFormComponent, ministary_list_component_1.MinistaryListComponent,
                cycle_list_component_1.CycleListComponent, cycle_form_component_1.CycleFormComponent, exam_national_list_component_1.ExamNationalListComponent, exam_national_form_component_1.ExamNationalFormComponent
            ],
            imports: [
                common_1.CommonModule, utilities_module_1.UtilitiesModule, compta_module_1.ComptaModule, exams_module_1.ExamsModule, flex_layout_1.FlexLayoutModule,
                forms_1.FormsModule, forms_1.ReactiveFormsModule,
            ],
            exports: [
                establishment_menu_component_1.EstablishmentMenuComponent, establishment_dashbord_component_1.EstablishmentDashbordComponent
            ],
            entryComponents: [
                school_class_form_component_1.SchoolClassFormComponent, ministary_form_component_1.MinistaryFormComponent, country_form_component_1.CountryFormComponent,
                year_form_component_1.YearFormComponent, establishment_form_component_1.EstablishmentFormComponent, class_chooser_form_component_1.SchoolClassChooserFormComponent,
                exam_national_form_component_1.ExamNationalFormComponent
            ]
        })
    ], EstablishmentModule);
    return EstablishmentModule;
}());
exports.EstablishmentModule = EstablishmentModule;
