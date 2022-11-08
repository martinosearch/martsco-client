import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MySubject } from 'src/app/subject-mg/models/subject';
import { SubjectService } from 'src/app/subject-mg/subject.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { MessageService } from 'src/app/utilities/services/message.service';
import { ExamChooserModel } from '../models/exam-chooser-model';
import { EstablishmentExamIdentityBean } from '../models/exam-establishment-identity-bean';
import { ExamIdentityBean } from '../models/exam-identity-bean';
import { EstablishmentExamIdentityService } from '../services/establishment-exam-identity.service';
import { ExamIdentityService } from '../services/exam-identity.service';
import { ExamSettingService } from '../services/exam-setting.service';

@Component({
  selector: 'app-exam-chooser',
  templateUrl: './exam-chooser.component.html',
  styleUrls: ['./exam-chooser.component.scss']
})
export class ExamChooserComponent implements OnInit {
  model = new ExamChooserModel();
  exams: ExamIdentityBean[] = [];
  subjects: MySubject[] = [];
  establishments: EstablishmentExamIdentityBean[] = [];

  //options
  isExamChooser = true;
  isSubjectChooser = false;
  isEstablishmentChooser = false;

  currentExamId: number;
  currentSubjectId: number;
  currentEstablishmentId: number;

  eventEmitter: EventEmitter<any> = new EventEmitter();
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private form: MatDialogRef<ExamChooserComponent>,
    private messageService: MessageService, private subjectService: SubjectService,
    private examIdentityService: ExamIdentityService, private examSettingService: ExamSettingService,
    public constanceService: ConstanceService, private establishmentService: EstablishmentExamIdentityService) { }

  ngOnInit() {
    this.title = this.data.title;
    this.isExamChooser = this.data.isExamChooser !== undefined ? this.data.isExamChooser : true;
    this.isSubjectChooser = this.data.isSubjectChooser !== undefined ? this.data.isSubjectChooser : false;
    this.isEstablishmentChooser = this.data.isEstablishmentChooser !== undefined ? this.data.isEstablishmentChooser : false;


    this.examIdentityService.getAll().subscribe((resp) => {
      this.exams = resp;
      this.currentExamId = resp[0].id;
      // console.log("currentExamId: " + this.currentExamId);

      this.establishmentService.getAll().subscribe(
        (respEst) => {
          this.establishments = respEst;
          this.currentEstablishmentId = respEst[0].id;
          this.setSubjectList();
        },
        (error) => {
          this.setSubjectList();
        });
    });
  }

  setSubjectList() {
    this.subjectService.getAll().subscribe((resp) => {
      this.examSettingService.getOne(this.currentExamId).subscribe((respAttrib) => {
        const attribs = respAttrib.subjectAttributions;

        this.subjects = resp.filter((item) => {
          const test = attribs.filter((itemAttrib) => (itemAttrib.subject.id === item.id));
          return test.length > 0;
        }).slice();

        //current subjectId
        this.currentSubjectId = this.subjects.length > 0 ? this.subjects[0].id : undefined;
      });
    });
  }

  ngOnDestroy(): void {
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    const testExam = this.exams.filter((item) => (item.id === this.currentExamId));
    if (testExam.length > 0) {
      this.model.exam = testExam[0];
    }

    const testSubject = this.subjects.filter((item) => (item.id === this.currentSubjectId));
    if (testSubject.length > 0) {
      this.model.subject = testSubject[0];
    }

    const testEstablishment = this.establishments.filter((item) => (item.id === this.currentEstablishmentId));
    if (testEstablishment.length > 0) {
      this.model.establishment = testEstablishment[0];
    }

    this.eventEmitter.emit(this.model);
    this.form.close();

  }

  sleep(ms: number) {
    return new Promise(resolve => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }
}
