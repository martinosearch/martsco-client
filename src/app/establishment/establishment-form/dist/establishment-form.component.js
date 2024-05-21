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
exports.EstablishmentFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var logo_entete_establishment_1 = require("src/app/establishment/models/logo-entete-establishment");
var logo_fond_establishment_1 = require("src/app/establishment/models/logo-fond-establishment");
var responsable_1 = require("src/app/establishment/models/responsable");
var stamp_1 = require("src/app/establishment/models/stamp");
var establishment_identity_bean_1 = require("../models/establishment-identity-bean");
var file_chooser_component_1 = require("../../utilities/file-chooser/file-chooser.component");
var establishment_setting_bean_1 = require("../models/establishment-setting-bean");
var establishment_image_bean_1 = require("../models/establishment-image-bean");
var EstablishmentFormComponent = /** @class */ (function () {
    function EstablishmentFormComponent(data, form, messageService, employeeService, dialog, fileService, constanceService, yearService, establishmentTypeService, establishmentService) {
        this.data = data;
        this.form = form;
        this.messageService = messageService;
        this.employeeService = employeeService;
        this.dialog = dialog;
        this.fileService = fileService;
        this.constanceService = constanceService;
        this.yearService = yearService;
        this.establishmentTypeService = establishmentTypeService;
        this.establishmentService = establishmentService;
        this.model = new establishment_identity_bean_1.EstablishmentIdentityBean();
        this.modelSettingBean = new establishment_setting_bean_1.EstablishmentSettingBean();
        this.modelImageBean = new establishment_image_bean_1.EstablishmentImageBean();
        this.employees = new rxjs_1.Observable();
        this.event = new core_1.EventEmitter();
        this.yearControl = new forms_1.FormControl();
        this.types = new rxjs_1.Observable();
        this.years = new rxjs_1.Observable();
        this.isSetting = false;
        this.directorTitre = "Le Chef d'Etablissement";
        this.listDirectorTitre = ["Le Chef d'Etablissement", "La Cheffe d'Etablissement", "Le Proviseur", "La Proviseur", "Le censeur", "La Censeure", "Le Directeur", "La Directrice", "Le Directeur des Etudes", "La Directrice des Etudes"];
        this.isRunning = false;
        this.viewHeight = 250;
    }
    EstablishmentFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = this.data.obj != undefined ? Object.assign({}, this.data.obj) : new establishment_identity_bean_1.EstablishmentIdentityBean();
        this.viewHeight = window.innerHeight * 0.45;
        this.typeId = this.model.type !== undefined ? this.model.type.id : undefined;
        this.isSetting = this.data.isSetting !== undefined ? this.data.isSetting : false;
        console.log(">>> isSetting::: " + this.isSetting);
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.currentYearId = _this.currentYear.id;
            console.log("current year id: " + _this.currentYearId);
        });
        this.employees = this.employeeService.getAll();
        this.types = this.establishmentTypeService.getAll();
        this.years = this.yearService.getAll();
        this.establishmentService.getSettingBean(this.model.id).subscribe(function (respSet) {
            _this.modelSettingBean = respSet;
            _this.refreshSetting();
            _this.establishmentService.getImageBean(_this.model.id).subscribe(function (respImg) {
                _this.modelImageBean = respImg;
                _this.updateLogoEntete();
                _this.updateLogoFond();
                _this.updateStamp();
            });
        });
    };
    EstablishmentFormComponent.prototype.onResize = function (event) {
        this.viewHeight = window.innerHeight * 0.45;
    };
    EstablishmentFormComponent.prototype.ngOnDestroy = function () {
    };
    EstablishmentFormComponent.prototype.refreshSetting = function () {
        var _this = this;
        this.yearService.getOne(this.currentYearId).subscribe(function (resp) {
            _this.currentYear = resp;
        });
        this.currentYearId = this.currentYear.id;
        for (var _i = 0, _a = this.modelSettingBean.directors; _i < _a.length; _i++) {
            var dir = _a[_i];
            if (dir.year.id === this.currentYear.id) {
                this.directorId = dir.employee.id;
            }
        }
    };
    EstablishmentFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    EstablishmentFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isRunning = true;
        this.establishmentTypeService.getOne(this.typeId).subscribe(function (response) {
            _this.isRunning = false;
            // set type
            _this.model.type = response;
            //set director
            if (_this.isSetting) {
                var exists = false;
                var _loop_1 = function (dir) {
                    if (dir.year.id === _this.currentYear.id) {
                        exists = true;
                        dir.titre = _this.directorTitre;
                        _this.isRunning = true;
                        _this.employeeService.getOne(_this.directorId).subscribe(function (resp) {
                            _this.isRunning = false;
                            dir.titre = _this.directorTitre;
                            dir.year = _this.currentYear;
                            dir.employee = resp;
                            _this.emit();
                        });
                    }
                };
                for (var _i = 0, _a = _this.modelSettingBean.directors; _i < _a.length; _i++) {
                    var dir = _a[_i];
                    _loop_1(dir);
                }
                if (!exists) {
                    _this.employeeService.getOne(_this.directorId).subscribe(function (resp) {
                        var director = new responsable_1.Responsable();
                        director.titre = _this.directorTitre;
                        director.year = _this.currentYear;
                        director.employee = resp;
                        _this.modelSettingBean.directors.push(director);
                        _this.emit();
                    });
                }
            }
            else {
                _this.emit();
                _this.form.close();
            }
        }, function (error) {
            console.log('Error: ' + error.status);
            _this.form.close();
        });
    };
    EstablishmentFormComponent.prototype.emit = function () {
        var _this = this;
        this.establishmentService.save(this.model).subscribe(function (resp) {
            _this.model = resp;
            _this.establishmentService.saveSettingBean(_this.modelSettingBean).subscribe(function (respSet) {
                _this.establishmentService.saveImageBean(_this.modelImageBean).subscribe(function (respImg) {
                    _this.event.emit(resp);
                    _this.messageService.showSucces();
                });
            });
        });
    };
    EstablishmentFormComponent.prototype.onChooseLogoEntete = function () {
        var _this = this;
        var dialogRef2 = this.dialog.open(file_chooser_component_1.FileChooserComponent, {
            width: '600px',
            data: { titre: 'Choisir le fichier', obj: this.modelImageBean.logoEntete }
        });
        var validationSub2 = dialogRef2.componentInstance.event.subscribe(function (file) {
            console.log('logo entete is selected');
            var logo = new logo_entete_establishment_1.LogoEnteteEstablishment();
            var fileReader = new FileReader();
            fileReader.onload = function () {
                // Store base64 encoded representation of file
                logo.nameLogoEntete = file.name;
                logo.sizeLogoEntete = file.size;
                logo.contentTypeLogoEntete = file.type;
                logo.fileAsBase64LogoEntete = fileReader.result.toString();
                _this.modelImageBean.logoEntete = logo;
                _this.updateLogoEntete();
                console.log("runned: " + fileReader.result.toString());
            };
            fileReader.readAsDataURL(file);
        });
    };
    EstablishmentFormComponent.prototype.onChooseLogoFond = function () {
        var _this = this;
        var dialogRef2 = this.dialog.open(file_chooser_component_1.FileChooserComponent, {
            width: '600px',
            data: { titre: 'Choisir le fichier', obj: this.modelImageBean.logoFond }
        });
        var validationSub2 = dialogRef2.componentInstance.event.subscribe(function (file) {
            console.log('logo fond is selected');
            var logo = new logo_fond_establishment_1.LogoFondEstablishment();
            var fileReader = new FileReader();
            fileReader.onload = function () {
                // Store base64 encoded representation of file
                logo.nameLogoFond = file.name;
                logo.sizeLogoFond = file.size;
                logo.contentTypeLogoFond = file.type;
                logo.fileAsBase64LogoFond = fileReader.result.toString();
                _this.modelImageBean.logoFond = logo;
                _this.updateLogoFond();
                //console.log("runned: " + fileReader.result.toString());
            };
            fileReader.readAsDataURL(file);
        });
    };
    EstablishmentFormComponent.prototype.onChooseStamp = function () {
        var _this = this;
        var dialogRef2 = this.dialog.open(file_chooser_component_1.FileChooserComponent, {
            width: '600px',
            data: { titre: 'Choisir le fichier', obj: this.modelImageBean.logoEntete }
        });
        var validationSub2 = dialogRef2.componentInstance.event.subscribe(function (file) {
            console.log('cachet is selected');
            var logo = new stamp_1.Stamp();
            var fileReader = new FileReader();
            fileReader.onload = function () {
                // Store base64 encoded representation of file
                logo.nameStamp = file.name;
                logo.sizeStamp = file.size;
                logo.contentTypeStamp = file.type;
                logo.fileAsBase64Stamp = fileReader.result.toString();
                _this.modelImageBean.stamp = logo;
                _this.updateStamp();
                console.log("runned: " + fileReader.result.toString());
            };
            fileReader.readAsDataURL(file);
        });
    };
    EstablishmentFormComponent.prototype.updateLogoEntete = function () {
        if (this.modelImageBean.logoEntete !== null) {
            if (this.modelImageBean.logoEntete !== undefined) {
                this.imageURL = this.modelImageBean.logoEntete.fileAsBase64LogoEntete;
                this.logoEnteteSize = Math.round(this.modelImageBean.logoEntete.sizeLogoEntete / 1000);
            }
        }
    };
    EstablishmentFormComponent.prototype.updateLogoFond = function () {
        if (this.modelImageBean.logoEntete !== null) {
            if (this.modelImageBean.logoFond !== undefined) {
                this.imageFondURL = this.modelImageBean.logoFond.fileAsBase64LogoFond;
                this.logoFondSize = Math.round(this.modelImageBean.logoFond.sizeLogoFond / 1000);
            }
        }
    };
    EstablishmentFormComponent.prototype.updateStamp = function () {
        if (this.modelImageBean.stamp !== null) {
            if (this.modelImageBean.stamp !== undefined) {
                this.stampURL = this.modelImageBean.stamp.fileAsBase64Stamp;
                this.stampSize = Math.round(this.modelImageBean.stamp.sizeStamp / 1000);
            }
        }
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], EstablishmentFormComponent.prototype, "onResize");
    EstablishmentFormComponent = __decorate([
        core_1.Component({
            selector: 'app-establishment-form',
            templateUrl: './establishment-form.component.html',
            styleUrls: ['./establishment-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], EstablishmentFormComponent);
    return EstablishmentFormComponent;
}());
exports.EstablishmentFormComponent = EstablishmentFormComponent;
