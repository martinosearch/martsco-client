"use strict";
exports.__esModule = true;
exports.EmployeeIdentityBean = void 0;
var address_1 = require("../../establishment/models/address");
var identity_1 = require("../../establishment/models/identity");
var inscription_info_1 = require("../../establishment/models/inscription-info");
var profession_info_1 = require("../../establishment/models/profession-info");
var EmployeeIdentityBean = /** @class */ (function () {
    function EmployeeIdentityBean() {
        this.identity = new identity_1.Identity();
        this.address = new address_1.Address();
        this.inscriptionInfo = new inscription_info_1.InscriptionInfo();
        this.professionInfo = new profession_info_1.ProfessionInfo();
    }
    return EmployeeIdentityBean;
}());
exports.EmployeeIdentityBean = EmployeeIdentityBean;
