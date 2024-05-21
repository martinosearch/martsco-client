import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Year } from 'src/app/establishment/models/year';
import { Decoupage } from '../../establishment/models/decoupage';
import { EvaluationTypeService } from '../services/evaluation-type.service';
import { YearService } from '../../establishment/services/year.service';
import { ConstanceService } from '../../utilities/services/constance.service';
import { Evaluation } from '../models/evaluation';
import { EvaluationType } from '../models/evaluation-type';
import { EvaluationService } from '../services/evaluation.service';
import { DecoupageService } from 'src/app/establishment/services/decoupage.service';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss']
})
export class EvaluationFormComponent implements OnInit, OnDestroy {
  public model: Evaluation;
  public typeId: number;
  public decoupageId: number;
  public yearId: number;

  public event: EventEmitter<any> = new EventEmitter();
  public types: EvaluationType[] = [];
  public decoupages: Decoupage[] = [];
  public years: Year[] = [];
  currentYear: Year;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<EvaluationFormComponent>,
    public decoupageService: DecoupageService, private yearService: YearService, public evaluationService: EvaluationService,
    public constanceService: ConstanceService, public evaluationTypeService: EvaluationTypeService,
  ) { }

  ngOnInit() {
    this.model = this.data.obj !== undefined ? this.data.obj : new Evaluation();
    this.typeId = this.model.type !== null ? this.model.type.id : undefined;
    this.decoupageId = this.model.decoupage !== null ? this.model.decoupage.id : undefined;

    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
      this.yearId = this.currentYear.id;

      this.evaluationTypeService.getAll().subscribe((resp) => {
        this.types = resp;
      });

      this.decoupageService.getAll().subscribe((resp) => {
        this.decoupages = resp;
      });

      this.yearService.getAll().subscribe((resp) => {
        this.years = resp;
      });
    });
  }

  ngOnDestroy(): void {
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.decoupageService.getOne(this.decoupageId).subscribe(
      (respDec) => {
        this.evaluationTypeService.getOne(this.typeId).subscribe(
          (respType) => {
            this.model.year = this.currentYear;
            this.model.decoupage = respDec;
            this.model.type = respType;


            this.evaluationService.save(this.model).subscribe(response2 => {
              this.event.emit();
              this.form.close();
            });

          }
        );
      }
    );
  }
}
