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
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.getToken();
    // console.log(" >>>>>>>>>>>>>>>>>>>>> I am working!!!!!!!!!!" + req.url);
    // console.log(" >>>>>>>>>>>>>>>>>>>>> token: " + token);

    authReq = req.clone({
      url: req.url,
      headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token),
    });

    return next.handle(authReq);
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
