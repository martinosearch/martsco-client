"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentListComponent = void 0;
var animations_1 = require("@angular/animations");
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var studentIdentityBean_1 = require("src/app/student-mg/models/studentIdentityBean");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var file_chooser_component_1 = require("../../utilities/file-chooser/file-chooser.component");
var class_chooser_form_component_1 = require("../../establishment/school-class-chooser-form/class-chooser-form.component");
var student_form_component_1 = require("../student-form/student-form.component");
var student_list_model_1 = require("../models/student-list-model");
var StudentListComponent = /** @class */ (function () {
    function StudentListComponent(auth, messageService, dialog, actionService, progressService, studentCursusService, studentIdentityService, schoolClassService, studentListService, constanceService, fileService) {
        this.auth = auth;
        this.messageService = messageService;
        this.dialog = dialog;
        this.actionService = actionService;
        this.progressService = progressService;
        this.studentCursusService = studentCursusService;
        this.studentIdentityService = studentIdentityService;
        this.schoolClassService = schoolClassService;
        this.studentListService = studentListService;
        this.constanceService = constanceService;
        this.fileService = fileService;
        this.currentSchoolClassId = 0;
        this.displayedColumns = [
            "num",
            "nom",
            "prenom",
            "sex",
            "modify",
            "suppr",
            "select",
        ];
        this.filteredStudents = [];
        this.filteredCursuses = [];
        this.filteredIdentities = [];
        this.holeList = [];
        this.classes = [];
        this.showActions = false;
        this.filterControl = new forms_1.FormControl();
        // for checkbox in the table
        this.selection = new collections_1.SelectionModel(true, []);
    }
    StudentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.schoolClassService.getAll().subscribe(function (resp) {
                _this.classes = resp;
                _this.currentSchoolClassId = _this.classes[0].id;
                _this.refresh();
            });
        });
        this.selection.changed.subscribe(function () {
            if (_this.selection.selected.length > 1) {
                _this.showActions = true;
            }
            else {
                _this.showActions = false;
            }
        });
    };
    StudentListComponent.prototype.ngOnDestroy = function () { };
    StudentListComponent.prototype.refresh = function () {
        var _this = this;
        this.progressService.getNewProgressId().subscribe(function (progressId) {
            _this.actionService.launchWaiting(progressId);
            _this.getList(_this.currentSchoolClassId, _this.currentYear.id).subscribe(function (respCurs) {
                _this.filteredCursuses = respCurs;
                // console.log("cursuses: >>>> " + JSON.stringify(respCurs));
                _this.studentIdentityService.getStudentIdentities(respCurs).subscribe(function (respIds) {
                    _this.holeList = respIds;
                    _this.filteredIdentities = respIds;
                    _this.setListObjs();
                    _this.filter();
                    _this.actionService.stopWaiting(progressId);
                }, function (error) {
                    console.log("error");
                    _this.actionService.stopWaiting(progressId);
                });
            });
        });
    };
    StudentListComponent.prototype.setListObjs = function () {
        var tempStudents = [];
        for (var _i = 0, _a = this.filteredIdentities; _i < _a.length; _i++) {
            var student = _a[_i];
            var studentListModel = new student_list_model_1.StudentListModel();
            studentListModel.id = student.id;
            studentListModel.lastName = student.identity.lastName;
            studentListModel.firstName = student.identity.firstName;
            studentListModel.sex = student.identity.sex;
            studentListModel.numMatricule = student.inscriptionInfo.numMatricule;
            studentListModel.entryDate = student.inscriptionInfo.entryDate;
            studentListModel.cursuses = this.studentListService.findCursuses(this.filteredCursuses, student.id);
            tempStudents.push(studentListModel);
        }
        this.filteredStudents = tempStudents;
    };
    StudentListComponent.prototype.getList = function (schoolClassId, yearId) {
        if (schoolClassId === 0) {
            return this.studentCursusService.getAllByYear(yearId);
        }
        else {
            return this.studentCursusService.getAllByClass(schoolClassId, yearId);
        }
    };
    /** Whether the number of selected elements matches the total number of rows. */
    StudentListComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.filteredIdentities.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    StudentListComponent.prototype.masterToggle = function () {
        var _a;
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        else {
            (_a = this.selection).select.apply(_a, this.filteredStudents);
        }
    };
    /** The label for the checkbox on the passed row */
    StudentListComponent.prototype.masterCheckboxLabel = function () {
        var option = this.isAllSelected() ? "select" : "deselect";
        return option + " all";
    };
    /** The label for the checkbox  */
    StudentListComponent.prototype.checkboxLabel = function (row, index) {
        var option = this.selection.isSelected(row) ? "deselect" : "select";
        return option + " row " + (index + 1);
    };
    StudentListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: "600px",
            data: {
                titre: "Voulez- vous vraiment supprimer: " +
                    obj.lastName +
                    " " +
                    obj.firstName
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.studentIdentityService["delete"](obj.id).subscribe(function (resp) {
                console.log("deleted: " + obj);
                _this.refresh();
            }, function (error) {
                _this.messageService.showErrorMessage(error.error.message);
            });
        });
    };
    StudentListComponent.prototype.onDeleteCursus = function (student, cursus) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: "1000px",
            data: {
                titre: "Voulez- vous vraiment supprimer: " +
                    cursus.schoolClass.designation +
                    " - " +
                    cursus.year.designation +
                    " pour l'élève: " +
                    student.lastName +
                    " " +
                    student.firstName
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.studentCursusService
                .deleteCursus(student.id, cursus.year.id)
                .subscribe(function (resp) {
                console.log("done!!");
                _this.refresh();
            });
        });
    };
    StudentListComponent.prototype.getParsedList = function (list) {
        var temp = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var curs = list_1[_i];
            var exist = false;
            for (var _a = 0, temp_1 = temp; _a < temp_1.length; _a++) {
                var old = temp_1[_a];
                if (curs.year.id === old.year.id) {
                    exist = true;
                }
            }
            if (exist === false) {
                temp.push(curs);
            }
        }
        return temp;
    };
    StudentListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    StudentListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(student_form_component_1.StudentFormComponent, {
            width: "1000px",
            data: {
                titre: "Nouveau élève",
                currentSchoolClassId: this.currentSchoolClassId
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    StudentListComponent.prototype.onModify = function (student) {
        var _this = this;
        var studentIdBean = this.studentIdentityService.getIdentityBean(this.holeList, student.id);
        var dialogRef = this.dialog.open(student_form_component_1.StudentFormComponent, {
            width: "1000px",
            data: {
                titre: "Modifier (" + student.lastName + " " + student.firstName + ")",
                obj: studentIdBean
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.refresh();
        });
    };
    // filter for test autocomplete
    StudentListComponent.prototype.filter = function () {
        if (this.filterText !== undefined) {
            var filterValue_1 = this.filterText.toLowerCase();
            this.filteredIdentities = this.holeList.filter(function (option) {
                return (option.identity.lastName + " " + option.identity.firstName)
                    .toLowerCase()
                    .includes(filterValue_1);
            });
            this.setListObjs();
        }
    };
    StudentListComponent.prototype.onExcel = function () {
        var _this = this;
        // I ask for choosing the schoolclass
        var dialogRef1 = this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
            width: "600px",
            data: { titre: "Choisir la classe" }
        });
        dialogRef1.componentInstance.eventEmitter.subscribe(function (chooser) {
            // I now ask for choosing the file to exported
            var dialogRef2 = _this.dialog.open(file_chooser_component_1.FileChooserComponent, {
                width: "600px",
                data: {
                    titre: "Importer une liste d'élève",
                    obj: new studentIdentityBean_1.StudentIdentityBean()
                }
            });
            dialogRef2.componentInstance.event.subscribe(function (file) {
                if (file) {
                    _this.actionService
                        .launchAction(_this.studentCursusService.importExcel(chooser, file))
                        .subscribe(function (resp) {
                        _this.currentSchoolClassId = chooser.schoolClass.id;
                        _this.refresh();
                    }, function (error) {
                        console.log("error: >>> " + error.console.error);
                        _this.refresh();
                    });
                }
            });
        });
    };
    StudentListComponent.prototype.moveTo = function () {
        var _this = this;
        var dialogRef2 = this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
            width: "600px",
            data: { titre: "Choisir la nouvelle classe", yearChooser: true, disableYearSelection: false }
        });
        dialogRef2.componentInstance.eventEmitter.subscribe(function (resp) {
            var stagged = _this.holeList.filter(function (item) {
                return _this.selection.selected.filter(function (test) { return item.id === test.id; })
                    .length > 0;
            } //item in the selected list
            );
            var _loop_1 = function (st) {
                _this.progressService.getNewProgressId().subscribe(function (progressId) {
                    _this.actionService.launchWaiting(progressId);
                    _this.studentCursusService
                        .save(st, resp.schoolClass, resp.year, 0)
                        .subscribe(function (resp) {
                        _this.actionService.stopWaiting(progressId);
                        _this.refresh();
                    });
                });
            };
            for (var _i = 0, stagged_1 = stagged; _i < stagged_1.length; _i++) {
                var st = stagged_1[_i];
                _loop_1(st);
            }
        });
    };
    StudentListComponent.prototype.onDeleteAll = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: "600px",
            data: {
                titre: "Voulez- vous vraiment supprimer tous ces élèves de cette classe? "
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            console.log("element to be delete: " + _this.selection.selected.length);
            var stagged = _this.holeList.filter(function (item) {
                return _this.selection.selected.filter(function (test) { return item.id === test.id; }).length >
                    0;
            });
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                _this.actionService.launchWaiting(progressId);
                _this.studentCursusService
                    .deleteAllCursus(stagged, _this.currentYear.id)
                    .subscribe(function (resp) {
                    _this.refresh();
                    _this.actionService.stopWaiting(progressId);
                });
            });
        });
    };
    StudentListComponent.prototype.setAsRedoublantAll = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: "600px",
            data: {
                titre: "Voulez- vous vraiment définir tous ces élèves comme redoublant? "
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            var stagged = _this.holeList.filter(function (item) {
                return _this.selection.selected.filter(function (test) { return item.id === test.id; }).length >
                    0;
            });
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                _this.actionService.launchWaiting(progressId);
                _this.studentCursusService
                    .setAsRedoublantAll(stagged, _this.currentYear.id)
                    .subscribe(function (resp) {
                    _this.refresh();
                    _this.actionService.stopWaiting(progressId);
                    _this.messageService.showSucces();
                });
            });
        });
    };
    StudentListComponent = __decorate([
        core_1.Component({
            selector: "app-student-list",
            templateUrl: "./student-list.component.html",
            styleUrls: ["./student-list.component.scss"],
            animations: [
                animations_1.trigger("detailExpand", [
                    animations_1.state("collapsed", animations_1.style({ height: "0px", minHeight: "0" })),
                    animations_1.state("expanded", animations_1.style({ height: "*" })),
                    animations_1.transition("expanded <=> collapsed", animations_1.animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
                ]),
            ]
        })
    ], StudentListComponent);
    return StudentListComponent;
}());
exports.StudentListComponent = StudentListComponent;
