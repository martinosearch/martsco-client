import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeIdentityService } from 'src/app/employees-mg/services/employee-identity.service';
import { StudentCursusService } from 'src/app/student-mg/services/student-cursus.service';
import { ActionService } from 'src/app/utilities/services/action.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { SettingService } from 'src/app/utilities/services/setting.service';
import { SoftService } from 'src/app/utilities/services/soft.service';


@Component({
  selector: 'app-param-school',
  templateUrl: './param-school.component.html',
  styleUrls: ['./param-school.component.scss']
})

export class ParamSchoolComponent implements OnInit {
  isRunning = false;
  isDownloading = false;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog, public actionService: ActionService, public progressService: ProgressService,
    public employeeService: EmployeeIdentityService, public softService: SoftService,
    public settingService: SettingService, public studentService: StudentCursusService
  ) { }

  ngOnInit() {
  }


  onSubmit() {
  }

  onMakeCorrections() {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);
      this.softService.makeCorrections().subscribe((resp) => {
        this.actionService.stopWaiting(progressId);
        console.log('resolved!!!!' + resp);
      });
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
