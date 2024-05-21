"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ForfaitStateComponent = void 0;
var core_1 = require("@angular/core");
var angular_highcharts_1 = require("angular-highcharts");
var rxjs_1 = require("rxjs");
var forfait_1 = require("../models/forfait");
var ForfaitStateComponent = /** @class */ (function () {
    function ForfaitStateComponent(dialog, forfaitService, router) {
        this.dialog = dialog;
        this.forfaitService = forfaitService;
        this.router = router;
        this.displayedColumns = ['title', 'value'];
        this.serial = new rxjs_1.Observable();
        this.currentForfait = new forfait_1.Forfait();
        this.initialAmount = 10000;
        this.useAmount = 0;
        this.remainAmount = 10000;
        this.index = 0;
        this.updateFlag = true;
        this.options = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Graphe des consommations'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    overflow: 'justify'
                }
            },
            yAxis: {
                title: {
                    text: 'Forfait restant'
                },
                min: 0
            },
            tooltip: {
                valueSuffix: ' FCFA'
            },
            plotOptions: {
                spline: {
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 4
                        }
                    },
                    marker: {
                        enabled: true
                    },
                    pointInterval: 3600000 * 24,
                    pointStart: Date.now()
                }
            },
            series: [],
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }
        };
    }
    ForfaitStateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chart = new angular_highcharts_1.Chart(this.options);
        this.serial = this.forfaitService.getEstablishmentSerial();
        this.setRemain();
        var source = rxjs_1.interval(30000);
        source.subscribe(function () { return _this.setRemain(); });
    };
    ForfaitStateComponent.prototype.ngOnDestroy = function () { };
    // add point to chart serie
    ForfaitStateComponent.prototype.setRemain = function () {
        var _this = this;
        this.forfaitService.getCurrentForfait().subscribe(function (response) {
            _this.currentForfait = response;
            // we update the chart
            _this.useAmount = _this.useAmount + 100;
            _this.remainAmount = _this.remainAmount - _this.useAmount;
            _this.chart.addPoint([_this.remainAmount, _this.index], 0);
            _this.index = _this.index++;
            var dataSerie1 = [];
            for (var _i = 0, _a = _this.currentForfait.forfaitConsommations; _i < _a.length; _i++) {
                var conso = _a[_i];
                var tempData1 = [];
                tempData1.push(new Date(conso.consoDate).getTime());
                tempData1.push(conso.remainAmount);
                dataSerie1.push(tempData1);
            }
            var series1 = {
                name: 'Conso. réelle',
                data: dataSerie1
            };
            var series2 = {
                name: 'Date d\'épuisement',
                data: [[new Date(_this.currentForfait.expirationDate).getTime(), 0]]
            };
            console.log('update!');
            _this.options.plotOptions.pointStart = new Date(_this.currentForfait.activationDate).getTime();
            _this.chart.removeSeries(0);
            _this.chart.removeSeries(0);
            _this.chart.addSeries(series1, true, false);
            _this.chart.addSeries(series2, true, false);
        });
    };
    ForfaitStateComponent = __decorate([
        core_1.Component({
            selector: 'app-forfait-state',
            templateUrl: './forfait-state.component.html',
            styleUrls: ['./forfait-state.component.scss']
        })
    ], ForfaitStateComponent);
    return ForfaitStateComponent;
}());
exports.ForfaitStateComponent = ForfaitStateComponent;
