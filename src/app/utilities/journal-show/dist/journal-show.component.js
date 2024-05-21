"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JournalShowComponent = void 0;
var core_1 = require("@angular/core");
var confirm_delete_component_1 = require("src/app/utilities/confirm-delete/confirm-delete.component");
var JournalShowComponent = /** @class */ (function () {
    function JournalShowComponent(auth, dialog, dataService, router, routeService) {
        this.auth = auth;
        this.dialog = dialog;
        this.dataService = dataService;
        this.router = router;
        this.routeService = routeService;
        this.displayedColumns = [
            'date',
            'user',
            'describ'
        ];
    }
    JournalShowComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    JournalShowComponent.prototype.refresh = function () {
        this.liste = this.dataService.getAll();
    };
    JournalShowComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.description }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService["delete"](obj.id).subscribe(function (resp) {
                console.log('deleted: ' + obj);
                _this.refresh();
            });
            _this.refresh();
        });
    };
    JournalShowComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    JournalShowComponent = __decorate([
        core_1.Component({
            selector: 'app-journal-show',
            templateUrl: './journal-show.component.html',
            styleUrls: ['./journal-show.component.scss']
        })
    ], JournalShowComponent);
    return JournalShowComponent;
}());
exports.JournalShowComponent = JournalShowComponent;
