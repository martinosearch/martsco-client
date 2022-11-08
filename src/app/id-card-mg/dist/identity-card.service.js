"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IdentityCardService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var class_chooser_form_component_1 = require("src/app/establishment/school-class-chooser-form/class-chooser-form.component");
var IdentityCardService = /** @class */ (function () {
    function IdentityCardService(dialog, progressService, appConfigsService, authService, fileService) {
        var _this = this;
        this.dialog = dialog;
        this.progressService = progressService;
        this.appConfigsService = appConfigsService;
        this.authService = authService;
        this.fileService = fileService;
        // API url;
        this.API_MARTSCO = this.appConfigsService.apiUrl;
        authService.currentUserSubj.subscribe(function (resp) {
            _this.currentUserId = resp;
        });
    }
    IdentityCardService.prototype.generateCardClass = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.progressService.getNewProgressId().subscribe(function (progressId) {
                var chooserData = { titre: 'Choisir la classe' };
                var dialogRef = _this.dialog.open(class_chooser_form_component_1.SchoolClassChooserFormComponent, {
                    width: '600px',
                    data: chooserData
                });
                dialogRef.componentInstance.eventEmitter.subscribe(function (chooserModel) {
                    var url = _this.API_MARTSCO + "/identity-card/student-identity-card-pdf/"
                        + chooserModel.schoolClass.id + "/" + chooserModel.year.id
                        + "/" + _this.currentUserId + "/" + progressId;
                    observer.next(progressId);
                    observer.next(_this.progressService.getProgress(progressId));
                    var fileName = "carte_d_identites_" + chooserModel.schoolClass.designation;
                    _this.fileService.downloadAndShowPdf(url, fileName, progressId);
                    return observer.next();
                });
            });
        });
    };
    IdentityCardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], IdentityCardService);
    return IdentityCardService;
}());
exports.IdentityCardService = IdentityCardService;
