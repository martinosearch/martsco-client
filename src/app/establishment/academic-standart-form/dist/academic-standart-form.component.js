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
exports.AcademicStandartFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var academic_standard_setting_1 = require("src/app/evaluation-trim/models/academic-standard-setting");
var academic_standard_setting_bean_1 = require("../../evaluation-trim/models/academic-standard-setting-bean");
var academic_standard_identity_bean_1 = require("../models/academic-standard-identity-bean");
var AcademicStandartFormComponent = /** @class */ (function () {
    function AcademicStandartFormComponent(data, form, messageService, yearService, constanceService, standardService, decoupageService, decoupageTypeService) {
        this.data = data;
        this.form = form;
        this.messageService = messageService;
        this.yearService = yearService;
        this.constanceService = constanceService;
        this.standardService = standardService;
        this.decoupageService = decoupageService;
        this.decoupageTypeService = decoupageTypeService;
        this.model = new academic_standard_identity_bean_1.AcademicStandardIdentityBean();
        this.modelSetting = new academic_standard_setting_bean_1.AcademicStandardSettingBean();
        this.setting = new academic_standard_setting_1.AcademicStandardSetting();
        this.event = new core_1.EventEmitter();
        this.viewHeight = 200;
        this.isSetting = false;
        this.decoupages = [];
        this.decoupageTypes = [];
        this.bullModels = [
            { id: 2, designation: "Model 2 (moy. class + compo)" },
            { id: 3, designation: "Model 3" },
            { id: 4, designation: "Model 4" },
            { id: 5, designation: "Model 5" },
            { id: 6, designation: "Model 6 (Model Primaire)" },
            { id: 12, designation: "Model 12 (Model Primaire A5)" },
            { id: 7, designation: "Model 7 (Model 4 sans num matricule)" },
            { id: 9, designation: "Model 9 (Model 4 sans signature des profs)" },
            { id: 10, designation: "Model 10 (Model 4 avec 3 notes sans num matricule)" },
            { id: 11, designation: "Model 11 (Uniquement le nom de l'élève)" },
            { id: 13, designation: "Model 13 (Model 4 Note de classe - compo)" },
            { id: 14, designation: "Model 14 (Model 4 avec 3 notes avec num matricule)" }
        ];
    }
    AcademicStandartFormComponent.prototype.onResize = function (event) {
        this.viewHeight = window.innerHeight * 0.3;
    };
    AcademicStandartFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.viewHeight = window.innerHeight * 0.3;
        this.model = this.data.obj !== undefined ? this.data.obj : new academic_standard_identity_bean_1.AcademicStandardIdentityBean();
        this.isSetting = this.data.isSetting != undefined ? this.data.isSetting : false;
        this.constanceService.currentYearSubject.subscribe(function (resp) {
            _this.currentYear = resp;
            _this.currentYearId = _this.currentYear.id;
            _this.decoupageTypeService.getAll().subscribe(function (respType) {
                _this.decoupageTypes = respType;
                _this.refreshDecoupageList();
            });
        });
        this.refreshSetting();
    };
    AcademicStandartFormComponent.prototype.refreshSetting = function () {
        var _this = this;
        console.log("refreshing!!!!");
        if (this.model.id !== undefined) {
            this.standardService.getAcademicStandardBullResultModel(this.model.id).subscribe(function (resp) {
                _this.modelSetting = resp;
                _this.standardService.getCurrentSetting(resp, _this.currentYear.id).subscribe(function (set) {
                    console.log("setting ::: " + set);
                    if (set !== undefined) {
                        _this.setting = set;
                    }
                    else {
                        _this.setting = new academic_standard_setting_1.AcademicStandardSetting();
                    }
                    if (_this.setting.decoupageType !== undefined) {
                        _this.currentDecoupageTypeId = _this.setting.decoupageType.id;
                    }
                    else {
                        _this.currentDecoupageTypeId = _this.decoupageTypes[0].id;
                    }
                    _this.refreshDecoupageList();
                    if (_this.setting.lastestDecoupage !== undefined) {
                        _this.lastestDecoupageId = _this.setting.lastestDecoupage.id;
                    }
                    else {
                        _this.lastestDecoupageId = _this.decoupages[_this.decoupages.length - 1].id;
                        _this.decoupageService.getOne(_this.lastestDecoupageId).subscribe(function (r) {
                            for (var _i = 0, _a = _this.decoupages; _i < _a.length; _i++) {
                                var dec = _a[_i];
                                if (dec.index > r.index) {
                                    _this.lastestDecoupageId = dec.id;
                                }
                            }
                        });
                    }
                });
            });
        }
    };
    AcademicStandartFormComponent.prototype.refreshDecoupageList = function () {
        var _this = this;
        var decoupageType = this.decoupageTypes.filter(function (item) { return item.id === _this.currentDecoupageTypeId; })[0];
        this.decoupageService.getAll().subscribe(function (resp) {
            if (decoupageType.designation.charAt(0).toLowerCase() === "s") {
                _this.decoupages = resp.filter(function (elmt) { return (elmt.index <= 2); });
            }
            else {
                _this.decoupages = resp;
            }
            if (_this.lastestDecoupageId === undefined) {
                _this.lastestDecoupageId = resp[0].id;
            }
        });
    };
    AcademicStandartFormComponent.prototype.onNoClick = function () {
        this.form.close();
    };
    AcademicStandartFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var setDecoupageType = new rxjs_1.Observable(function (observer) {
            _this.decoupageTypeService.getOne(_this.currentDecoupageTypeId).subscribe(function (resp) {
                _this.setting.decoupageType = resp;
                observer.next();
            });
        });
        var setLastestDecoupage = new rxjs_1.Observable(function (observer) {
            _this.decoupageService.getOne(_this.lastestDecoupageId).subscribe(function (resp) {
                _this.setting.lastestDecoupage = resp;
                observer.next();
            });
        });
        if (this.isSetting) {
            setDecoupageType.subscribe(function () {
                setLastestDecoupage.subscribe(function () {
                    _this.setting.year = _this.currentYear;
                    var listTemp = [];
                    for (var _i = 0, _a = _this.modelSetting.settings; _i < _a.length; _i++) {
                        var config = _a[_i];
                        if (config.year.id !== _this.currentYear.id) {
                            listTemp.push(config);
                        }
                    }
                    listTemp.push(_this.setting);
                    _this.modelSetting.settings = listTemp;
                    //save models
                    _this.standardService.saveIdentity(_this.model).subscribe(function (resp) {
                        console.log("standard identity saved");
                        _this.standardService.saveSettings(_this.modelSetting).subscribe(function (respSet) {
                            console.log("standard settings saved");
                            _this.messageService.showSucces();
                            _this.event.emit(true);
                            _this.form.close();
                        });
                    });
                });
            });
        }
        else {
            this.standardService.saveIdentity(this.model).subscribe(function (resp) {
                _this.event.emit(true);
                _this.form.close();
            });
        }
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], AcademicStandartFormComponent.prototype, "onResize");
    AcademicStandartFormComponent = __decorate([
        core_1.Component({
            selector: 'app-academic-standart-form',
            templateUrl: './academic-standart-form.component.html',
            styleUrls: ['./academic-standart-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], AcademicStandartFormComponent);
    return AcademicStandartFormComponent;
}());
exports.AcademicStandartFormComponent = AcademicStandartFormComponent;
