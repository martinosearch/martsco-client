"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConstanceService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var menu_1 = require("../models/menu");
var ConstanceService = /** @class */ (function () {
    function ConstanceService(yearService, dialog, router, utilRouteService) {
        this.yearService = yearService;
        this.dialog = dialog;
        this.router = router;
        this.utilRouteService = utilRouteService;
        this.serverSubj = new rxjs_1.Subject();
        this.currentYearSubject = new rxjs_1.ReplaySubject();
        this.isLoaded = false;
        this.currentSection = "MartSCO";
        this.etablissement = new menu_1.Menu(1, "Établissement");
        this.evaluations = new menu_1.Menu(2, "Évaluation");
        this.exams = new menu_1.Menu(3, "Examens");
        this.comptabilite = new menu_1.Menu(4, "Comptabilité");
        this.bibliotheque = new menu_1.Menu(5, "Bibliothèque");
        this.planning = new menu_1.Menu(6, "Planning");
        this.cantine = new menu_1.Menu(7, "Cantine");
        this.menus = [this.etablissement, this.evaluations, this.exams,
            this.comptabilite, this.bibliotheque, this.planning, this.cantine];
        this.currentMenu = this.etablissement;
        this.sexes = [
            { id: 0, intitule: 'Masculin', code: 'M' },
            { id: 1, intitule: 'Féminin', code: 'F' },
            { id: 3, intitule: 'Indéterminé', code: '-' }
        ];
        this.typesAssurance = [
            { id: 0, designation: 'Publique' },
        ];
        this.storageLocation = sessionStorage;
        this.onInit();
    }
    ConstanceService.prototype.onInit = function () {
        var _this = this;
        this.yearService.getAll().subscribe(function (rsp) {
            if (rsp.length > 0) {
                _this.currentYearSubject.next(rsp[0]);
            }
            _this.isLoaded = true;
            var idStored = Number(_this.storageLocation.getItem("id_menu"));
            _this.currentMenu = _this.menus.filter(function (menu) { return (menu.id === idStored); })[0];
            if (_this.currentMenu === undefined) {
                _this.currentMenu = _this.etablissement;
            }
        });
    };
    ConstanceService.prototype.refreshYearById = function (yearId) {
        var _this = this;
        this.yearService.getOne(yearId).subscribe(function (resp) {
            _this.currentYearSubject.next(resp);
        });
        // this.yearService.setCurrentToServer(yearId).subscribe((resp) => {
        //   console.log("current year is set");
        // });
    };
    ConstanceService.prototype.setMenu = function (menu) {
        this.currentMenu = menu;
        this.toAccueil();
        this.storageLocation.setItem("id_menu", this.currentMenu.id.toString());
    };
    ConstanceService.prototype.setCurrentSection = function (str) {
        this.currentSection = "MartSCO / " + str;
    };
    ConstanceService.prototype.toAccueil = function () {
        this.router.navigate([this.utilRouteService.accueil]);
    };
    ConstanceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ConstanceService);
    return ConstanceService;
}());
exports.ConstanceService = ConstanceService;
