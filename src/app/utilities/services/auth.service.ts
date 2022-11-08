import { Observable, of, ReplaySubject, Subject } from "rxjs";

import { UserTypeService } from "./user-type.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AppConfigsService } from "../../utilities/services/app-configs.service";
import { Authority, TokenStorageService } from "./token-storage.service";
import { MessageService } from "src/app/utilities/services/message.service";
import { AppUser } from "../models/app-user";
import { UserType } from "../models/user-type";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public accessToken: string;
  public expiresAt: number;
  public listUser: AppUser[] = [];
  public currentUserSubj = new ReplaySubject<number>();
  public superAdmin = new UserType();
  API = this.appConfigService.apiUrl;

  // for production
  isAuthenticated = false;
  isAdmin = false;

  isCaissier = false;
  isSecretaire = false;
  isSuperAdmin = false;
  isComptable = false;

  API_MARTSCO: any;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar, public appConfigService: AppConfigsService,
    public httpClient: HttpClient,
    public router: Router,
    public userTypeService: UserTypeService,
    private tokenStorageService: TokenStorageService,
    private messageService: MessageService
  ) {
    this.updateCurrentUser();

    //for development
    // this.isAuthenticated = true;
    // this.isAdmin = true;
  }

  public login(login: string, password: string): void {
    console.log(" reception login: " + login + " password: " + password);

    const body = { username: login, password: password };

    this.httpClient.post<any>(this.API + "/login", body).subscribe(
      (response: any) => {
        this.tokenStorageService.saveToken(response);

        this.isAuthenticated = true;
        this.messageService.showSucces("Authentifié", true);
        this.setRoles();

        this.updateCurrentUser();
      },
      (error) => {
        this.isAuthenticated = false;
        this.messageService.showReject("Accès refusé", true);
      }
    );
  }

  updateCurrentUser() {
    //set App user id
    this.findUserIdByLogin(this.tokenStorageService.getUserLogin()).subscribe((resp) => {
      if (resp !== undefined) {
        this.currentUserSubj.next(resp);
      }
    });
  }

  findUserIdByLogin(login: string): Observable<number> {
    if (login !== null && login !== undefined) {
      return this.httpClient.get<number>(`${this.API}/employee-auth/find-user-id-by-login/${login}`);
    } else {
      return of(undefined);
    }
  }

  public logout(): void {
    this.tokenStorageService.removeAuthToken();
    this.removeRoles();
    this.router.navigate(["/"]);
  }

  removeRoles() {
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isSuperAdmin = false;
    this.isCaissier = false;
    this.isSecretaire = false;
    this.isComptable = false;
  }

  public setRoles() {
    const authorities: Authority[] = this.tokenStorageService.getUserAuthorities();

    console.log("authorities: " + authorities);
    if (authorities) {
      for (const auth of authorities) {
        if (auth.authority === "ROLE_ADMIN") {
          this.isAdmin = true;
        } else if (auth.authority === "ROLE_CAISSIER") {
          this.isCaissier = true;
        } else if (auth.authority === "ROLE_SECRETAIRE") {
          this.isSecretaire = true;
        } else if (auth.authority === "ROLE_SUPER_ADMIN") {
          this.isSuperAdmin = true;
        } else if (auth.authority === "ROLE_COMPTABLE") {
          this.isComptable = true;
        }
      }
    }
  }
}
