import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/utilities/services/route.service';

@Component({
  selector: 'app-assurance-menu',
  templateUrl: './assurance-menu.component.html',
  styleUrls: ['./assurance-menu.component.scss']
})
export class AssuranceMenuComponent implements OnInit {

  constructor(public router: Router, public routeService: RouteService) { }

  ngOnInit() {
  }

  toAssuranceList() {
    this.router.navigate([this.routeService.assuranceListRoute]);
  }
}
