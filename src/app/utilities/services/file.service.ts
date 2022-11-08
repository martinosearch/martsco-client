import { ActionService } from './action.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyFile } from '../models/my-file';
import { TransResponse } from '../models/trans-response';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { PdfViewerService } from './pdf-viewer.service';
import { RouteService } from './route.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  static PRINT = 1;
  static SHOW = 0;
  static STORE = 2;
  public isRunningSubj = new Subject<boolean>();
  currentUserId: number;

  constructor(private routeService: RouteService, private messageService: MessageService,
    private authService: AuthService, private httpClient: HttpClient, private actionService: ActionService,
    private pdfViewerService: PdfViewerService) {

    authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    })
  }

  public upload(file: File) {
    const data = new FormData();
    data.append('file', file);

    let uploadURL = `${this.routeService.fileUpload}/${this.currentUserId}`;

    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      console.log('Event type !' + event.type);

      switch (event.type) {
        case HttpEventType.UploadProgress: {
          let transResponse = new TransResponse();
          transResponse.status = 'progress';
          transResponse.message = Math.round(100 * event.loaded / event.total);
          return transResponse;
        }

        case HttpEventType.Response: {
          const file: MyFile = new MyFile();
          file.name = event.body.name;
          return file;
        }

        default: {
          return `Unhandled event: ${event.type}`;
        }
      }
    })
    );
  }

  //save file in data base
  saveFileInDB(fileName: string, fileStorage: number): Observable<any> {
    return this.httpClient.get<any>(`${this.routeService.saveFileInDB}/${fileName}/${this.currentUserId})`);
  }

  // download ressources from url
  downloadAndShowPdf(url: string, fileName: string, progressId: number) {
    const httpOptions = { responseType: 'blob' as 'json' };
    let file: Blob;

    this.httpClient.get<Blob>(url, httpOptions).subscribe(
      response => {
        file = new Blob([response], { type: MyFile.PDF_TYPE });
      },
      (error) => {
        this.actionService.stopWaiting(progressId);
        const message = 'Le document généré est invalide!';
        console.log(message);
        this.messageService.showErrorMessage(message);
      },
      () => {
        if (fileName) {
          this.pdfViewerService.show(file, fileName);
        } else {
          this.pdfViewerService.show(file);
        }
        console.log('file downloaded !');
      }
    );
  }

  printUrl(fileURL: string) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = fileURL;
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  }

  // download ressources from url
  downloadExcel(url: string, fileNewName: string) {
    const httpOptions = { responseType: 'blob' as 'json' };
    let file: Blob;

    this.httpClient.get<Blob>(url, httpOptions).subscribe(
      response => {
        file = new Blob([response], { type: MyFile.XLS_TYPE });
      },
      (error) => {
        console.log('Error downloading ' + error);
      },
      () => {
        const url = window.URL.createObjectURL(file);
        //window.open(url);

        //rename file
        const a = document.createElement("a");
        a.href = url;
        a.download = fileNewName;
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('file downloaded !');
      }
    );
  }
}
