"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.EmployeeFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var employee_identity_bean_1 = require("src/app/employees-mg/models/employee-identity-bean");
var signature_1 = require("src/app/establishment/models/signature");
var file_chooser_component_1 = require("src/app/utilities/file-chooser/file-chooser.component");
var EmployeeFormComponent = /** @class */ (function () {
    function EmployeeFormComponent(data, form, dialog, dataService, civilityService, constanceService) {
        this.data = data;
        this.form = form;
        this.dialog = dialog;
        this.dataService = dataService;
        this.civilityService = civilityService;
        this.constanceService = constanceService;
        this.model = new employee_identity_bean_1.EmployeeIdentityBean();
        this.types = [];
        this.event = new core_1.EventEmitter();
        this.viewHeight = 250;
    }
    EmployeeFormComponent.prototype.ngOnInit = function () {
        this.viewHeight = window.innerHeight * 0.6;
        this.model = this.data.obj;
        this.model.identity.birthday = this.model.identity.birthday !== null ? new Date(this.model.identity.birthday) : null;
        this.model.inscriptionInfo.entryDate = this.model.inscriptionInfo.entryDate !== null ? new Date(this.model.inscriptionInfo.entryDate) : null;
        this.model.inscriptionInfo.leavingDate = this.model.inscriptionInfo.leavingDate !== null ? new Date(this.model.inscriptionInfo.leavingDate) : null;
        this.updateSignature();
    };
    EmployeeFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    EmployeeFormComponent.prototype.onSubmit = function () {
        this.event.emit(this.model);
        this.form.close();
    };
    EmployeeFormComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    EmployeeFormComponent.prototype.calculateBirthYear = function () {
        this.model.identity.birthday = new Date(Date.now() - (this.model.identity.age * 24 * 3600 * 365.25 * 1000));
        console.log('date on initialisation: ' + this.model.identity.birthday);
    };
    EmployeeFormComponent.prototype.calculateAge = function () {
        this.model.identity.age = Math.floor(Math.abs((Date.now() - this.model.identity.birthday.getTime())
            / (24 * 3600 * 365.25 * 1000)));
    };
    EmployeeFormComponent.prototype.onChooseSignature = function () {
        var _this = this;
        var dialogRef2 = this.dialog.open(file_chooser_component_1.FileChooserComponent, {
            width: '600px',
            data: { titre: 'Choisir le fichier', obj: this.model.signature }
        });
        var validationSub2 = dialogRef2.componentInstance.event.subscribe(function (file) {
            console.log('cachet is selected');
            var logo = new signature_1.Signature();
            var fileReader = new FileReader();
            fileReader.onload = function () {
                // Store base64 encoded representation of file
                logo.nameSignature = file.name;
                logo.sizeSignature = file.size;
                logo.contentTypeSignature = file.type;
                logo.fileAsBase64Signature = fileReader.result.toString();
                _this.model.signature = logo;
                _this.updateSignature();
                console.log("runned: " + fileReader.result.toString());
            };
            fileReader.readAsDataURL(file);
        });
    };
    EmployeeFormComponent.prototype.updateSignature = function () {
        if (this.model.signature !== null) {
            if (this.model.signature !== undefined) {
                this.signatureURL = this.model.signature.fileAsBase64Signature;
            }
        }
    };
    EmployeeFormComponent = __decorate([
        core_1.Component({
            selector: 'app-employee-form',
            templateUrl: './employee-form.component.html',
            styleUrls: ['./employee-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], EmployeeFormComponent);
    return EmployeeFormComponent;
}());
exports.EmployeeFormComponent = EmployeeFormComponent;
