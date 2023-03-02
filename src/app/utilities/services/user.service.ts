import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { AppUser } from '../models/app-user';
import { UserType } from '../models/user-type';
import { UserTypeService } from './user-type.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(private appConfigsService: AppConfigsService,
    public userTypeService: UserTypeService, public httpClient: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<AppUser[]>(`${this.API_MARTSCO}/user/list`);
  }

  getOne(id: number) {
    return this.httpClient.get<AppUser>(`${this.API_MARTSCO}/user/info/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.API_MARTSCO + '/user/save', data);
  }

  getUserTypeByLogin(login: string): Observable<UserType> {
    return new Observable((observer) => {
      // console.log("login: " + JSON.stringify(login));

      if (login !== null && login !== undefined) {

        this.httpClient.get<UserType>(this.API_MARTSCO +
          "/user/find-user-type-by-login/" + login).subscribe({
            next: (userType) => {

              // console.log("userTypeId: " + JSON.stringify(userType));

              // console.log("user type: " + JSON.stringify(resp));
              observer.next(userType);
            }
          });

      } else {
        return observer.next(undefined);
      }
    });
  }

  findUserIdByLogin(login: string): Observable<number> {
    if (login !== null && login !== undefined) {
      return this.httpClient.get<number>(`${this.API_MARTSCO}/user/find-user-id-by-login/${login}`);
    } else {
      return of(undefined);
    }
  }
}
