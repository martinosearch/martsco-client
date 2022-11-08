import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/utilities/services/action.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  constructor(public actionService: ActionService) { }

  ngOnInit() {
  }

}
