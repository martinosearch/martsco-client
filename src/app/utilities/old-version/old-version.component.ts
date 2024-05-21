import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-old-version',
  templateUrl: './old-version.component.html',
  styleUrls: ['./old-version.component.scss']
})
export class OldVersionComponent implements OnInit {
  isRunning = false;

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService) { }

  ngOnInit() {
  }

  onImportAll() {
    this.httpClient.get<any[]>(this.routeService.oldVersionImportAllUrl).subscribe((resp) => {
      this.isRunning = true;
    },
      () => {
        this.isRunning = false;
      })
  }

}
