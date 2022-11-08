import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MySubject } from 'src/app/subject-mg/models/subject';
import { CoefAttribution } from '../models/coef-attribution';
import { ClassChooserModel } from '../../establishment/models/class-chooser-model';
import { AcademicStandardService } from '../../establishment/services/academic-standard.service';
import { SubjectService } from '../../subject-mg/subject.service';
import { ReductionStudentFormComponent } from '../../compta/reduction-student-form/reduction-student-form.component';
import { AcademicStandardSettingBean } from 'src/app/evaluation-trim/models/academic-standard-setting-bean';
import { AcademicStandardIdentityBean } from 'src/app/establishment/models/academic-standard-identity-bean';
import { Year } from 'src/app/establishment/models/year';
import { MessageService } from 'src/app/utilities/services/message.service';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-coef-setting',
  templateUrl: './coef-setting.component.html',
  styleUrls: ['./coef-setting.component.scss']
})
export class CoefSettingComponent implements OnInit, OnDestroy {
  expandedElement: MySubject | null;
  displayedColumns = [
    'num', 'designation', 'coef'
  ];

  coefs: number[] = [];
  defaultCoefs: number[] = [0.5, 1, 2, 3, 4, 5];
  model: AcademicStandardIdentityBean;
  modelSettingBean: AcademicStandardSettingBean;

  coefAttribsForThisYear = [];
  onlyGreatherThanOne = false;
  refreshTable = new Subject<any[]>();

  isRunning = false;
  showActions = false;
  event: EventEmitter<any> = new EventEmitter();
  currentYear: Year;


  constructor(
    public auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: ClassChooserModel, private messageService: MessageService,
    public dialog: MatDialog, public form: MatDialogRef<ReductionStudentFormComponent>,
    private subjectService: SubjectService, public standardService: AcademicStandardService
  ) { }

  ngOnInit() {
    this.isRunning = true;
    this.model = this.data.standard;
    this.currentYear = this.data.year;

    this.refreshTable.subscribe((resp) => {
      this.coefs = this.coefs.slice();
      this.coefAttribsForThisYear = resp;

      console.log("items refreshed !!!!! size: " + this.coefAttribsForThisYear);
    });

    this.standardService.getAcademicStandardBullResultModel(this.model.id).subscribe((respSettingBean) => {
      this.modelSettingBean = respSettingBean;
      this.refresh();
    });
  }

  refresh() {
    this.standardService.findCoefForThisYear(this.modelSettingBean, this.currentYear.id).subscribe((respCoefs) => {
      this.coefAttribsForThisYear = respCoefs;

      this.coefs = [];
      this.subjectService.getAll().subscribe((respSubj) => {
        const temp = [];
        for (const defaultSubj of respSubj) {
          let exists = false;

          for (const coefAttrib of this.coefAttribsForThisYear) {
            if (coefAttrib.subject.id === defaultSubj.id) {
              exists = true;

              if (this.onlyGreatherThanOne) {
                if (coefAttrib.value > 1) {
                  this.coefs.push(coefAttrib.value);
                  temp.push(coefAttrib);
                }
              } else {
                this.coefs.push(coefAttrib.value);
                temp.push(coefAttrib);
              }

              break;
            }
          }

          if (!exists && !this.onlyGreatherThanOne) {
            const attrib = new CoefAttribution();
            attrib.year = this.data.year;
            attrib.subject = defaultSubj;

            this.coefs.push(attrib.value);
            temp.push(attrib)
          }
        }

        this.isRunning = false;

        this.refreshTable.next(temp);

      });
    });
  }

  ngOnDestroy(): void { }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onSubmit() {
    console.log("on saving saved !!! : " + JSON.stringify(this.coefs));
    let index = 0;

    for (const coef of this.coefs) {
      this.coefAttribsForThisYear[index].value = coef;
      index++;
    }

    this.standardService.findCoefsForOtherYear(this.modelSettingBean, this.currentYear.id)
      .subscribe((respOther) => {
        const orderCoefAttribsForThis = respOther;

        for (const item of this.coefAttribsForThisYear) {
          orderCoefAttribsForThis.push(item);
        }

        this.modelSettingBean.coefAttributions = orderCoefAttribsForThis;

        this.standardService.saveSettings(this.modelSettingBean).subscribe((resp) => {
          this.modelSettingBean = resp;
          this.refresh();
          this.messageService.showSucces();
        });
      });
  }

  onExit() {
    this.form.close();
  }
}
