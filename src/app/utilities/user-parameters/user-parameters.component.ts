import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { EmployeeIdentityService } from '../../employees-mg/services/employee-identity.service';
import { EmployeeAuth } from '../models/employee-auth';

@Component({
  selector: 'app-user-parameters',
  templateUrl: './user-parameters.component.html',
  styleUrls: ['./user-parameters.component.scss']
})
export class UserParametersComponent implements OnInit {
  public panelOpenState = false;
  public model = new EmployeeAuth();
  public currentUserId: number;
  public hide = true;

  constructor(public authService: AuthService, public employeeAuthService: EmployeeIdentityService) {
  }

  ngOnInit() {
    this.authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    });
  }

  onSubmit() {
    this.employeeAuthService.save(this.model).subscribe(
      (rsp) => {
        console.log('user updated correctely' + rsp);
      }
    );
  }
}
