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
exports.ConfigEvalFormComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var evaluation_setting_1 = require("src/app/evaluation-trim/models/evaluation-setting");
var ConfigEvalFormComponent = /** @class */ (function () {
    function ConfigEvalFormComponent(data, messageService, form, yearService, evaluationService, schoolClassSettingService, schoolClassService, standardService) {
        this.data = data;
        this.messageService = messageService;
        this.form = form;
        this.yearService = yearService;
        this.evaluationService = evaluationService;
        this.schoolClassSettingService = schoolClassSettingService;
        this.schoolClassService = schoolClassService;
        this.standardService = standardService;
        this.event = new core_1.EventEmitter();
        this.evaluations1 = [];
        this.evaluations2 = [];
        this.evaluations3 = [];
        this.currentEvaluationSetting = new evaluation_setting_1.EvaluationSetting();
        this.isRunning = false;
    }
    ConfigEvalFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentSchoolClassIdentityBean = this.data.schoolClassChooser.schoolClass;
        this.currentYear = this.data.schoolClassChooser.year;
        this.schoolClassId = this.currentSchoolClassIdentityBean.id;
        this.evaluationService.getAll().subscribe(function (resp) {
            _this.evaluationService.findAllEvaluationWithIndex(resp, _this.currentYear, 1).subscribe(function (resp) {
                _this.evaluations1 = resp;
            });
            _this.evaluationService.findAllEvaluationWithIndex(resp, _this.currentYear, 2).subscribe(function (resp) {
                _this.evaluations2 = resp;
            });
            _this.evaluationService.findAllEvaluationWithIndex(resp, _this.currentYear, 3).subscribe(function (resp) {
                _this.evaluations3 = resp;
            });
        });
        this.schoolClassSettingService.findEvaluationBean(this.schoolClassId).subscribe(function (resp) {
            _this.currentSchoolClassSettingBean = resp;
            _this.refresh();
        });
    };
    ConfigEvalFormComponent.prototype.refresh = function () {
        for (var _i = 0, _a = this.currentSchoolClassSettingBean.evaluationSettings; _i < _a.length; _i++) {
            var set = _a[_i];
            if (set.year.id === this.currentYear.id) {
                this.currentEvaluationSetting = set;
                this.evaluation11Id = this.currentEvaluationSetting.eval11 !== null ? this.currentEvaluationSetting.eval11.id : undefined;
                this.evaluation12Id = this.currentEvaluationSetting.eval12 !== null ? this.currentEvaluationSetting.eval12.id : undefined;
                this.evaluation13Id = this.currentEvaluationSetting.eval13 !== null ? this.currentEvaluationSetting.eval13.id : undefined;
                this.evaluation14Id = this.currentEvaluationSetting.eval14 !== null ? this.currentEvaluationSetting.eval14.id : undefined;
                this.evaluation21Id = this.currentEvaluationSetting.eval21 !== null ? this.currentEvaluationSetting.eval21.id : undefined;
                this.evaluation22Id = this.currentEvaluationSetting.eval22 !== null ? this.currentEvaluationSetting.eval22.id : undefined;
                this.evaluation23Id = this.currentEvaluationSetting.eval23 !== null ? this.currentEvaluationSetting.eval23.id : undefined;
                this.evaluation24Id = this.currentEvaluationSetting.eval24 !== null ? this.currentEvaluationSetting.eval24.id : undefined;
                this.evaluation31Id = this.currentEvaluationSetting.eval31 !== null ? this.currentEvaluationSetting.eval31.id : undefined;
                this.evaluation32Id = this.currentEvaluationSetting.eval32 !== null ? this.currentEvaluationSetting.eval32.id : undefined;
                this.evaluation33Id = this.currentEvaluationSetting.eval33 !== null ? this.currentEvaluationSetting.eval33.id : undefined;
                this.evaluation34Id = this.currentEvaluationSetting.eval34 !== null ? this.currentEvaluationSetting.eval34.id : undefined;
            }
        }
    };
    ConfigEvalFormComponent.prototype.ngOnDestroy = function () {
    };
    ConfigEvalFormComponent.prototype.onExit = function () {
        this.form.close();
    };
    ConfigEvalFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isRunning = true;
        // 1st term
        var setNote11 = new rxjs_1.Observable(function (observer) {
            console.log("setting note11 !");
            _this.evaluationService.getOne(_this.evaluation11Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval11 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        var setNote12 = new rxjs_1.Observable(function (observer) {
            console.log("setting note12 !");
            _this.evaluationService.getOne(_this.evaluation12Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval12 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        var setNote13 = new rxjs_1.Observable(function (observer) {
            console.log("setting note13 !");
            _this.evaluationService.getOne(_this.evaluation13Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval13 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        var setNote14 = new rxjs_1.Observable(function (observer) {
            console.log("setting note14 !");
            _this.evaluationService.getOne(_this.evaluation14Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval14 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        // 2nd term
        var setNote21 = new rxjs_1.Observable(function (observer) {
            console.log("setting note21 !");
            _this.evaluationService.getOne(_this.evaluation21Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval21 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        var setNote22 = new rxjs_1.Observable(function (observer) {
            console.log("setting note22 !");
            _this.evaluationService.getOne(_this.evaluation22Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval22 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        var setNote23 = new rxjs_1.Observable(function (observer) {
            console.log("setting note23 !");
            _this.evaluationService.getOne(_this.evaluation23Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval23 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        var setNote24 = new rxjs_1.Observable(function (observer) {
            console.log("setting note24 !");
            _this.evaluationService.getOne(_this.evaluation24Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval24 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        // 3rd term
        var setNote31 = new rxjs_1.Observable(function (observer) {
            console.log("setting note31 !");
            _this.evaluationService.getOne(_this.evaluation31Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval31 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        var setNote32 = new rxjs_1.Observable(function (observer) {
            console.log("setting note32 !");
            _this.evaluationService.getOne(_this.evaluation32Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval32 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        var setNote33 = new rxjs_1.Observable(function (observer) {
            console.log("setting note33 !");
            _this.evaluationService.getOne(_this.evaluation33Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval33 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        var setNote34 = new rxjs_1.Observable(function (observer) {
            console.log("setting note34 !");
            _this.evaluationService.getOne(_this.evaluation34Id).subscribe(function (resp) {
                _this.currentEvaluationSetting.eval34 = resp;
                observer.next();
            }, function (error) {
                observer.next();
            });
        });
        // action
        this.progressValue = 0;
        setNote11.subscribe(function () {
            _this.nextProgress();
            setNote12.subscribe(function () {
                _this.nextProgress();
                setNote13.subscribe(function () {
                    _this.nextProgress();
                    setNote14.subscribe(function () {
                        _this.nextProgress();
                        setNote21.subscribe(function () {
                            _this.nextProgress();
                            setNote22.subscribe(function () {
                                _this.nextProgress();
                                setNote23.subscribe(function () {
                                    _this.nextProgress();
                                    setNote24.subscribe(function () {
                                        _this.nextProgress();
                                        setNote31.subscribe(function () {
                                            _this.nextProgress();
                                            setNote32.subscribe(function () {
                                                _this.nextProgress();
                                                setNote33.subscribe(function () {
                                                    _this.nextProgress();
                                                    setNote34.subscribe(function () {
                                                        _this.nextProgress();
                                                        _this.saveConfigs();
                                                    }); //fin note13
                                                }); //fin note13
                                            }); //fin note13
                                        }); //fin note13
                                    }); //fin note13
                                }); //fin note13
                            }); //fin note13
                        }); //fin note13
                    }); //fin note13
                }); //fin note13
            }); //fin setNote12
        }); //fin setNote11
    };
    ConfigEvalFormComponent.prototype.nextProgress = function () {
        this.progressValue++;
        this.progressPer = Math.floor(this.progressValue / 13 * 100);
    };
    ConfigEvalFormComponent.prototype.saveConfigs = function () {
        var _this = this;
        var others = this.currentSchoolClassSettingBean.evaluationSettings.filter(function (item) {
            if (item.year !== null) {
                return item.year.id !== _this.currentYear.id ? true : false;
            }
            else {
                return false;
            }
        });
        this.currentEvaluationSetting.year = this.currentYear;
        others.push(this.currentEvaluationSetting);
        this.currentSchoolClassSettingBean.evaluationSettings = others;
        this.schoolClassSettingService.saveEvaluationSettingBean(this.currentSchoolClassSettingBean).subscribe(function (resp) {
            _this.isRunning = false;
            console.log("config saved successfuly");
            _this.currentSchoolClassSettingBean = resp;
            _this.refresh();
            _this.messageService.showSucces();
        });
    };
    ConfigEvalFormComponent = __decorate([
        core_1.Component({
            selector: 'app-config-eval-form',
            templateUrl: './config-eval-form.component.html',
            styleUrls: ['./config-eval-form.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], ConfigEvalFormComponent);
    return ConfigEvalFormComponent;
}());
exports.ConfigEvalFormComponent = ConfigEvalFormComponent;
