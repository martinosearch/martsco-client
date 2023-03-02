import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvaluationFormComponent } from 'src/app/evaluation-trim/evaluation-form/evaluation-form.component';
import { MySubject } from 'src/app/subject-mg/models/subject';
import { SubjectService } from 'src/app/subject-mg/subject.service';
import { ExamIdentityBean } from '../models/exam-identity-bean';
import { ExamSettingBean } from '../models/exam-setting-bean';
import { SubjectAttribExam } from '../models/subject-attrib-exam';
import { ExamSettingService } from '../services/exam-setting.service';
import { ExamIdentityService } from '../services/exam-identity.service';
import { MessageService } from 'src/app/utilities/services/message.service';
import { EstablishmentExamIdentityBean } from '../models/exam-establishment-identity-bean';
import { EstablishmentExamIdentityService } from '../services/establishment-exam-identity.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExamFormComponent implements OnInit {
  viewHeight = 200;
  isSetting = false;
  public modelIdentityBean = new ExamIdentityBean();
  public modelSettingBean = new ExamSettingBean();

  public event = new EventEmitter();

  displayedColumns = ['num', 'designation', 'type'];

  displayedColumnsSelected = ['num', 'designation', 'coef'];

  expandedElement: MySubject | null;

  numberOfResult = 0;
  currentFilterValue: string;
  count: number;
  enableAction = true;

  subjectList: MySubject[] = [];
  filteredSubjectList: MySubject[] = [];
  selected: SubjectAttribExam[] = [];

  currentDefaultSubject: MySubject;
  currentSelectedSubject: SubjectAttribExam;

  coefs: number[] = [];
  defaultCoefs: number[] = [0.5, 1, 2, 3, 4, 5];

  establishmentHostId: number;
  listEstablishment: EstablishmentExamIdentityBean[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<ExamFormComponent>, private examSettingService: ExamSettingService,
    public examService: ExamIdentityService, private subjectService: SubjectService,
    private messageService: MessageService, private establishmentExamService: EstablishmentExamIdentityService
  ) { }

  ngOnInit() {
    this.isSetting = this.data.isSetting !== undefined ? this.data.isSetting : false;
    this.viewHeight = this.isSetting ? window.innerHeight * 0.8 : window.innerHeight * 0.5;

    //console.log(JSON.stringify(this.data.obj));
    this.modelIdentityBean = this.data.obj !== undefined ? Object.assign({}, this.data.obj) : new ExamIdentityBean();


    if (this.isSetting) {
      // we fetch older configuration
      this.examSettingService.getOne(this.modelIdentityBean.id).subscribe((resp) => {
        if (resp !== null) {
          this.modelSettingBean = resp;

          //init host establishment
          if (this.modelSettingBean.establishmentHost != null) {
            this.establishmentHostId = this.modelSettingBean.establishmentHost.id;
          }

          // init subjectAttributions
          this.selected = resp.subjectAttributions.slice();
          this.selected.slice();
        }
      });

      this.subjectService.getAll().subscribe((resp) => {
        // removing subject that are already choosed
        this.filteredSubjectList = resp.filter((item) => {
          const test = this.selected.filter((older) => (older.subject.id === item.id));
          return test.length === 0 ? true : false;
        });

        this.subjectList = this.filteredSubjectList;
      });

      this.establishmentExamService.getAll().subscribe({
        next: (resp) => {
          this.listEstablishment = resp;
        }
      });
    }
  }


  ngOnDestroy(): void {
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.examService.save(this.modelIdentityBean).subscribe((resp) => {
      this.modelIdentityBean = resp;

      if (this.isSetting) {
        this.modelSettingBean.id = resp.id;

        // set subject attribution
        this.modelSettingBean.subjectAttributions = this.selected;

        // set host establishment
        const establishmentHost = this.listEstablishment.filter(item => item.id === this.establishmentHostId)[0];
        this.modelSettingBean.establishmentHost = establishmentHost;

        console.log("settings: " + JSON.stringify(this.modelSettingBean));

        this.examSettingService.save(this.modelSettingBean).subscribe(resp => {
          this.event.emit();
          this.messageService.showSucces(null, true)
        });
      } else {
        this.event.emit();
        this.form.close();
      }
    });
  }

  defaultSelected(element) {
    console.log('I was called!!');
    this.currentDefaultSubject = element;
    this.currentSelectedSubject = undefined;
  }

  isSelected(element) {
    console.log('I was called for selected !!!');
    this.currentSelectedSubject = element;
    this.currentDefaultSubject = undefined;
  }

  moveDefault(selected?: MySubject) {
    if (selected !== undefined) {
      this.currentDefaultSubject = selected;
    }

    // we move the selected element from the list
    const temp: MySubject[] = [];
    for (const item of this.filteredSubjectList) {
      if (item.id !== this.currentDefaultSubject.id) {
        temp.push(item);
      } else {
        const attrib = new SubjectAttribExam();
        attrib.subject = item;

        this.selected.push(attrib);
        this.selected = this.selected.slice();
      }
    }

    this.filteredSubjectList = temp.slice();
    this.currentDefaultSubject = undefined;
  }

  moveAllDefault() {
    for (const item of this.filteredSubjectList) {
      this.moveDefault(item);
    };
  }

  moveSelected(selected?: SubjectAttribExam) {
    if (selected !== undefined) {
      this.currentSelectedSubject = selected;
    }

    const temp: SubjectAttribExam[] = [];

    // we put default either selected to have typeSubject
    for (const item of this.selected) {
      if (item.subject.id !== this.currentSelectedSubject.subject.id) {
        temp.push(item);
      } else {
        this.filteredSubjectList.push(item.subject);
      }
    }

    this.selected = temp.slice();
    this.filteredSubjectList = this.filteredSubjectList.slice();

    this.currentSelectedSubject = undefined;
    //on rafraichi les attribution
  }

  moveAllSelected() {
    for (const item of this.selected) {
      this.moveSelected(item);
    }
  }
}
