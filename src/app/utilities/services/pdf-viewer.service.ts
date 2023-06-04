import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConstanceService } from './constance.service';
import { RouteService } from './route.service';


@Injectable({
  providedIn: 'root'
})
export class PdfViewerService {
  public fileUrl: string;

  constructor(public constanceService: ConstanceService, public router: Router,
    public routeService: RouteService) { }

  show(blobInvoice: Blob, fileName?: string) {
    this.fileUrl = window.URL.createObjectURL(blobInvoice);
    // this.constanceService.toAccueil();
    // this.sleep(10000)
    // this.router.navigate([this.routeService.pdfViewerShowRoute]);
    if (fileName !== undefined) {
      //rename file
      // const a = document.createElement("a");
      // a.href = this.fileUrl;
      // a.download = fileName;
      // window.document.body.appendChild(a);
      // a.click();
      // window.document.body.removeChild(a);
      //  URL.revokeObjectURL(this.fileUrl);
      window.open(this.fileUrl);
    } else {
      window.open(this.fileUrl);
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }
}
