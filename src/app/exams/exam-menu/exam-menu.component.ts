import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActionService } from 'src/app/utilities/services/action.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { ExamChooserComponent } from '../exam-chooser/exam-chooser.component';
import { SaisieNoteFormExamComponent } from '../saisie-note-form-exam/saisie-note-form-exam.component';
import { ExamResultReportService } from '../services/exam-result-report.service';
import { ExamRoutesService } from '../services/exam-routes.service';
import { ExamStatReportService } from '../services/exam-stat-report.service';

@Component({
  selector: 'app-exam-menu',
  templateUrl: './exam-menu.component.html',
  styleUrls: ['./exam-menu.component.scss']
})
export class ExamMenuComponent implements OnInit {
  public expanded = false;

  constructor(private router: Router, private dialog: MatDialog, private actionService: ActionService,
    private examResultReportService: ExamResultReportService, private examStatReportService: ExamStatReportService,
    private constanceService: ConstanceService, private routeService: ExamRoutesService) { }

  ngOnInit() {
  }

  toListExam() {
    this.router.navigate([this.routeService.examListRoutes]);
  }

  toListSubject() {
    this.router.navigate([this.routeService.subjectListRoutes]);
  }

  toEstablishmentList() {
    this.router.navigate([this.routeService.establishementListRoutes]);
  }

  toCandidateList() {
    this.constanceService.toAccueil();
    const chooserData = { titre: 'Choisir un examen' };

    const dialogRef = this.dialog.open(ExamChooserComponent, {
      width: '600px',
      data: chooserData
    });

    dialogRef.componentInstance.eventEmitter.subscribe(
      (resp) => {
        this.router.navigate([this.routeService.candidateListRoutes], { state: { chooserModel: resp } });
      });
  }

  toSaisieNotes() {
    this.constanceService.toAccueil();

    const dialogChooser = this.dialog.open(ExamChooserComponent, {
      width: '600px',
      data: { titre: 'Choisir les paramètres', isSubjectChooser: true }
    });

    dialogChooser.componentInstance.eventEmitter.subscribe(
      (resp) => {
        const dialogSaisieForm = this.dialog.open(SaisieNoteFormExamComponent, {
          width: '600px',
          data: { titre: "Saisie des notes", chooserModel: resp }
        });
      }
    );
  }

  toRapportSaisie() {
    this.actionService.launchAction(this.examResultReportService
      .generateRapportSaisiePdf()).subscribe();
  }

  toReleveNotes() {
    this.actionService.launchAction(this.examResultReportService
      .generateRelevePdf()).subscribe();
  }

  toResultGen() {
    this.actionService.launchAction(this.examResultReportService
      .generateResultGenPdf()).subscribe();
  }

  toStatEstablishment() {
    this.actionService.launchAction(this.examStatReportService
      .generateStatEstablishmentPdf()).subscribe();
  }

  toStatAll() {

  }
}
