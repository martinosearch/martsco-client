import { Component, EventEmitter, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Year } from 'src/app/establishment/models/year';
import { SchoolClassIdentityService } from 'src/app/establishment/services/school-class-identity.service';
import { StudentFormComponent } from 'src/app/student-mg/student-form/student-form.component';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { MessageService } from 'src/app/utilities/services/message.service';
import { CandidateIdentityBean } from '../models/candidate-identity-bean';
import { EstablishmentExamIdentityBean } from '../models/exam-establishment-identity-bean';
import { ExamIdentityBean } from '../models/exam-identity-bean';
import { CandidateIdentityService } from '../services/candidate-identity.service';
import { EstablishmentExamIdentityService } from '../services/establishment-exam-identity.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {
  candidateIdentityBean = new CandidateIdentityBean();
  examIdentityBean = new ExamIdentityBean();

  establishments: EstablishmentExamIdentityBean[] = [];

  currentEstablishmentId: number;

  public event: EventEmitter<any> = new EventEmitter();
  public passportURL: string;
  currentYear: Year;
  viewHeight: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<StudentFormComponent>, public dialog: MatDialog,
    public constanceService: ConstanceService,
    public establishmentExamService: EstablishmentExamIdentityService,
    public schoolClassService: SchoolClassIdentityService,
    public messageService: MessageService,
    private candidateIdentityService: CandidateIdentityService
  ) { }

  ngOnInit() {
    this.viewHeight = window.innerHeight * 0.45;
    this.examIdentityBean = this.data.exam !== undefined ? this.data.exam : new ExamIdentityBean();
    this.candidateIdentityBean = this.data.candidate !== undefined ? this.data.candidate : new CandidateIdentityBean();


    this.establishmentExamService.getAll().subscribe((resp) => {
      this.establishments = resp;

      this.currentEstablishmentId = this.candidateIdentityBean.establishment.id !== undefined ? this.candidateIdentityBean.establishment.id : resp[0].id;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewHeight = window.innerHeight * 0.45;
    console.log("windows resizing::::" + event);
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    if (this.examIdentityBean.id !== undefined) {
      this.candidateIdentityBean.exam = this.examIdentityBean;

      const currentEstablishment = this.establishments.filter((item) => (item.id === this.currentEstablishmentId))[0];
      this.candidateIdentityBean.establishment = currentEstablishment;

      this.candidateIdentityService.save(this.candidateIdentityBean).subscribe(
        (resp) => {
          this.event.emit(resp);
          this.form.close();
        },
        (error) => {
          this.event.emit();
          this.form.close();
        }
      );
    } else {
      this.messageService.showErrorMessage("Aucun examen n'est défini");
    }
  }
}
