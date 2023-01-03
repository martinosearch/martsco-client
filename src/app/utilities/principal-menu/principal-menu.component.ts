import { Component, OnInit } from '@angular/core';
import { Menu } from '../models/menu';
import { AuthService } from '../services/auth.service';

import { ConstanceService } from '../services/constance.service';

@Component({
  selector: 'app-principal-menu',
  templateUrl: './principal-menu.component.html',
  styleUrls: ['./principal-menu.component.scss']
})
export class PrincipalMenuComponent implements OnInit {

  constructor(public constanceService: ConstanceService, public authService: AuthService) { }

  ngOnInit() {
  }

  isActive(menu: Menu): boolean {
    return this.constanceService.currentMenu !== null ? menu.id === this.constanceService.currentMenu.id : false;
  }

}
