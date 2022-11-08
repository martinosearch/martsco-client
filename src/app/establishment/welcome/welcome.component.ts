import { Component, OnInit } from "@angular/core";
import { ConstanceService } from "src/app/utilities/services/constance.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

  constructor(public constanceService: ConstanceService) { }

  ngOnInit() {
    this.constanceService.setCurrentSection("Accueil");
  }
}
