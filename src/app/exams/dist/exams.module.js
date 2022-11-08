"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExamsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var exam_menu_component_1 = require("./exam-menu/exam-menu.component");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var exam_dashboard_component_1 = require("./exam-dashboard/exam-dashboard.component");
var exams_routing_module_1 = require("./exams-routing.module");
var exam_form_component_1 = require("./exam-form/exam-form.component");
var exam_establishment_list_component_1 = require("./exam-establishment-list/exam-establishment-list.component");
var exam_component_1 = require("./exam-list/exam.component");
var candidate_list_component_1 = require("./candidate-list/candidate-list.component");
var candidate_form_component_1 = require("./candidate-form/candidate-form.component");
var exam_chooser_component_1 = require("./exam-chooser/exam-chooser.component");
var saisie_note_form_exam_component_1 = require("./saisie-note-form-exam/saisie-note-form-exam.component");
var utilities_module_1 = require("../utilities/utilities.module");
var exam_establishment_form_component_1 = require("./exam-establishment-form/exam-establishment-form.component");
var ExamsModule = /** @class */ (function () {
    function ExamsModule() {
    }
    ExamsModule = __decorate([
        core_1.NgModule({
            declarations: [
                exam_component_1.ExamComponent, exam_menu_component_1.ExamMenuComponent, exam_dashboard_component_1.ExamDashboardComponent, exam_dashboard_component_1.ExamDashboardComponent,
                exam_form_component_1.ExamFormComponent, exam_establishment_list_component_1.ExamEstablishmentListComponent, candidate_list_component_1.CandidateListComponent,
                exam_establishment_form_component_1.ExamEstablishmentFormComponent,
                candidate_form_component_1.CandidateFormComponent, exam_chooser_component_1.ExamChooserComponent, saisie_note_form_exam_component_1.SaisieNoteFormExamComponent
            ],
            imports: [
                common_1.CommonModule, utilities_module_1.UtilitiesModule, animations_1.NoopAnimationsModule, animations_1.BrowserAnimationsModule,
                forms_1.FormsModule, forms_1.ReactiveFormsModule, exams_routing_module_1.ExamsRoutingModule
            ],
            exports: [
                exam_menu_component_1.ExamMenuComponent, exam_dashboard_component_1.ExamDashboardComponent
            ],
            entryComponents: [
                exam_form_component_1.ExamFormComponent, exam_establishment_form_component_1.ExamEstablishmentFormComponent, candidate_form_component_1.CandidateFormComponent, exam_chooser_component_1.ExamChooserComponent,
                saisie_note_form_exam_component_1.SaisieNoteFormExamComponent
            ]
        })
    ], ExamsModule);
    return ExamsModule;
}());
exports.ExamsModule = ExamsModule;
