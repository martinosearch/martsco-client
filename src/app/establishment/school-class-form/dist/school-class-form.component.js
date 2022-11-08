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
exports.SchoolClassFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var titulaire_1 = require("src/app/establishment/models/titulaire");
var school_class_identity_bean_1 = require("../models/school-class-identity-bean");
var school_class_setting_bean_1 = require("../models/school-class-setting-bean");
var SchoolClassFormComponent = /** @class */ (function () {
    function SchoolClassFormComponent(data, form, messageService, employeeService, constanceService, yearService, schoolClassSettingService, academicStandardService, schoolClassIdentityService) {
        this.data = data;
        this.form = form;
        this.messageService = messageService;
        this.employeeService = employeeService;
        this.constanceService = constanceService;
        this.yearService = yearService;
        this.schoolClassSettingService = schoolClassSettingService;
        this.academicStandardService = academicStandardService;
        this.schoolClassIdentityService = schoolClassIdentityService;
        this.event = new core_1.EventEmitter();
        this.types = [];
        this.isSetting = false;
        this.listTitulaireTitre = ["Le Titulaire", "Le Titulaire de Classe", "Le Maître"];
        this.titulaireTitre = "Le Titulaire";
        this.titulaires = [];
    }
    SchoolClassFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.academicStandardService.getAll().subscribe(function (resp) {
            _this.types = resp;
        });
        this.model = this.data.obj !== undefined ? Object.assign({}, this.data.obj) : new school_class_identity_bean_1.SchoolClassIdentityBean();
        //console.log("model >>> " + JSON.stringify(this.model));
        this.standardId = this.model.standard !== undefined ? this.model.standard.id : undefined;
        this.isSetting = this.data.isSetting !== undefined ? this.data.isSetting : false;
        this.employeeService.getAll().subscribe(function (resp) {
            _this.titulaires = resp;
        });
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.currentYearId = _this.currentYear.id;
            console.log("current year id: " + _this.currentYearId);
            //find setting bean
            _this.schoolClassSettingService.findOne(_this.model.id).subscribe(function (respSet) {
                console.log('bean setting: ' + JSON.stringify(respSet));
                if (respSet !== null) {
                    _this.modelSetting = respSet;
                    _this.schoolClassSettingService.findCurrentSetting(respSet, _this.currentYearId).subscribe(function (respTit) {
                        if (respSet !== null) {
                            console.log('Titulaire: ' + respTit);
                            _this.titulaireId = respTit !== undefined ? respTit.id : undefined;
                        }
                    });
                }
                else {
                    _this.modelSetting = new school_class_setting_bean_1.SchoolClassSettingBean();
                }
            });
        });
    };
    SchoolClassFormComponent.prototype.ngOnDestroy = function () {
    };
    SchoolClassFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    SchoolClassFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var std = this.types.filter(function (item) { return item.id === _this.standardId; })[0];
        this.model.standard = std;
        if (this.isSetting) {
            if (this.titulaireId !== undefined) {
                this.employeeService.getOne(this.titulaireId).subscribe(function (resp) {
                    var titulaire = new titulaire_1.Titulaire();
                    titulaire.employee = resp;
                    titulaire.year = _this.currentYear;
                    titulaire.titre = _this.titulaireTitre;
                    var tempTitulaires = _this.modelSetting.titulaires.filter(function (tit) { return tit.year.id !== _this.currentYearId; });
                    tempTitulaires.push(titulaire);
                    _this.modelSetting.titulaires = tempTitulaires;
                    _this.saveData(_this.model, _this.modelSetting);
                });
            }
        }
        else {
            this.saveData(this.model);
        }
    };
    SchoolClassFormComponent.prototype.saveData = function (modelIdentity, modelSetting) {
        var _this = this;
        this.schoolClassIdentityService.save(modelIdentity).subscribe(function (resp1) {
            console.log('identity bean saved: ');
            if (modelSetting) {
                _this.schoolClassSettingService.saveSettings(modelSetting).subscribe(function (resp2) {
                    _this.messageService.showSucces();
                    _this.event.emit(_this.model);
                    _this.form.close();
                }, function (error) {
                    console.log("error: " + error.error.message);
                });
            }
            else {
                _this.event.emit(_this.model);
                _this.form.close();
            }
        });
    };
    SchoolClassFormComponent = __decorate([
        core_1.Component({
            selector: 'app-school-class-form',
            templateUrl: './school-class-form.component.html',
            styleUrls: ['./school-class-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], SchoolClassFormComponent);
    return SchoolClassFormComponent;
}());
exports.SchoolClassFormComponent = SchoolClassFormComponent;
