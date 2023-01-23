import { Observable, of, ReplaySubject, Subject } from "rxjs";

import { UserTypeService } from "./user-type.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppConfigsService } from "../../utilities/services/app-configs.service";
import { Authority, TokenStorageService } from "./token-storage.service";
import { MessageService } from "src/app/utilities/services/message.service";
import { AppUser } from "../models/app-user";
import { UserType } from "../models/user-type";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConstanceService } from "./constance.service";
import { Menu } from "../models/menu";
import { UserService } from "./user.service";

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
  isTeacher = false;

  // permission
  enabledMenus: number[] = [];


  API_MARTSCO: any;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar, public appConfigService: AppConfigsService,
    public httpClient: HttpClient,
    public router: Router,
    public userTypeService: UserTypeService, public userService: UserService,
    private tokenStorageService: TokenStorageService,
    private messageService: MessageService, private constanceService: ConstanceService
  ) {
    this.updateCurrentUser();

    //for development
    this.isAuthenticated = true;
    this.isAdmin = true;
  }

  public login(login: string, password: string): void {
    console.log(" reception login: " + login + " password: " + password);

    const body = { username: login, password: password };

    this.httpClient.post<any>(this.API + "/login", body).subscribe(
      (response: any) => {
        this.tokenStorageService.saveToken(response);

        this.isAuthenticated = true;
        this.messageService.showSucces("Bienvenue " + this.tokenStorageService.getUserLogin().toUpperCase(), true);
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
    this.userService.findUserIdByLogin(this.getUserLogin()).subscribe((resp) => {
      if (resp !== undefined) {
        this.currentUserSubj.next(resp);
      }
    });
  }

  getUserLogin(): string {
    return this.tokenStorageService.getUserLogin();
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

    this.enabledMenus = [];
  }

  public setRoles() {
    const authorities: Authority[] = this.tokenStorageService.getUserAuthorities();

    console.log("authorities: " + JSON.stringify(authorities));
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
        } else if (auth.authority === "ROLE_TEACHER") {
          this.isTeacher = true;
        }

        //permission munu
        else if (auth.authority === "establishment:enable") {
          this.setEnabledMenu(this.constanceService.etablissement);
        } else if (auth.authority === "evaluation:enable") {
          this.setEnabledMenu(this.constanceService.evaluations);
        } else if (auth.authority === "examen:enable") {
          this.setEnabledMenu(this.constanceService.exams);
        } else if (auth.authority === "compta:enable") {
          this.setEnabledMenu(this.constanceService.comptabilite);
        } else if (auth.authority === "biblio:enable") {
          this.setEnabledMenu(this.constanceService.bibliotheque);
        } else if (auth.authority === "cantine:enable") {
          this.setEnabledMenu(this.constanceService.cantine);
        } else if (auth.authority === "planning:enable") {
          this.setEnabledMenu(this.constanceService.planning);
        }

        // permission submenu
        else if (auth.authority === "rapport_saisie:enable") {
          this.setEnabledMenu(this.constanceService.rapportSaisie);
        } else if (auth.authority === "evaluation_sub:enable") {
          this.setEnabledMenu(this.constanceService.evaluation_sub);
        } else if (auth.authority === "base_data_eavl:enable") {
          this.setEnabledMenu(this.constanceService.baseDataEval);
        }

        //  console.log("enabled menu: " + JSON.stringify(this.enabledMenus));
        this.setAccueil();
      }
    }
  }

  setEnabledMenu(menu: Menu) {
    // console.log(">>>>> enabling" + JSON.stringify(menu));
    this.enabledMenus.push(menu.id);
  }

  setAccueil() {
    const idStored = Number(this.constanceService.storageLocation.getItem("id_menu"));
    const currentMenuStagged = this.constanceService.menus.filter((menu) => (menu.id === idStored))[0];


    //console.log(">>>>>>" + this.constanceService.currentMenu);
    if (currentMenuStagged !== undefined) {
      const isallowed = this.enabledMenus.includes(currentMenuStagged.id);

      if (isallowed) {
        this.constanceService.setMenu(currentMenuStagged);
      }
    }

    if (this.constanceService.currentMenu === undefined) {
      this.constanceService.setMenu(this.constanceService.getMenu(this.enabledMenus[0]));
    }
  }

  isEnabledMenu(menu: Menu): boolean {
    if (this.isAdmin) {
      return true;
    } else {
      for (const id of this.enabledMenus) {
        if (id === menu.id) {
          return true;
        }
      }
    }
    return false;
  }

}
