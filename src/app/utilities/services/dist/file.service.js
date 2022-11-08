"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FileService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var my_file_1 = require("../models/my-file");
var trans_response_1 = require("../models/trans-response");
var FileService = /** @class */ (function () {
    function FileService(routeService, messageService, authService, httpClient, actionService, pdfViewerService) {
        var _this = this;
        this.routeService = routeService;
        this.messageService = messageService;
        this.authService = authService;
        this.httpClient = httpClient;
        this.actionService = actionService;
        this.pdfViewerService = pdfViewerService;
        this.isRunningSubj = new rxjs_1.Subject();
        authService.currentUserSubj.subscribe(function (resp) {
            _this.currentUserId = resp;
        });
    }
    FileService.prototype.upload = function (file) {
        var data = new FormData();
        data.append('file', file);
        var uploadURL = this.routeService.fileUpload + "/" + this.currentUserId;
        return this.httpClient.post(uploadURL, data, {
            reportProgress: true,
            observe: 'events'
        }).pipe(operators_1.map(function (event) {
            console.log('Event type !' + event.type);
            switch (event.type) {
                case http_1.HttpEventType.UploadProgress: {
                    var transResponse = new trans_response_1.TransResponse();
                    transResponse.status = 'progress';
                    transResponse.message = Math.round(100 * event.loaded / event.total);
                    return transResponse;
                }
                case http_1.HttpEventType.Response: {
                    var file_1 = new my_file_1.MyFile();
                    file_1.name = event.body.name;
                    return file_1;
                }
                default: {
                    return "Unhandled event: " + event.type;
                }
            }
        }));
    };
    //save file in data base
    FileService.prototype.saveFileInDB = function (fileName, fileStorage) {
        return this.httpClient.get(this.routeService.saveFileInDB + "/" + fileName + "/" + this.currentUserId + ")");
    };
    // download ressources from url
    FileService.prototype.downloadAndShowPdf = function (url, fileName, progressId) {
        var _this = this;
        var httpOptions = { responseType: 'blob' };
        var file;
        this.httpClient.get(url, httpOptions).subscribe(function (response) {
            file = new Blob([response], { type: my_file_1.MyFile.PDF_TYPE });
        }, function (error) {
            _this.actionService.stopWaiting(progressId);
            var message = 'Le document généré est invalide!';
            console.log(message);
            _this.messageService.showErrorMessage(message);
        }, function () {
            if (fileName) {
                _this.pdfViewerService.show(file, fileName);
            }
            else {
                _this.pdfViewerService.show(file);
            }
            console.log('file downloaded !');
        });
    };
    FileService.prototype.printUrl = function (fileURL) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = fileURL;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
    };
    // download ressources from url
    FileService.prototype.downloadExcel = function (url, fileNewName) {
        var httpOptions = { responseType: 'blob' };
        var file;
        this.httpClient.get(url, httpOptions).subscribe(function (response) {
            file = new Blob([response], { type: my_file_1.MyFile.XLS_TYPE });
        }, function (error) {
            console.log('Error downloading ' + error);
        }, function () {
            var url = window.URL.createObjectURL(file);
            //window.open(url);
            //rename file
            var a = document.createElement("a");
            a.href = url;
            a.download = fileNewName;
            window.document.body.appendChild(a);
            a.click();
            window.document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log('file downloaded !');
        });
    };
    FileService.PRINT = 1;
    FileService.SHOW = 0;
    FileService.STORE = 2;
    FileService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FileService);
    return FileService;
}());
exports.FileService = FileService;
