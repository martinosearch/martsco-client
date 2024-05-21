"use strict";
exports.__esModule = true;
exports.StudentIdentityBean = void 0;
var conx_info_1 = require("../../utilities/models/conx-info");
var address_1 = require("../../establishment/models/address");
var identity_1 = require("../../establishment/models/identity");
var inscription_info_1 = require("../../establishment/models/inscription-info");
var profession_info_1 = require("../../establishment/models/profession-info");
var student_parent_identity_1 = require("src/app/establishment/models/student-parent-identity");
var StudentIdentityBean = /** @class */ (function () {
    function StudentIdentityBean() {
        this.identity = new identity_1.Identity();
        this.address = new address_1.Address();
        this.conxInfo = new conx_info_1.ConxInfo();
        this.inscriptionInfo = new inscription_info_1.InscriptionInfo();
        this.professionInfo = new profession_info_1.ProfessionInfo();
        this.father = new student_parent_identity_1.StudentParentIdentity();
        this.mother = new student_parent_identity_1.StudentParentIdentity();
        this.tutor = new student_parent_identity_1.StudentParentIdentity();
    }
    StudentIdentityBean.prototype.define = function () {
        return this.identity.lastName + this.identity.firstName;
    };
    return StudentIdentityBean;
}());
exports.StudentIdentityBean = StudentIdentityBean;
