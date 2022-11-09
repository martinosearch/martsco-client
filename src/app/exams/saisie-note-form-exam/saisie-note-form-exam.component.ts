import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SchoolClassChooserFormComponent } from 'src/app/establishment/school-class-chooser-form/class-chooser-form.component';
import { MySubject } from 'src/app/subject-mg/models/subject';
import { MessageService } from 'src/app/utilities/services/message.service';
import { CandidateIdentityBean } from '../models/candidate-identity-bean';
import { ExamChooserModel } from '../models/exam-chooser-model';
import { ExamIdentityBean } from '../models/exam-identity-bean';
import { MarkExam } from '../models/mark-exam';
import { CandidateIdentityService } from '../services/candidate-identity.service';

@Component({
  selector: 'app-saisie-note-form-exam',
  templateUrl: './saisie-note-form-exam.component.html',
  styleUrls: ['./saisie-note-form-exam.component.scss']
})
export class SaisieNoteFormExamComponent implements OnInit {
  markForm: FormGroup;

  isFirst = true;
  isLast = false;

  //student
  candidates: CandidateIdentityBean[] = [];
  currentCandidate: CandidateIdentityBean;

  //exam
  currentExam: ExamIdentityBean;
  currentSubject: MySubject;
  chooserModel: ExamChooserModel;

  studentIndex = 0;
  total = 0;

  //view child
  @ViewChild("firstNote", { static: false }) firstNote: ElementRef;

  noteMax = 20;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<SchoolClassChooserFormComponent>,
    public candidateIdentityService: CandidateIdentityService,
    public messageService: MessageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();

    this.chooserModel = this.data.chooserModel;
    this.currentExam = this.chooserModel.exam;
    this.currentSubject = this.chooserModel.subject;

    this.candidateIdentityService.getAllByTableNumber(this.currentExam.id).subscribe((resp) => {
      this.candidates = resp;
      this.total = this.candidates.length;

      this.setCurrentCandidate(this.studentIndex);
    })
  }

  initForm() {
    this.markForm = this.formBuilder.group({
      note1: new FormControl("", [Validators.max(this.noteMax)]),
    });

    this.onFocusFirst();
  }

  //focus first
  onFocusFirst() {
    this.resolveFirstNote(500).then((resp: ElementRef) => {
      if (resp !== undefined) {
        resp.nativeElement.focus();
        resp.nativeElement.select();
      }
    });
  }

  resolveFirstNote(ms: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.firstNote);
      }, ms);
    });
  }

  onNoClick(): void {
    this.form.close();
  }

  setCurrentCandidate(studentIndex: number) {
    if (studentIndex === 0) {
      this.isFirst = true;
      this.isLast = false;
    } else if (studentIndex === this.total - 1) {
      this.isLast = true;
      this.isFirst = false;
    } else {
      this.isFirst = false;
      this.isLast = false;
    }

    this.currentCandidate = this.candidates[studentIndex];

    // initialisation of marks
    this.markForm.reset();

    // update marks
    this.findMark(this.currentCandidate, this.currentSubject.id).subscribe((resp) => {
      console.log("find mark: " + resp);
      this.markForm.patchValue({ note1: resp });
    });
  }

  next() {
    this.studentIndex++;
    this.setCurrentCandidate(this.studentIndex);
  }

  previous() {
    this.studentIndex--;
    this.setCurrentCandidate(this.studentIndex);
  }

  toLast() {
    this.studentIndex = this.total - 1;
    this.setCurrentCandidate(this.studentIndex);
  }

  toFirst() {
    this.studentIndex = 0;
    this.setCurrentCandidate(this.studentIndex);
  }

  onSubmit(): void {
    //list mark
    const tempListMarks: MarkExam[] = [];
    tempListMarks.push(new MarkExam(this.currentSubject, this.markForm.value["note1"]));

    const stagedListMarks = this.currentCandidate.marks.filter((item) => {
      let skip = true;
      for (const mark of tempListMarks) {
        if (mark.subject.id === item.subject.id
        ) {
          skip = false;
        }
      }
      return skip;
    });

    for (const mark of tempListMarks) {
      stagedListMarks.push(mark);
    }

    this.currentCandidate.marks = stagedListMarks;

    this.candidateIdentityService
      .save(this.currentCandidate)
      .subscribe((resp) => {
        //update index
        if (this.studentIndex < this.total - 1) {
          this.studentIndex++;

          //on rafraichi les données
          this.setCurrentCandidate(this.studentIndex);
        } else {
          this.messageService.showAlertMessage("Terminé!");
        }
        this.onFocusFirst();
      });
  }

  findMark(candidate: CandidateIdentityBean, subjectId: number): Observable<number> {
    return new Observable((observer) => {
      const mark = candidate.marks.filter((item) => (item.subject.id === subjectId))[0];
      observer.next(mark.value);
    });
  }
}
