import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PdfViewerService } from '../services/pdf-viewer.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  @ViewChild('wrapper', { static: false })
  wrapper: ElementRef;
  viewHeight = 300;

  public fileUrl: string;

  constructor(public pdfViewerService: PdfViewerService, public router: Router,
    public routeService: RouteService) {
    this.fileUrl = pdfViewerService.fileUrl;
    console.log("======> ressouce opened: " + this.fileUrl);
  }

  ngOnInit() {
    this.viewHeight = window.innerHeight - 55;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewHeight = window.innerHeight - 55;
  }
}
