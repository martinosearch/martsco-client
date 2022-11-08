import { Component, EventEmitter, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { AcademicStandardSetting } from 'src/app/evaluation-trim/models/academic-standard-setting';
import { Decoupage } from 'src/app/establishment/models/decoupage';
import { DecoupageType } from 'src/app/establishment/models/decoupage-type';
import { Year } from 'src/app/establishment/models/year';
import { AcademicStandardService } from 'src/app/establishment/services/academic-standard.service';
import { YearService } from 'src/app/establishment/services/year.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { AcademicStandardSettingBean } from '../../evaluation-trim/models/academic-standard-setting-bean';
import { AcademicStandardIdentityBean } from '../models/academic-standard-identity-bean';
import { MessageService } from 'src/app/utilities/services/message.service';
import { DecoupageTypeService } from '../services/decoupage-type.service';
import { DecoupageService } from '../services/decoupage.service';


@Component({
  selector: 'app-academic-standart-form',
  templateUrl: './academic-standart-form.component.html',
  styleUrls: ['./academic-standart-form.component.scss']
})
export class AcademicStandartFormComponent implements OnInit {
  model = new AcademicStandardIdentityBean();
  modelSetting = new AcademicStandardSettingBean();
  setting = new AcademicStandardSetting();

  public event: EventEmitter<any> = new EventEmitter();
  viewHeight = 200;
  isSetting = false;
  currentYear: Year;
  currentYearId: number;
  decoupages: Decoupage[] = [];
  decoupageTypes: DecoupageType[] = [];
  currentDecoupageTypeId: number;
  lastestDecoupageId: number;

  bullModels: BullModel[] = [
    { id: 2, designation: "Model 2 (moy. class + compo)" },
    { id: 3, designation: "Model 3" },
    { id: 4, designation: "Model 4" },
    { id: 5, designation: "Model 5" },
    { id: 6, designation: "Model 6 (Model Primaire)" },
    { id: 12, designation: "Model 12 (Model Primaire A5)" },
    { id: 7, designation: "Model 7 (Model 4 sans num matricule)" },
    { id: 9, designation: "Model 9 (Model 4 sans signature des profs)" },
    { id: 10, designation: "Model 10 (Model 4 avec 3 notes sans num matricule)" },
    { id: 11, designation: "Model 11 (Uniquement le nom de l'élève)" },
    { id: 13, designation: "Model 13 (Model 4 Note de classe - compo)" },
    { id: 14, designation: "Model 14 (Model 4 avec 3 notes avec num matricule)" }
  ];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<AcademicStandartFormComponent>, private messageService: MessageService,
    public yearService: YearService, public constanceService: ConstanceService,
    public standardService: AcademicStandardService,
    public decoupageService: DecoupageService, public decoupageTypeService: DecoupageTypeService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewHeight = window.innerHeight * 0.3;
  }

  ngOnInit() {
    this.viewHeight = window.innerHeight * 0.3;
    this.model = this.data.obj !== undefined ? this.data.obj : new AcademicStandardIdentityBean();
    this.isSetting = this.data.isSetting != undefined ? this.data.isSetting : false;

    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
      this.currentYearId = this.currentYear.id;

      this.decoupageTypeService.getAll().subscribe((respType) => {
        this.decoupageTypes = respType;
        this.refreshDecoupageList();
      });

    });

    this.refreshSetting();
  }

  refreshSetting(): void {
    console.log("refreshing!!!!");

    if (this.model.id !== undefined) {
      this.standardService.getAcademicStandardBullResultModel(this.model.id).subscribe((resp) => {
        this.modelSetting = resp;
        this.standardService.getCurrentSetting(resp, this.currentYear.id).subscribe((set) => {
          console.log("setting ::: " + set);
          if (set !== undefined) {
            this.setting = set;
          } else {
            this.setting = new AcademicStandardSetting();
          }

          if (this.setting.decoupageType !== undefined) {
            this.currentDecoupageTypeId = this.setting.decoupageType.id;
          } else {
            this.currentDecoupageTypeId = this.decoupageTypes[0].id;
          }

          this.refreshDecoupageList();

          if (this.setting.lastestDecoupage !== undefined) {
            this.lastestDecoupageId = this.setting.lastestDecoupage.id;
          } else {
            this.lastestDecoupageId = this.decoupages[this.decoupages.length - 1].id;

            this.decoupageService.getOne(this.lastestDecoupageId).subscribe(r => {
              for (const dec of this.decoupages) {
                if (dec.index > r.index) {
                  this.lastestDecoupageId = dec.id;
                }
              }
            });
          }
        });
      });
    }
  }

  refreshDecoupageList() {
    const decoupageType = this.decoupageTypes.filter(item => item.id === this.currentDecoupageTypeId)[0];

    this.decoupageService.getAll().subscribe((resp) => {
      if (decoupageType.designation.charAt(0).toLowerCase() === "s") {
        this.decoupages = resp.filter(elmt => (elmt.index <= 2));
      } else {
        this.decoupages = resp;
      }

      if (this.lastestDecoupageId === undefined) {
        this.lastestDecoupageId = resp[0].id;
      }
    });
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    const setDecoupageType = new Observable((observer) => {
      this.decoupageTypeService.getOne(this.currentDecoupageTypeId).subscribe(resp => {
        this.setting.decoupageType = resp;
        observer.next();
      })
    });

    const setLastestDecoupage = new Observable((observer) => {
      this.decoupageService.getOne(this.lastestDecoupageId).subscribe(resp => {
        this.setting.lastestDecoupage = resp;
        observer.next();
      })
    });

    if (this.isSetting) {
      setDecoupageType.subscribe(() => {
        setLastestDecoupage.subscribe(() => {
          this.setting.year = this.currentYear;

          const listTemp = [];
          for (const config of this.modelSetting.settings) {
            if (config.year.id !== this.currentYear.id) {
              listTemp.push(config);
            }
          }

          listTemp.push(this.setting);
          this.modelSetting.settings = listTemp;

          //save models
          this.standardService.saveIdentity(this.model).subscribe((resp) => {
            console.log("standard identity saved");
            this.standardService.saveSettings(this.modelSetting).subscribe((respSet) => {
              console.log("standard settings saved");
              this.messageService.showSucces();
              this.event.emit(true);
              this.form.close();
            })
          });
        });
      });
    } else {
      this.standardService.saveIdentity(this.model).subscribe((resp) => {
        this.event.emit(true);
        this.form.close();
      });
    }
  }
}

export interface BullModel {
  id: number;
  designation: string;
}
