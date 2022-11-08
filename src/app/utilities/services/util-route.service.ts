import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilRouteService {

  public accueil = '/welcome';
  public journalRoute = '/app-journal/show';

  // user-menu
  public userParamsRoute = '/user-params/show';
  public userDashBoardRoute = '/user-dashboard/show';

  constructor() { }
}
