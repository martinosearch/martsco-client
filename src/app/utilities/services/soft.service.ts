import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RouteService } from "./route.service";

@Injectable({
  providedIn: "root"
})
export class SoftService {
  constructor(
    public httpClient: HttpClient, public routeService: RouteService
  ) { }

  makeCorrections(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.routeService.softCorrection}`
    );
  }
}
