"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ActionService = void 0;
var core_1 = require("@angular/core");
var highcharts_1 = require("highcharts");
var rxjs_1 = require("rxjs");
var confirm_delete_component_1 = require("../confirm-delete/confirm-delete.component");
var action_1 = require("../beans/action");
var ActionService = /** @class */ (function () {
    function ActionService(dialog, messageService) {
        this.dialog = dialog;
        this.messageService = messageService;
        this.actions = [];
        this.numberOfCall = 0;
        // const action = new Action();
        // action.progressId = 2;
        // action.progressValue = 80;
        // action.progressMessage = "Veuillez patienter, action en cours...";
        // this.actions.push(action);
    }
    ActionService.prototype.launchWaiting = function (progressId) {
        console.log("launch waiting...");
        var action = new action_1.Action();
        action.progressId = progressId;
        action.mode = "indeterminate";
        action.progressDeterminate = false;
        action.progressMessage = "Veuillez patienter...";
        this.actions.push(action);
    };
    ActionService.prototype.stopWaiting = function (progressId) {
        // let count = 0;
        // for (const action of this.actions) {
        //   if (action.progressId === progressId) {
        //     this.actions.splice(count, 1);
        //   }
        //   count++;
        // }
        this.actions = this.actions.filter(function (item) { return item.progressId !== progressId; });
    };
    ActionService.prototype.launchAction = function (observable, progressDeterminate) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            var action = new action_1.Action();
            if (progressDeterminate) {
                if (progressDeterminate == true) {
                    action.progressDeterminate = true;
                    action.mode = "determinate";
                }
                else {
                    action.progressDeterminate = false;
                    action.mode = "indeterminate";
                }
            }
            else {
                action.progressDeterminate = true;
                action.mode = "determinate";
            }
            observable.subscribe(function (resp) {
                console.log("response >>>>> " + resp);
                if (highcharts_1.isNumber(resp) && action.progressId === undefined) {
                    action.progressId = parseInt(resp.toString());
                }
                else if (resp instanceof EventSource) {
                    resp.addEventListener('message', function (message) {
                        var progress = JSON.parse(message.data);
                        console.log("progress: >>> " + JSON.stringify(progress));
                        //console.log("progress ==> " + progress.message + " -- " + progress.progress);
                        action.progressValue = progress.progress;
                        action.progressMessage = progress.message;
                        //remove progress
                        if (action.progressValue >= 100) {
                            _this.stopWaiting(action.progressId);
                        }
                        else {
                            // add action to list of actions
                            var exists = _this.actions.filter(function (item) { return item.progressId === action.progressId; });
                            if (exists.length === 0) {
                                _this.actions.push(action);
                            }
                        }
                    });
                }
                else {
                    console.log(">>>> next ()");
                    observer.next(resp);
                }
            }, function (error) {
                observer.error(error);
            });
        });
    };
    ActionService.prototype.eventEmitDoubleClick = function (event) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_delete_component_1.ConfirmDeleteComponent, {
            width: '600px',
            data: { titre: 'Voulez- vous vraiment interropre cette progresssion?' }
        });
        dialogRef.componentInstance.event.subscribe(function (response) {
            _this.actions = _this.actions.filter(function (item) { return item.progressId !== _this.currentAction.progressId; });
        });
    };
    ActionService.prototype.setCurrentProgress = function (action) {
        this.currentAction = action;
    };
    ActionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ActionService);
    return ActionService;
}());
exports.ActionService = ActionService;
