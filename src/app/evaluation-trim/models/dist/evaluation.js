"use strict";
exports.__esModule = true;
exports.Evaluation = void 0;
var decoupage_1 = require("../../establishment/models/decoupage");
var year_1 = require("../../establishment/models/year");
var evaluation_type_1 = require("./evaluation-type");
var Evaluation = /** @class */ (function () {
    function Evaluation() {
        this.year = new year_1.Year();
        this.decoupage = new decoupage_1.Decoupage();
        this.type = new evaluation_type_1.EvaluationType();
    }
    return Evaluation;
}());
exports.Evaluation = Evaluation;
