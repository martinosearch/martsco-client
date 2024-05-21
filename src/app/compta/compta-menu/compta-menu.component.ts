import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionService } from 'src/app/utilities/services/action.service';

import { ComptaReportingService } from '../services/compta-reporting.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { ComptaRouteService } from 'src/app/compta/services/compta-route.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { RouteService } from 'src/app/utilities/services/route.service';

@Component({
  selector: 'app-compta-menu',
  templateUrl: './compta-menu.component.html',
  styleUrls: ['./compta-menu.component.scss']
})

export class ComptaMenuComponent implements OnInit {
  public expanded = false;
  constructor(public router: Router, public routeService: RouteService,
    public comptaRouteService: ComptaRouteService,
    public actionService: ActionService, public constanceService: ConstanceService,
    public comptaReportingService: ComptaReportingService, public authService: AuthService) { }

  ngOnInit() {
  }

  // Compta
  toExpenseList() {
    this.router.navigate([this.routeService.expenseListRoute]);
  }

  toReductionStudentList() {
    this.router.navigate([this.routeService.reductionStudentListRoute]);
  }

  toReductionMotive() {
    this.router.navigate([this.routeService.reductionMotiveListRoute]);
  }

  toCashRegisterForm(write: boolean) {
    this.router.navigate([this.comptaRouteService.cashRegisterFormRoute]);
  }

  onPaymentStatementPerClass() {
    this.actionService.launchAction(this.comptaReportingService.paymentStatementPerClass()).subscribe((resp) => { });
  }

  toCashRegisterBalance() {
    this.router.navigate([this.comptaRouteService.cashRegisterBalance]);
  }
}
