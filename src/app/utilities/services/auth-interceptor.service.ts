import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./token-storage.service";

const TOKEN_HEADER_KEY = "Authorization";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  private readonly excludesUrls = ['/utils/', '/auth/', '/progress/', '/employee-auth/', '/employee/list', '/year/',
    '/establishment-identity/my-agency'
  ];

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.getToken();
    //  console.log(" >>>>>>>>>>>>>>>>>>>>> I am working!!!!!!!!!!" + request.url);
    //  console.log(" >>>>>>>>>>>>>>>>>>>>> token: " + token);

    if (this.requiresAuthorization(request)) {
      const modifiedRequest = request.clone({
        url: request.url,
        headers: request.headers.set(TOKEN_HEADER_KEY, "Bearer " + token),
      });

      //console.log("request >>> " + JSON.stringify(modifiedRequest));

      return next.handle(modifiedRequest);
    } else {
      return next.handle(request);
    }
  }

  private requiresAuthorization(request: HttpRequest<any>): boolean {
    // Add logic to determine if the request requires authorization
    // For example, check the request URL, method, or other criteria
    return !this.excludesUrls.some(url => request.url.includes(url));
  }

  getToken() {
    const tokenStorageService = new TokenStorageService();
    return tokenStorageService.storageLocation.getItem("access_token");
  }
}

export const authInterceptorProviders = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
};
