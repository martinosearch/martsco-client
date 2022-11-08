import { HttpBackend, HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigsService {
  apiUrl: string;
  constructor(private httpClient: HttpClient, private handler: HttpBackend) { }

  ensureInit(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient = new HttpClient(this.handler);

      this.httpClient.get("./assets/configs/configs.json")
        .subscribe(
          (content: AppConfigsService) => {
            Object.assign(this, content);

            //   console.log("configs load successfuly: " + this.apiUrl);
            resolve(this);
          },
          (error) => {
            console.log("unable to load config file");
            reject(error);
          });
    });
  }
}

export const appInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: AppConfigurationFactory,
  deps: [AppConfigsService, HttpClient], multi: true
}

export function AppConfigurationFactory(appConfig: AppConfigsService) {
  return () => appConfig.ensureInit();
}
