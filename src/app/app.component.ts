import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EstablishmentService } from './establishment/services/establishment.service';
import { YearService } from './establishment/services/year.service';
import { AuthService } from './utilities/services/auth.service';
import { ConstanceService } from './utilities/services/constance.service';
import { FileService } from './utilities/services/file.service';
import { RouteService } from './utilities/services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MartSCO';

  @ViewChild('wrapper', { static: false })
  wrapper: ElementRef;
  viewHeight = 300;

  isAcceuil = true;
  events: string[] = [];
  opened = true;
  isRunning = false;

  options: FormGroup;
  shouldRun = true;

  thisEstablishmentName: string;

  constructor(public router: Router, public routeService: RouteService,
    public yearService: YearService, public constanceService: ConstanceService,
    public authService: AuthService, public establishmentService: EstablishmentService,
    public fileService: FileService
  ) { }

  ngOnInit(): void {
    this.viewHeight = window.innerHeight - 150;

    this.establishmentService.getThisEstablishment().subscribe((resp) => {
      this.thisEstablishmentName = resp.type.dim + " | " + resp.identity.name;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewHeight = window.innerHeight - 150;
  }
}

