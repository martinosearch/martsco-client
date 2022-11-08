"use strict";
exports.__esModule = true;
exports.AcademicStandardSetting = void 0;
var AcademicStandardSetting = /** @class */ (function () {
    function AcademicStandardSetting() {
        this.bullModelId = 1;
        this.showDirectorName = true;
        this.showPrincipalName = true;
        this.showDateConseil = true;
        this.showDecisionConseil = true;
        this.moyennePassage1 = 10;
        this.moyennePassage2 = 10;
        this.moyennePassage3 = 10;
        this.moyennePassageAn = 10;
        this.dateConseil1 = new Date(Date.now());
        this.dateConseil2 = new Date(Date.now());
        this.dateConseil3 = new Date(Date.now());
    }
    return AcademicStandardSetting;
}());
exports.AcademicStandardSetting = AcademicStandardSetting;
