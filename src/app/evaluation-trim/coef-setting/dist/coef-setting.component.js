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
exports.CoefSettingComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var coef_attribution_1 = require("../models/coef-attribution");
var CoefSettingComponent = /** @class */ (function () {
    function CoefSettingComponent(auth, data, messageService, dialog, form, subjectService, standardService) {
        this.auth = auth;
        this.data = data;
        this.messageService = messageService;
        this.dialog = dialog;
        this.form = form;
        this.subjectService = subjectService;
        this.standardService = standardService;
        this.displayedColumns = [
            'num', 'designation', 'coef'
        ];
        this.coefs = [];
        this.defaultCoefs = [0.5, 1, 2, 3, 4, 5];
        this.coefAttribsForThisYear = [];
        this.onlyGreatherThanOne = false;
        this.refreshTable = new rxjs_1.Subject();
        this.isRunning = false;
        this.showActions = false;
        this.event = new core_1.EventEmitter();
    }
    CoefSettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRunning = true;
        this.model = this.data.standard;
        this.currentYear = this.data.year;
        this.refreshTable.subscribe(function (resp) {
            _this.coefs = _this.coefs.slice();
            _this.coefAttribsForThisYear = resp;
            console.log("items refreshed !!!!! size: " + _this.coefAttribsForThisYear);
        });
        this.standardService.getAcademicStandardBullResultModel(this.model.id).subscribe(function (respSettingBean) {
            _this.modelSettingBean = respSettingBean;
            _this.refresh();
        });
    };
    CoefSettingComponent.prototype.refresh = function () {
        var _this = this;
        this.standardService.findCoefForThisYear(this.modelSettingBean, this.currentYear.id).subscribe(function (respCoefs) {
            _this.coefAttribsForThisYear = respCoefs;
            _this.coefs = [];
            _this.subjectService.getAll().subscribe(function (respSubj) {
                var temp = [];
                for (var _i = 0, respSubj_1 = respSubj; _i < respSubj_1.length; _i++) {
                    var defaultSubj = respSubj_1[_i];
                    var exists = false;
                    for (var _a = 0, _b = _this.coefAttribsForThisYear; _a < _b.length; _a++) {
                        var coefAttrib = _b[_a];
                        if (coefAttrib.subject.id === defaultSubj.id) {
                            exists = true;
                            if (_this.onlyGreatherThanOne) {
                                if (coefAttrib.value > 1) {
                                    _this.coefs.push(coefAttrib.value);
                                    temp.push(coefAttrib);
                                }
                            }
                            else {
                                _this.coefs.push(coefAttrib.value);
                                temp.push(coefAttrib);
                            }
                            break;
                        }
                    }
                    if (!exists && !_this.onlyGreatherThanOne) {
                        var attrib = new coef_attribution_1.CoefAttribution();
                        attrib.year = _this.data.year;
                        attrib.subject = defaultSubj;
                        _this.coefs.push(attrib.value);
                        temp.push(attrib);
                    }
                }
                _this.isRunning = false;
                _this.refreshTable.next(temp);
            });
        });
    };
    CoefSettingComponent.prototype.ngOnDestroy = function () { };
    CoefSettingComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    CoefSettingComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log("on saving saved !!! : " + JSON.stringify(this.coefs));
        var index = 0;
        for (var _i = 0, _a = this.coefs; _i < _a.length; _i++) {
            var coef = _a[_i];
            this.coefAttribsForThisYear[index].value = coef;
            index++;
        }
        this.standardService.findCoefsForOtherYear(this.modelSettingBean, this.currentYear.id)
            .subscribe(function (respOther) {
            var orderCoefAttribsForThis = respOther;
            for (var _i = 0, _a = _this.coefAttribsForThisYear; _i < _a.length; _i++) {
                var item = _a[_i];
                orderCoefAttribsForThis.push(item);
            }
            _this.modelSettingBean.coefAttributions = orderCoefAttribsForThis;
            _this.standardService.saveSettings(_this.modelSettingBean).subscribe(function (resp) {
                _this.modelSettingBean = resp;
                _this.refresh();
                _this.messageService.showSucces();
            });
        });
    };
    CoefSettingComponent.prototype.onExit = function () {
        this.form.close();
    };
    CoefSettingComponent = __decorate([
        core_1.Component({
            selector: 'app-coef-setting',
            templateUrl: './coef-setting.component.html',
            styleUrls: ['./coef-setting.component.scss']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], CoefSettingComponent);
    return CoefSettingComponent;
}());
exports.CoefSettingComponent = CoefSettingComponent;
