"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReductionMotifListComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var confirm_delete_component_1 = require("src/app/utilities/confirm-delete/confirm-delete.component");
var reduction_motif_1 = require("src/app/compta/models/reduction-motif");
var reduction_motif_form_component_1 = require("../reduction-motif-form/reduction-motif-form.component");
var animations_1 = require("@angular/animations");
var ReductionMotifListComponent = /** @class */ (function () {
    function ReductionMotifListComponent(auth, dialog, dataService) {
        this.auth = auth;
        this.dialog = dialog;
        this.dataService = dataService;
        this.displayedColumns = [
            'num',
            'designation',
            'modify',
            'suppr',
        ];
        this.filteredList = new rxjs_1.Observable();
        this.list = [];
        this.filterControl = new forms_1.FormControl();
    }
    ReductionMotifListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refresh();
        // for autocomplete
        this.filterControl.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this.filter(value); })).subscribe(function (resp) {
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    ReductionMotifListComponent.prototype.ngOnDestroy = function () { };
    ReductionMotifListComponent.prototype.refresh = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (resp) {
            _this.list = resp;
            _this.filteredList = rxjs_1.of(resp);
        });
    };
    ReductionMotifListComponent.prototype.onDelete = function (obj) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService["delete"](obj.id).subscribe(function (resp) {
                console.log('deleted: ' + obj);
                _this.refresh();
            });
            _this.refresh();
        });
    };
    ReductionMotifListComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    ReductionMotifListComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(reduction_motif_form_component_1.ReductionMotifFormComponent, {
            width: '600px',
            data: { titre: 'Ajouter un motif de réduction', obj: new reduction_motif_1.ReductionMotif() }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            console.log('to be save: ' + response.designation);
            _this.dataService.save(response).subscribe(function (response2) {
                console.log('saved: ' + response2.designation);
                _this.refresh();
            });
        });
    };
    ReductionMotifListComponent.prototype.onModify = function (currentObj) {
        var _this = this;
        var data = Object.assign({}, currentObj);
        var dialogRef = this.dialog.open(reduction_motif_form_component_1.ReductionMotifFormComponent, {
            width: '600px',
            data: { titre: 'Modifier', obj: data }
        });
        var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
            _this.dataService.save(response).subscribe(function (response2) {
                _this.refresh();
                validationSub.unsubscribe();
            });
        });
    };
    // filter for test autocomplete
    ReductionMotifListComponent.prototype.filter = function (value) {
        if (typeof value === 'string') {
            if (value === '') {
                return this.list;
            }
            else {
                var filterValue_1 = value.toLowerCase();
                return this.list.filter(function (option) {
                    return (option.designation).toLowerCase().includes(filterValue_1);
                });
            }
        }
        else {
            return this.list;
        }
    };
    ReductionMotifListComponent = __decorate([
        core_1.Component({
            selector: 'app-reduction-motif-list',
            templateUrl: './reduction-motif-list.component.html',
            styleUrls: ['./reduction-motif-list.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], ReductionMotifListComponent);
    return ReductionMotifListComponent;
}());
exports.ReductionMotifListComponent = ReductionMotifListComponent;
