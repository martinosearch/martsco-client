"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CashRegisterFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var payment_1 = require("src/app/compta/models/payment");
var studentIdentityBean_1 = require("src/app/student-mg/models/studentIdentityBean");
var student_form_component_1 = require("../../student-mg/student-form/student-form.component");
var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");
var payment_form_component_1 = require("../payment-form/payment-form.component");
var student_compta_Bean_1 = require("../models/student-compta-Bean");
var studentCursusBean_1 = require("src/app/student-mg/models/studentCursusBean");
var CashRegisterFormComponent = /** @class */ (function () {
    function CashRegisterFormComponent(dialog, studentCursusService, studentComptaService, studentIdentityService, authService, employeeIdentityService, snackBar, constanceService, comptaReportingService) {
        this.dialog = dialog;
        this.studentCursusService = studentCursusService;
        this.studentComptaService = studentComptaService;
        this.studentIdentityService = studentIdentityService;
        this.authService = authService;
        this.employeeIdentityService = employeeIdentityService;
        this.snackBar = snackBar;
        this.constanceService = constanceService;
        this.comptaReportingService = comptaReportingService;
        this.displayedColumns = ['num', 'designation', 'montant', 'suppr'];
        // for autocomplete
        this.studentControl = new forms_1.FormControl();
        this.studentCursusesList = [];
        this.studentIdentitiesList = [];
        this.studentFilteredList = [];
        this.paymentSituations = [];
        this.reminder_payments = [];
        this.payments = [];
        this.paymentSelectedObjsSubj = new rxjs_1.Subject();
        this.currentComptaStudent = new student_compta_Bean_1.StudentComptaBean();
        this.currentCursusStudent = new studentCursusBean_1.StudentCursusBean();
        this.currentIdentityStudent = new studentIdentityBean_1.StudentIdentityBean();
        this.montant = 0;
        this.serial = 0;
        this.isRunning = false;
        this.isLoading = true;
        this.canSubmit = false;
        this.canBePrint = false;
    }
    CashRegisterFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.isLoading = true;
            _this.authService.currentUserSubj.subscribe(function (resp) {
                _this.currentUserId = resp;
                _this.employeeIdentityService.getOne(_this.currentUserId).subscribe(function (resp) {
                    _this.currentEmployee = resp;
                    _this.refreshStudentList();
                });
            });
        });
        this.paymentSelectedObjsSubj.subscribe(function (resp) {
            _this.payments = resp;
        });
        this.constanceService.setCurrentSection("Caisse");
    };
    CashRegisterFormComponent.prototype.refreshStudentList = function () {
        var _this = this;
        // getting list of student
        this.studentCursusService.getAllByYear(this.currentYear.id).subscribe(function (response) {
            _this.studentCursusesList = response;
            _this.studentIdentityService.getStudentIdentities(response).subscribe(function (respId) {
                _this.studentIdentitiesList = respId;
                _this.studentFilteredList = respId;
                //  console.log('student list size: ' + JSON.stringify(this.studentIdentitiesList));
                // console.log('student list size: ' + this.studentIdentitiesList.length);
                _this.isLoading = false;
            });
        });
        this.refreshPayment([]);
        this.canSubmit = false;
    };
    // reset student beans
    CashRegisterFormComponent.prototype.refreshStudentIdentity = function (student) {
        var _this = this;
        this.currentIdentityStudent = student;
        //student cursus informations
        this.studentCursusService.getCurrentCursus(student.id, this.currentYear.id).subscribe(function (rsp) {
            _this.currentSchoolClass = rsp.schoolClass;
        });
    };
    CashRegisterFormComponent.prototype.refreshStudentCompta = function (student) {
        var _this = this;
        if (student.id !== undefined) {
            this.currentComptaStudent = student;
            this.reminder_payments = student.payments.filter(function (pymt) { return (pymt.year.id === _this.currentYear.id); })
                .sort(function (a, b) {
                return new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1;
            });
            //payment situation
            this.studentComptaService.getPaymentSituations(student.id, this.currentYear.id).subscribe(function (resp) {
                _this.paymentSituations = resp;
            });
        }
        else {
            console.log("none student logged!");
            this.paymentSituations = [];
        }
    };
    CashRegisterFormComponent.prototype.refreshPayment = function (payments) {
        this.paymentSelectedObjsSubj.next(payments.slice());
    };
    CashRegisterFormComponent.prototype.onFilterStudent = function () {
        var _this = this;
        console.log("filter text: " + this.filterText);
        if (typeof this.filterText === 'string') {
            var filterValue_1 = this.filterText.toLowerCase();
            this.studentFilteredList = this.studentIdentitiesList.filter(function (option) {
                return (option.identity.lastName + ' ' + option.identity.firstName).toLowerCase().includes(filterValue_1);
            });
        }
        else {
            this.refreshStudentIdentity(this.filterText);
            this.studentComptaService.getOne(this.filterText.id).subscribe(function (respCompta) {
                _this.refreshStudentCompta(respCompta);
            });
        }
    };
    CashRegisterFormComponent.prototype.ngOnDestroy = function () { };
    CashRegisterFormComponent.prototype.onDelete = function (obj) {
        if (this.payments.length > 0) {
            this.payments.splice(this.payments.indexOf(obj), 1);
            this.refreshPayment(this.payments);
        }
    };
    CashRegisterFormComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    // this display filtered objet in the autocomplete component
    CashRegisterFormComponent.prototype.displayStudent = function (obj) {
        if (obj !== null && obj !== undefined) {
            if (obj.identity !== undefined) {
                if (obj.identity.lastName !== undefined) {
                    var name = obj.identity.lastName;
                    if (obj.identity.lastName !== undefined) {
                        name += ' ' + obj.identity.firstName;
                    }
                    return name;
                }
            }
        }
        return undefined;
    };
    CashRegisterFormComponent.prototype.onStudentSubmit = function () {
        var _this = this;
        if (this.currentComptaStudent.id === undefined) {
            var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
                width: '600px',
                data: { titre: 'Cet élève n\'existe pas. Voulez- vous l\'ajouter?' }
            });
            dialogRef.componentInstance.event.subscribe(function (resp) {
                var dialogPatientRef = _this.dialog.open(student_form_component_1.StudentFormComponent, {
                    width: '1000px',
                    data: { titre: 'Ajouter un élève', obj: new studentIdentityBean_1.StudentIdentityBean() }
                });
                dialogPatientRef.componentInstance.event.subscribe(function (newStudent) {
                    _this.refreshStudentIdentity(newStudent);
                });
            });
        }
    };
    CashRegisterFormComponent.prototype.onModifierInfo = function () {
        var _this = this;
        var data = Object.assign({}, this.currentComptaStudent);
        var dialogRef = this.dialog.open(student_form_component_1.StudentFormComponent, {
            width: '1000px',
            data: { titre: 'Modifier', obj: data }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.studentComptaService.save(response).subscribe(function (response2) {
                //this.refreshStudent(response2);
            });
        });
    };
    CashRegisterFormComponent.prototype.onAddPayment = function () {
        var _this = this;
        var dialogRef = this.dialog.open(payment_form_component_1.PaymentFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter un Frais', obj: new payment_1.Payment(), schoolClass: this.currentSchoolClass }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.payments.push(response);
            _this.isDataCorrect();
            _this.refreshPayment(_this.payments);
            validationSub.unsubscribe();
        });
    };
    CashRegisterFormComponent.prototype.onSubmitPayment = function () {
        var _this = this;
        if (this.authService.isAuthenticated) {
            if (this.isDataCorrect()) {
                this.isRunning = true;
                this.canSubmit = false;
                this.comptaReportingService.getNewReceiptSerial(this.currentComptaStudent.id, this.currentYear.id).subscribe(function (resp) {
                    _this.serial = resp;
                    for (var _i = 0, _a = _this.payments; _i < _a.length; _i++) {
                        var elmt = _a[_i];
                        elmt.date = new Date();
                        elmt.year = _this.currentYear;
                        elmt.serial = _this.serial;
                        elmt.cashRegister = _this.currentEmployee;
                        elmt.isValid = true;
                        _this.currentComptaStudent.payments.push(elmt);
                    }
                    _this.studentComptaService.save(_this.currentComptaStudent).subscribe(function (response) {
                        // to reflesh lists
                        _this.askForPrinting(response);
                        _this.refreshStudentCompta(response);
                        _this.refreshPayment([]);
                        _this.isRunning = false;
                    }, function (error) {
                        _this.isRunning = false;
                        _this.snackBar.open('Une erreur s\'est produite!!!', null, {
                            duration: 3000
                        });
                    });
                });
            }
            else {
                this.snackBar.open('Vueillez remplir correctement les champs obligatoires.', null, {
                    duration: 3000
                });
            }
        }
        else {
            this.snackBar.open('Vueillez vous connecter avant tous.', null, {
                duration: 3000
            });
        }
    };
    CashRegisterFormComponent.prototype.onCancel = function (payment) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: {
                titre: 'Voulez- vous vraiment annuler le payement de: ' + payment.currentAmount
                    + ' pour l\'élève :' + this.currentIdentityStudent.identity.lastName + ' '
                    + this.currentIdentityStudent.identity.firstName
            }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.isRunning = true;
            for (var _i = 0, _a = _this.currentComptaStudent.payments; _i < _a.length; _i++) {
                var p = _a[_i];
                if (p.expense.id === payment.expense.id && p.currentAmount === payment.currentAmount
                    && p.serial === payment.serial && p.date === payment.date) {
                    p.isValid = false;
                }
            }
            _this.studentComptaService.save(_this.currentComptaStudent).subscribe(function (resp) {
                // to reflesh lists
                _this.refreshPayment([]);
                _this.refreshStudentCompta(resp);
                _this.isRunning = false;
            });
        });
    };
    CashRegisterFormComponent.prototype.askForPrinting = function (response) {
        this.canBePrint = true;
    };
    CashRegisterFormComponent.prototype.isDataCorrect = function () {
        if (this.payments.length > 0) {
            this.canSubmit = true;
            return true;
        }
        else {
            this.canSubmit = false;
            return false;
        }
    };
    CashRegisterFormComponent.prototype.reset = function () {
        this.filterText = undefined;
        this.refreshStudentIdentity(new studentIdentityBean_1.StudentIdentityBean());
        this.refreshStudentCompta(new student_compta_Bean_1.StudentComptaBean());
        this.refreshPayment([]);
    };
    CashRegisterFormComponent.prototype.generatePdfAndShow = function (student, serial) {
        var _this = this;
        //we call pdf
        this.isRunning = true;
        this.comptaReportingService.generateReceiptOf(student, serial, 0).subscribe(function () {
            _this.sleep(2000).then(function () { _this.isRunning = false; });
        });
    };
    CashRegisterFormComponent.prototype.generatePdfAndPrint = function (student, serial) {
        var _this = this;
        this.isRunning = true;
        this.comptaReportingService.generateReceiptOf(student, serial, 1).subscribe(function () {
            _this.sleep(2000).then(function () { _this.isRunning = false; });
        });
    };
    CashRegisterFormComponent = __decorate([
        core_1.Component({
            selector: 'app-cash-register-form',
            templateUrl: './cash-register-form.component.html',
            styleUrls: ['./cash-register-form.component.scss']
        })
    ], CashRegisterFormComponent);
    return CashRegisterFormComponent;
}());
exports.CashRegisterFormComponent = CashRegisterFormComponent;
