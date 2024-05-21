"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CandidateListComponent = void 0;
var animations_1 = require("@angular/animations");
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var studentIdentityBean_1 = require("src/app/student-mg/models/studentIdentityBean");
var confirm_delete_component_1 = require("src/app/utilities/confirm-delete/confirm-delete.component");
var file_chooser_component_1 = require("src/app/utilities/file-chooser/file-chooser.component");
var candidate_form_component_1 = require("../candidate-form/candidate-form.component");
var exam_chooser_component_1 = require("../exam-chooser/exam-chooser.component");
var CandidateListComponent = /** @class */ (function () {
    function CandidateListComponent(auth, router, location, messageService, dialog, actionService, candidateIdentityService) {
        this.auth = auth;
        this.router = router;
        this.location = location;
        this.messageService = messageService;
        this.dialog = dialog;
        this.actionService = actionService;
        this.candidateIdentityService = candidateIdentityService;
        this.displayedColumns = [
            "num_ord", "num_table",
            "nom",
            "prenom",
            "sex", "establishment",
            "modify",
            "suppr",
            "select",
        ];
        this.filteredCandidateIdentityBean = [];
        this.holeList = [];
        this.showActions = false;
        this.filterControl = new forms_1.FormControl();
        // for checkbox in the table
        this.selection = new collections_1.SelectionModel(true, []);
    }
    CandidateListComponent.prototype.ngOnInit = function () {
        var data = this.location.getState();
        var chooserModel = data.chooserModel; //["chooserModel"];
        this.currentExamIdentityBean = chooserModel.exam;
        if (this.currentExamIdentityBean == undefined) {
            this.setExamBefore();
        }
        this.setList();
    };
    CandidateListComponent.prototype.setList = function () {
        var _this = this;
        this.candidateIdentityService.getAll(this.currentExamIdentityBean.id).subscribe(function (resp) {
            _this.filteredCandidateIdentityBean = resp;
            _this.holeList = resp;
            _this.filter();
        });
    };
    CandidateListComponent.prototype.ngOnDestroy = function () { };
    CandidateListComponent.prototype.setExamBefore = function () {
        var _this = this;
        var chooserData = { titre: 'Choisir un examen' };
        var dialogRef = this.dialog.open(exam_chooser_component_1.ExamChooserComponent, {
            width: '600px',
            data: chooserData
        });
        dialogRef.componentInstance.eventEmitter.subscribe(function (resp) {
            _this.currentExamIdentityBean = resp;
            _this.refresh();
        });
    };
    CandidateListComponent.prototype.refresh = function () {
        this.setList();
    };
    CandidateListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: "600px",
            data: {
                titre: "Voulez- vous vraiment supprimer: " +
                    obj.identity.lastName +
                    " " +
                    obj.identity.firstName
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.candidateIdentityService["delete"](obj.id).subscribe(function (resp) {
                console.log("deleted: " + obj);
                _this.refresh();
            }, function (error) {
                _this.messageService.showErrorMessage(error.error.message);
            });
        });
    };
    CandidateListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(candidate_form_component_1.CandidateFormComponent, {
            width: "600px",
            data: {
                titre: "Nouveau candidat",
                exam: this.currentExamIdentityBean
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    CandidateListComponent.prototype.onModify = function (candidateIdentityBean) {
        var _this = this;
        var dialogRef = this.dialog.open(candidate_form_component_1.CandidateFormComponent, {
            width: "600px",
            data: {
                titre: "Modifier (" + candidateIdentityBean.identity.lastName + " " + candidateIdentityBean.identity.firstName + ")",
                candidate: candidateIdentityBean,
                exam: this.currentExamIdentityBean
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    // filter for test autocomplete
    CandidateListComponent.prototype.filter = function () {
        if (this.filterText !== undefined) {
            var filterValue_1 = this.filterText.toLowerCase();
            this.filteredCandidateIdentityBean = this.holeList.filter(function (option) {
                return (option.identity.lastName + " " + option.identity.firstName)
                    .toLowerCase()
                    .includes(filterValue_1);
            });
        }
    };
    CandidateListComponent.prototype.onExcel = function () {
        var _this = this;
        // I ask for choosing the schoolclass
        var dialogRef1 = this.dialog.open(exam_chooser_component_1.ExamChooserComponent, {
            width: "600px",
            data: { titre: "Choisir l'établissement", isEstablishmentChooser: true, isExamChooser: false }
        });
        dialogRef1.componentInstance.eventEmitter.subscribe(function (chooser) {
            // I now ask for choosing the file to exported
            var dialogRef2 = _this.dialog.open(file_chooser_component_1.FileChooserComponent, {
                width: "600px",
                data: {
                    titre: "Importer une liste de excel",
                    obj: new studentIdentityBean_1.StudentIdentityBean()
                }
            });
            dialogRef2.componentInstance.event.subscribe(function (file) {
                if (file) {
                    _this.actionService
                        .launchAction(_this.candidateIdentityService.importExcel(_this.currentExamIdentityBean, chooser.establishment, file)).subscribe(function (resp) {
                        _this.refresh();
                    }, function (error) {
                        console.log("error: >>> " + error.console.error);
                        _this.refresh();
                    });
                }
            });
        });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    CandidateListComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.filteredCandidateIdentityBean.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    CandidateListComponent.prototype.masterToggle = function () {
        var _a;
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        else {
            (_a = this.selection).select.apply(_a, this.filteredCandidateIdentityBean);
        }
    };
    /** The label for the checkbox on the passed row */
    CandidateListComponent.prototype.masterCheckboxLabel = function () {
        var option = this.isAllSelected() ? "select" : "deselect";
        return option + " all";
    };
    /** The label for the checkbox  */
    CandidateListComponent.prototype.checkboxLabel = function (row, index) {
        var option = this.selection.isSelected(row) ? "deselect" : "select";
        return option + " row " + (index + 1);
    };
    CandidateListComponent = __decorate([
        core_1.Component({
            selector: 'app-candidate-list',
            templateUrl: './candidate-list.component.html',
            styleUrls: ['./candidate-list.component.scss'],
            animations: [
                animations_1.trigger("detailExpand", [
                    animations_1.state("collapsed", animations_1.style({ height: "0px", minHeight: "0" })),
                    animations_1.state("expanded", animations_1.style({ height: "*" })),
                    animations_1.transition("expanded <=> collapsed", animations_1.animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
                ]),
            ]
        })
    ], CandidateListComponent);
    return CandidateListComponent;
}());
exports.CandidateListComponent = CandidateListComponent;
