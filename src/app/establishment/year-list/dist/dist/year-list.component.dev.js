"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.YearListComponent = void 0;

var core_1 = require("@angular/core");

var year_1 = require("src/app/establishment/models/year");

var confirm_delete_component_1 = require("../../utilities/confirm-delete/confirm-delete.component");

var year_form_component_1 = require("../year-form/year-form.component");

var YearListComponent =
/** @class */
function () {
  function YearListComponent(auth, dialog, dataService, router, routeService) {
    this.auth = auth;
    this.dialog = dialog;
    this.dataService = dataService;
    this.router = router;
    this.routeService = routeService;
    this.displayedColumns = ['num', 'designation', 'modify', 'suppr'];
    this.holeList = [];
    this.filteredList = [];
  }

  YearListComponent.prototype.ngOnInit = function () {
    this.refresh();
  };

  YearListComponent.prototype.ngOnDestroy = function () {};

  YearListComponent.prototype.refresh = function () {
    var _this = this;

    this.dataService.getAll().subscribe(function (resp) {
      _this.holeList = resp;

      _this.filter();
    });
  };

  YearListComponent.prototype.onDelete = function (obj) {
    var _this = this;

    var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
      width: '600px',
      data: {
        titre: 'Voulez- vous vraiment supprimer: ' + obj.designation
      }
    });
    dialogRef.componentInstance.event.subscribe(function (response) {
      _this.dataService["delete"](obj.id).subscribe(function (resp) {
        console.log('deleted: ' + obj);

        _this.refresh();
      });

      _this.refresh();
    });
  };

  YearListComponent.prototype.onModify = function (currentObj) {
    var _this = this;

    var data = Object.assign({}, currentObj);
    var dialogRef = this.dialog.open(year_form_component_1.YearFormComponent, {
      width: '600px',
      data: {
        titre: 'Modifier',
        obj: data
      }
    });
    var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
      _this.dataService.save(response).subscribe(function (response2) {
        console.log('saved: ' + response2.designation);
        validationSub.unsubscribe();
      });
    });
  };

  YearListComponent.prototype.sleep = function (ms) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  };

  YearListComponent.prototype.onCreate = function () {
    var _this = this;

    var dialogRef = this.dialog.open(year_form_component_1.YearFormComponent, {
      width: '600px',
      data: {
        titre: 'Ajouter une année',
        obj: new year_1.Year()
      }
    });
    var validationSub = dialogRef.componentInstance.event.subscribe(function (response) {
      _this.dataService.save(response).subscribe(function (response2) {
        console.log('saved: ' + response2.designation);

        _this.refresh();
      });
    });
  };

  YearListComponent.prototype.filter = function () {
    if (this.filterText !== undefined) {
      var filterValue_1 = this.filterText.toLowerCase();
      this.filteredList = this.holeList.filter(function (value) {
        return value.designation.toLowerCase().includes(filterValue_1);
      });
    } else {
      this.filteredList = this.holeList;
    }
  };

  YearListComponent = __decorate([core_1.Component({
    selector: 'app-year-list',
    templateUrl: './year-list.component.html',
    styleUrls: ['./year-list.component.scss']
  })], YearListComponent);
  return YearListComponent;
}();

exports.YearListComponent = YearListComponent;