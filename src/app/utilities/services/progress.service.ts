import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from './app-configs.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  // api url
  private API = this.appConfigsService.apiUrl;

  constructor(public appConfigsService: AppConfigsService, public httpClient: HttpClient) { }

  getProgress(progressId: number): EventSource {
    return new EventSource(this.API + "/progress/handle/" + progressId);
  }

  getNewProgressId(): Observable<number> {
    return this.httpClient.get<number>(this.API + "/progress/new-id");
  }
}
