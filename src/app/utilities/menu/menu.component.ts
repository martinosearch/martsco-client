import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { YearService } from '../../establishment/services/year.service';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthService } from '../services/auth.service';
import { RouteService } from '../services/route.service';
import { UserService } from '../services/user.service';
import { UtilRouteService } from '../services/util-route.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentUserLogin: string;
  currentUserType: string;
  years = [];
  yearId: number;


  constructor(public constanceService: ConstanceService, private dialog: MatDialog, public authService: AuthService,
    public yearService: YearService, public router: Router, public routeService: RouteService,
    public utilRouteService: UtilRouteService, private userService: UserService) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe(resp => {
      this.yearId = resp.id;

      this.yearService.getAll().subscribe((resp) => {
        this.years = resp;
      });

      this.authService.currentUserSubj.subscribe({
        next: (resp) => {
          this.currentUserLogin = this.authService.getUserLogin();
          this.userService.getUserTypeByLogin(this.currentUserLogin)
            .subscribe({ next: resp => this.currentUserType = resp.designation });
        }
      });
    });
  }

  login() {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '400px',
      data: { titre: 'Connexion' }
    });

    dialogRef.componentInstance.event.subscribe(
      (response) => {
        this.authService.login(response.login, response.password);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  yearControl() {
    this.constanceService.refreshYearById(this.yearId);
  }

  toAccueil() {
    this.constanceService.toAccueil();
  }

  toForfaitState() {
    this.router.navigate([this.routeService.forfaitStateRoute]);
  }

  toYearList() {
    this.router.navigate([this.routeService.yearListRoute]);
  }

  toJournal() {
    this.router.navigate([this.utilRouteService.journalRoute]);
  }

  toUserList() {
    this.router.navigate([this.routeService.userListRoute]);
  }

  toUserParams() {
    this.router.navigate([this.utilRouteService.userParamsRoute]);
  }

  toUserDashBoard() {
    this.router.navigate([this.utilRouteService.userDashBoardRoute]);
  }

  toParamSoft() {
    this.router.navigate([this.routeService.paramSchoolRoute]);
  }

}
