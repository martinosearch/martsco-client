import { Component, OnInit } from '@angular/core';
import { Menu } from '../models/menu';

import { ConstanceService } from '../services/constance.service';

@Component({
  selector: 'app-principal-menu',
  templateUrl: './principal-menu.component.html',
  styleUrls: ['./principal-menu.component.scss']
})
export class PrincipalMenuComponent implements OnInit {

  constructor(public constanceService: ConstanceService) { }

  ngOnInit() {
  }

  isActive(menu: Menu) {
    return menu.id === this.constanceService.currentMenu.id;
  }

}
