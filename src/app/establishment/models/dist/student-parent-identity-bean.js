"use strict";
exports.__esModule = true;
exports.StudentParentIdentityBean = void 0;
var conx_info_1 = require("src/app/utilities/models/conx-info");
var address_1 = require("./address");
var profession_info_1 = require("./profession-info");
var student_parent_identity_1 = require("./student-parent-identity");
var StudentParentIdentityBean = /** @class */ (function () {
    function StudentParentIdentityBean() {
        this.identity = new student_parent_identity_1.StudentParentIdentity();
        this.address = new address_1.Address();
        this.conxInfo = new conx_info_1.ConxInfo();
        this.profInfo = new profession_info_1.ProfessionInfo();
        this.studentsForThatIsFather = [];
        this.studentsForThatIsMother = [];
        this.studentsForThatIsTutor = [];
    }
    return StudentParentIdentityBean;
}());
exports.StudentParentIdentityBean = StudentParentIdentityBean;
