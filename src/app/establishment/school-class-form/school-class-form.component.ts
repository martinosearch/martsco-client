import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Titulaire } from 'src/app/establishment/models/titulaire';
import { Year } from 'src/app/establishment/models/year';
import { EmployeeIdentityBean } from '../../employees-mg/models/employee-identity-bean';
import { SchoolClassIdentityBean } from '../models/school-class-identity-bean';
import { AcademicStandardService } from '../services/academic-standard.service';
import { EmployeeIdentityService } from '../../employees-mg/services/employee-identity.service';
import { SchoolClassIdentityService } from '../services/school-class-identity.service';
import { YearService } from '../services/year.service';
import { ConstanceService } from '../../utilities/services/constance.service';
import { AcademicStandardIdentityBean } from '../models/academic-standard-identity-bean';
import { SchoolClassSettingBean } from '../models/school-class-setting-bean';
import { SchoolClassSettingService } from '../services/school-class-setting.service';
import { MessageService } from 'src/app/utilities/services/message.service';

@Component({
  selector: 'app-school-class-form',
  templateUrl: './school-class-form.component.html',
  styleUrls: ['./school-class-form.component.scss']
})

export class SchoolClassFormComponent implements OnInit, OnDestroy {
  public model: SchoolClassIdentityBean;
  public modelSetting: SchoolClassSettingBean;

  public standardId: number;
  public event: EventEmitter<any> = new EventEmitter();
  public types: AcademicStandardIdentityBean[] = [];

  isSetting = false;
  listTitulaireTitre = ["Le Titulaire", "Le Titulaire de Classe", "Le Maître"];
  titulaireTitre = "Le Titulaire";
  titulaires: EmployeeIdentityBean[] = [];
  titulaireId: number;
  currentYear: Year;
  currentYearId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<SchoolClassFormComponent>, private messageService: MessageService,
    public employeeService: EmployeeIdentityService,
    public constanceService: ConstanceService, public yearService: YearService,
    private schoolClassSettingService: SchoolClassSettingService,
    public academicStandardService: AcademicStandardService,
    public schoolClassIdentityService: SchoolClassIdentityService) { }

  ngOnInit() {
    this.academicStandardService.getAll().subscribe((resp) => {
      this.types = resp;
    });

    this.model = this.data.obj !== undefined ? Object.assign({}, this.data.obj) : new SchoolClassIdentityBean();

    //console.log("model >>> " + JSON.stringify(this.model));

    this.standardId = this.model.standard !== undefined ? this.model.standard.id : undefined;
    this.isSetting = this.data.isSetting !== undefined ? this.data.isSetting : false;

    this.employeeService.getAll().subscribe((resp) => {
      this.titulaires = resp;
    });

    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
      this.currentYearId = this.currentYear.id;
      console.log("current year id: " + this.currentYearId);

      //find setting bean
      this.schoolClassSettingService.findOne(this.model.id).subscribe((respSet) => {
        console.log('bean setting: ' + JSON.stringify(respSet));

        if (respSet !== null) {
          this.modelSetting = respSet;

          this.schoolClassSettingService.findCurrentSetting(respSet, this.currentYearId).subscribe((respTit) => {
            if (respSet !== null) {
              console.log('Titulaire: ' + respTit);
              this.titulaireId = respTit !== undefined ? respTit.id : undefined;
            }
          });
        } else {
          this.modelSetting = new SchoolClassSettingBean();
        }
      });
    });
  }

  ngOnDestroy(): void {
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    const std = this.types.filter(item => item.id === this.standardId)[0];

    this.model.standard = std;

    if (this.isSetting) {
      if (this.titulaireId !== undefined) {
        this.employeeService.getOne(this.titulaireId).subscribe(
          (resp) => {
            const titulaire = new Titulaire();
            titulaire.employee = resp;
            titulaire.year = this.currentYear;
            titulaire.titre = this.titulaireTitre;

            const tempTitulaires = this.modelSetting.titulaires.filter(tit => tit.year.id !== this.currentYearId);
            tempTitulaires.push(titulaire);
            this.modelSetting.titulaires = tempTitulaires;

            this.saveData(this.model, this.modelSetting);
          }
        );
      }
    } else {
      this.saveData(this.model);
    }
  }

  saveData(modelIdentity: SchoolClassIdentityBean, modelSetting?: SchoolClassSettingBean) {
    this.schoolClassIdentityService.save(modelIdentity).subscribe(resp1 => {
      console.log('identity bean saved: ');
      if (modelSetting) {
        this.schoolClassSettingService.saveSettings(modelSetting).subscribe(
          (resp2) => {
            this.messageService.showSucces();
            this.event.emit(this.model);
            this.form.close();
          },
          (error) => {
            console.log("error: " + error.error.message);
          });
      } else {
        this.event.emit(this.model);
        this.form.close();
      }
    });
  }
}
