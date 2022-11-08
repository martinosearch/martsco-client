import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EvaluationChooserModel } from 'src/app/evaluation-trim/models/evaluation-chooser-model';
import { EvaluationSetting } from 'src/app/evaluation-trim/models/evaluation-setting';
import { SchoolClassIdentityBean } from 'src/app/establishment/models/school-class-identity-bean';
import { Year } from 'src/app/establishment/models/year';
import { AcademicStandardService } from 'src/app/establishment/services/academic-standard.service';
import { SchoolClassIdentityService } from 'src/app/establishment/services/school-class-identity.service';
import { YearService } from 'src/app/establishment/services/year.service';
import { EvaluationService } from '../services/evaluation.service';
import { Evaluation } from '../models/evaluation';
import { SchoolClassSettingService } from 'src/app/establishment/services/school-class-setting.service';
import { SchoolClassEvaluationBean } from 'src/app/establishment/models/school-class-evaluation-bean';
import { MessageService } from 'src/app/utilities/services/message.service';

@Component({
  selector: 'app-config-eval-form',
  templateUrl: './config-eval-form.component.html',
  styleUrls: ['./config-eval-form.component.scss']
})

export class ConfigEvalFormComponent implements OnInit, OnDestroy {
  model: EvaluationSetting;
  event: EventEmitter<any> = new EventEmitter();
  evaluations1: Evaluation[] = [];
  evaluations2: Evaluation[] = [];
  evaluations3: Evaluation[] = [];

  currentSchoolClassIdentityBean: SchoolClassIdentityBean;
  currentSchoolClassSettingBean: SchoolClassEvaluationBean;
  schoolClassId: number;

  currentYear: Year;
  currentEvaluationSetting = new EvaluationSetting();
  isRunning = false;
  evaluation11Id: number;
  evaluation12Id: number;
  evaluation13Id: number;
  evaluation14Id: number;

  evaluation21Id: number;
  evaluation22Id: number;
  evaluation23Id: number;
  evaluation24Id: number;

  evaluation31Id: number;
  evaluation32Id: number;
  evaluation33Id: number;
  evaluation34Id: number;
  progressValue: number;
  progressPer: number;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EvaluationChooserModel, private messageService: MessageService,
    public form: MatDialogRef<ConfigEvalFormComponent>, public yearService: YearService,
    public evaluationService: EvaluationService, private schoolClassSettingService: SchoolClassSettingService,
    public schoolClassService: SchoolClassIdentityService, public standardService: AcademicStandardService) { }

  ngOnInit() {
    this.currentSchoolClassIdentityBean = this.data.schoolClassChooser.schoolClass;
    this.currentYear = this.data.schoolClassChooser.year;
    this.schoolClassId = this.currentSchoolClassIdentityBean.id;

    this.evaluationService.getAll().subscribe((resp) => {
      this.evaluationService.findAllEvaluationWithIndex(resp, this.currentYear, 1).subscribe((resp) => {
        this.evaluations1 = resp;
      });

      this.evaluationService.findAllEvaluationWithIndex(resp, this.currentYear, 2).subscribe((resp) => {
        this.evaluations2 = resp;
      });

      this.evaluationService.findAllEvaluationWithIndex(resp, this.currentYear, 3).subscribe((resp) => {
        this.evaluations3 = resp;
      });
    })

    this.schoolClassSettingService.findEvaluationBean(this.schoolClassId).subscribe((resp) => {
      this.currentSchoolClassSettingBean = resp;
      this.refresh();
    })
  }

  refresh() {
    for (const set of this.currentSchoolClassSettingBean.evaluationSettings) {
      if (set.year.id === this.currentYear.id) {
        this.currentEvaluationSetting = set;
        this.evaluation11Id = this.currentEvaluationSetting.eval11 !== null ? this.currentEvaluationSetting.eval11.id : undefined;
        this.evaluation12Id = this.currentEvaluationSetting.eval12 !== null ? this.currentEvaluationSetting.eval12.id : undefined;
        this.evaluation13Id = this.currentEvaluationSetting.eval13 !== null ? this.currentEvaluationSetting.eval13.id : undefined;
        this.evaluation14Id = this.currentEvaluationSetting.eval14 !== null ? this.currentEvaluationSetting.eval14.id : undefined;


        this.evaluation21Id = this.currentEvaluationSetting.eval21 !== null ? this.currentEvaluationSetting.eval21.id : undefined;
        this.evaluation22Id = this.currentEvaluationSetting.eval22 !== null ? this.currentEvaluationSetting.eval22.id : undefined;
        this.evaluation23Id = this.currentEvaluationSetting.eval23 !== null ? this.currentEvaluationSetting.eval23.id : undefined;
        this.evaluation24Id = this.currentEvaluationSetting.eval24 !== null ? this.currentEvaluationSetting.eval24.id : undefined;


        this.evaluation31Id = this.currentEvaluationSetting.eval31 !== null ? this.currentEvaluationSetting.eval31.id : undefined;
        this.evaluation32Id = this.currentEvaluationSetting.eval32 !== null ? this.currentEvaluationSetting.eval32.id : undefined;
        this.evaluation33Id = this.currentEvaluationSetting.eval33 !== null ? this.currentEvaluationSetting.eval33.id : undefined;
        this.evaluation34Id = this.currentEvaluationSetting.eval34 !== null ? this.currentEvaluationSetting.eval34.id : undefined;
      }
    }
  }

  ngOnDestroy(): void {
  }

  onExit(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.isRunning = true;

    // 1st term
    const setNote11 = new Observable(observer => {
      console.log("setting note11 !");
      this.evaluationService.getOne(this.evaluation11Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval11 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    const setNote12 = new Observable(observer => {
      console.log("setting note12 !");
      this.evaluationService.getOne(this.evaluation12Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval12 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    const setNote13 = new Observable(observer => {
      console.log("setting note13 !");
      this.evaluationService.getOne(this.evaluation13Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval13 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    const setNote14 = new Observable(observer => {
      console.log("setting note14 !");
      this.evaluationService.getOne(this.evaluation14Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval14 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    // 2nd term
    const setNote21 = new Observable(observer => {
      console.log("setting note21 !");
      this.evaluationService.getOne(this.evaluation21Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval21 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    const setNote22 = new Observable(observer => {
      console.log("setting note22 !");
      this.evaluationService.getOne(this.evaluation22Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval22 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    const setNote23 = new Observable(observer => {
      console.log("setting note23 !");
      this.evaluationService.getOne(this.evaluation23Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval23 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    const setNote24 = new Observable(observer => {
      console.log("setting note24 !");
      this.evaluationService.getOne(this.evaluation24Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval24 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    // 3rd term
    const setNote31 = new Observable(observer => {
      console.log("setting note31 !");
      this.evaluationService.getOne(this.evaluation31Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval31 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    const setNote32 = new Observable(observer => {
      console.log("setting note32 !");
      this.evaluationService.getOne(this.evaluation32Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval32 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    const setNote33 = new Observable(observer => {
      console.log("setting note33 !");
      this.evaluationService.getOne(this.evaluation33Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval33 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });

    const setNote34 = new Observable(observer => {
      console.log("setting note34 !");
      this.evaluationService.getOne(this.evaluation34Id).subscribe(
        (resp) => {
          this.currentEvaluationSetting.eval34 = resp;
          observer.next();
        },
        (error) => {
          observer.next();
        }
      );
    });


    // action
    this.progressValue = 0;
    setNote11.subscribe(() => {
      this.nextProgress();
      setNote12.subscribe(() => {
        this.nextProgress();
        setNote13.subscribe(() => {
          this.nextProgress();
          setNote14.subscribe(() => {
            this.nextProgress();
            setNote21.subscribe(() => {
              this.nextProgress();
              setNote22.subscribe(() => {
                this.nextProgress();
                setNote23.subscribe(() => {
                  this.nextProgress();
                  setNote24.subscribe(() => {
                    this.nextProgress();
                    setNote31.subscribe(() => {
                      this.nextProgress();
                      setNote32.subscribe(() => {
                        this.nextProgress();
                        setNote33.subscribe(() => {
                          this.nextProgress();
                          setNote34.subscribe(() => {
                            this.nextProgress();
                            this.saveConfigs();
                          });//fin note13
                        });//fin note13
                      });//fin note13
                    });//fin note13
                  });//fin note13
                });//fin note13
              });//fin note13
            });//fin note13
          });//fin note13
        });//fin note13
      });//fin setNote12
    });//fin setNote11
  }

  nextProgress() {
    this.progressValue++;
    this.progressPer = Math.floor(this.progressValue / 13 * 100);
  }

  saveConfigs() {

    const others = this.currentSchoolClassSettingBean.evaluationSettings.filter(item => {
      if (item.year !== null) {
        return item.year.id !== this.currentYear.id ? true : false;
      } else {
        return false;
      }
    });

    this.currentEvaluationSetting.year = this.currentYear;
    others.push(this.currentEvaluationSetting);

    this.currentSchoolClassSettingBean.evaluationSettings = others;

    this.schoolClassSettingService.saveEvaluationSettingBean(this.currentSchoolClassSettingBean).subscribe((resp) => {
      this.isRunning = false;
      console.log("config saved successfuly");
      this.currentSchoolClassSettingBean = resp;
      this.refresh();
      this.messageService.showSucces();
    });
  }
}
