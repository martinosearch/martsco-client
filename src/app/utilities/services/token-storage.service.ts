import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  public storageLocation = sessionStorage;
  //public storageLocation = localStorage;

  constructor() { }

  saveToken(token: any) {
    this.storageLocation.setItem("access_token", token);
  }

  getToken() {
    return this.storageLocation.getItem("access_token");
  }

  removeAuthToken() {
    this.storageLocation.removeItem("access_token");
  }

  getPayLoad(authToken: string) {
    if (authToken) {
      const payload = authToken.split(".")[1];
      const payloadBytes = atob(payload);
      const tokenJson = JSON.parse(payloadBytes);

      return tokenJson;
    } else {
      return null;
    }
  }

  getUserAuthorities(): Authority[] {
    const authToken = this.getToken();

    if (authToken != null) {
      const payload = this.getPayLoad(authToken);
      return payload.authorities;
    } else {
      return [];
    }
  }

  getUserLogin(): string {
    const authToken = this.getToken();

    if (authToken != null) {
      const payload = this.getPayLoad(authToken);
      return payload.sub;
    } else {
      return undefined;
    }
  }
}
export class Authority {
  authority: string;
}
