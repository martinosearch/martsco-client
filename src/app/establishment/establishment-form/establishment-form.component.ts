import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LogoEnteteEstablishment } from 'src/app/establishment/models/logo-entete-establishment';
import { LogoFondEstablishment } from 'src/app/establishment/models/logo-fond-establishment';
import { Responsable } from 'src/app/establishment/models/responsable';
import { Stamp } from 'src/app/establishment/models/stamp';
import { Year } from 'src/app/establishment/models/year';

import { EmployeeIdentityBean } from '../../employees-mg/models/employee-identity-bean';
import { EstablishmentIdentityBean } from '../models/establishment-identity-bean';
import { EstablishmentType } from '../models/establishment-type';
import { EmployeeIdentityService } from '../../employees-mg/services/employee-identity.service';
import { EstablishmentTypeService } from '../services/establishment-type.service';
import { EstablishmentService } from '../services/establishment.service';
import { YearService } from '../services/year.service';
import { ConstanceService } from '../../utilities/services/constance.service';
import { FileChooserComponent } from '../../utilities/file-chooser/file-chooser.component';
import { FileService } from 'src/app/utilities/services/file.service';
import { EstablishmentSettingBean } from '../models/establishment-setting-bean';
import { EstablishmentImageBean } from '../models/establishment-image-bean';
import { MessageService } from 'src/app/utilities/services/message.service';

@Component({
  selector: 'app-establishment-form',
  templateUrl: './establishment-form.component.html',
  styleUrls: ['./establishment-form.component.scss']
})

export class EstablishmentFormComponent implements OnInit, OnDestroy {
  public model = new EstablishmentIdentityBean();
  public modelSettingBean = new EstablishmentSettingBean();
  public modelImageBean = new EstablishmentImageBean();

  public typeId: number;
  public employees = new Observable<EmployeeIdentityBean[]>();
  public event: EventEmitter<any> = new EventEmitter();
  public yearControl = new FormControl();
  public types = new Observable<EstablishmentType[]>();
  public years = new Observable<Year[]>();
  public blobLogo: Blob;
  public imageURL: string;
  public imageFondURL: string;
  public stampURL: string;
  public logoEnteteSize: number;
  public logoFondSize: number;
  public stampSize: number;


  public isSetting = false;
  currentYear: Year;
  currentYearId: number;

  directorId: number;
  directorTitre = "Le Chef d'Etablissement";
  listDirectorTitre = ["Le Chef d'Etablissement", "La Cheffe d'Etablissement",
    "Le Proviseur", "La Proviseur", "Le censeur", "La Censeure", "Le Directeur",
    "La Directrice", "Le Directeur des Etudes", "La Directrice des Etudes",
    "Le Directeur Collège", "La Directrice Collège"];


  fondatorId: number;
  fondatorTitre = "Le Fondateur";
  listFondatorTitre = ["Le Fondateur", "La Fondatrice", "Le Promoteur", "La Promotrice",
    "Le Directeur Général", "La Directrice Général"];

  isRunning = false;
  viewHeight = 250;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<EstablishmentFormComponent>, private messageService: MessageService,
    public employeeService: EmployeeIdentityService, public dialog: MatDialog, public fileService: FileService,
    public constanceService: ConstanceService, private yearService: YearService,
    public establishmentTypeService: EstablishmentTypeService,
    public establishmentService: EstablishmentService
  ) { }

  ngOnInit() {
    this.model = this.data.obj != undefined ? Object.assign({}, this.data.obj) : new EstablishmentIdentityBean();
    this.viewHeight = window.innerHeight * 0.45;

    this.typeId = this.model.type !== undefined ? this.model.type.id : undefined;
    this.isSetting = this.data.isSetting !== undefined ? this.data.isSetting : false;
    console.log(">>> isSetting::: " + this.isSetting);

    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
      this.currentYearId = this.currentYear.id;
      console.log("current year id: " + this.currentYearId);
    });


    this.employees = this.employeeService.getAll();
    this.types = this.establishmentTypeService.getAll();
    this.years = this.yearService.getAll();

    this.establishmentService.getSettingBean(this.model.id).subscribe((respSet) => {
      this.modelSettingBean = respSet;
      this.refreshSetting();

      this.establishmentService.getImageBean(this.model.id).subscribe((respImg) => {
        this.modelImageBean = respImg;

        this.updateLogoEntete();
        this.updateLogoFond();
        this.updateStamp();
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewHeight = window.innerHeight * 0.45;
  }

  ngOnDestroy(): void {
  }

  refreshSetting(): void {
    this.yearService.getOne(this.currentYearId).subscribe((resp) => {
      this.currentYear = resp;
    });

    for (const dir of this.modelSettingBean.directors) {
      if (dir.year.id === this.currentYear.id) {
        this.directorId = dir.employee.id;
        this.directorTitre = dir.titre;
      }
    }

    for (const fonde of this.modelSettingBean.fondators) {
      if (fonde.year.id === this.currentYear.id) {
        this.fondatorId = fonde.employee.id;
        this.fondatorTitre = fonde.titre;
      }
    }
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.isRunning = true;

    this.establishmentTypeService.getOne(this.typeId).subscribe(
      (response) => {
        this.isRunning = false;

        // set type
        this.model.type = response;


        if (this.isSetting) {
          //set director
          this.submitDirector().subscribe({
            next: (resp) => {
              // set fondator
              this.submitFondator().subscribe({
                next: (resp) => {
                  this.emit();
                }
              });
            }
          });
        } else {
          this.emit();
          this.form.close();
        }
      },
      (error: HttpErrorResponse) => {
        console.log('Error: ' + error.status);
        this.form.close();
      }
    );
  }

  submitDirector(): Observable<Responsable> {
    return new Observable((observer) => {
      let exists = false;
      for (const dir of this.modelSettingBean.directors) {
        if (dir.year.id === this.currentYear.id) {
          exists = true;
          dir.titre = this.directorTitre;
          dir.year = this.currentYear;

          this.isRunning = true;
          this.employeeService.getOne(this.directorId).subscribe((resp) => {
            this.isRunning = false;
            dir.employee = resp;

            observer.next(dir);
          });
        }
      }

      if (!exists) {
        this.employeeService.getOne(this.directorId).subscribe((resp) => {
          const dir = new Responsable();
          dir.titre = this.directorTitre;
          dir.year = this.currentYear;
          dir.employee = resp;
          this.modelSettingBean.directors.push(dir);

          observer.next(dir);
        });
      }
    });
  }

  submitFondator(): Observable<Responsable> {
    return new Observable((observer) => {
      let exists = false;
      for (const fonde of this.modelSettingBean.fondators) {
        if (fonde.year.id === this.currentYear.id) {
          exists = true;
          fonde.titre = this.fondatorTitre;
          fonde.year = this.currentYear;

          this.isRunning = true;
          this.employeeService.getOne(this.fondatorId).subscribe((resp) => {
            this.isRunning = false;
            fonde.employee = resp;

            observer.next(fonde);
          });
        }
      }

      if (!exists) {
        this.employeeService.getOne(this.fondatorId).subscribe((resp) => {
          const fonde = new Responsable();
          fonde.titre = this.fondatorTitre;
          fonde.year = this.currentYear;
          fonde.employee = resp;
          this.modelSettingBean.fondators.push(fonde);

          observer.next(fonde);
        });
      }
    });
  }

  emit() {
    this.establishmentService.save(this.model).subscribe((resp) => {
      this.model = resp;
      this.establishmentService.saveSettingBean(this.modelSettingBean).subscribe((respSet) => {
        this.establishmentService.saveImageBean(this.modelImageBean).subscribe((respImg) => {
          this.event.emit(resp);
          this.messageService.showSucces(null, true);
        });
      });
    });
  }

  onChooseLogoEntete() {
    const dialogRef2 = this.dialog.open(FileChooserComponent, {
      width: '600px',
      data: { titre: 'Choisir le fichier', obj: this.modelImageBean.logoEntete }
    });

    const validationSub2 = dialogRef2.componentInstance.event.subscribe(
      (file: File) => {
        console.log('logo entete is selected');
        const logo = new LogoEnteteEstablishment();

        let fileReader = new FileReader();

        fileReader.onload = () => {
          // Store base64 encoded representation of file
          logo.nameLogoEntete = file.name;
          logo.sizeLogoEntete = file.size;
          logo.contentTypeLogoEntete = file.type;
          logo.fileAsBase64LogoEntete = fileReader.result.toString();

          this.modelImageBean.logoEntete = logo;
          this.updateLogoEntete();
          console.log("runned: " + fileReader.result.toString());
        }

        fileReader.readAsDataURL(file);
      }
    );
  }

  onChooseLogoFond() {
    const dialogRef2 = this.dialog.open(FileChooserComponent, {
      width: '600px',
      data: { titre: 'Choisir le fichier', obj: this.modelImageBean.logoFond }
    });

    const validationSub2 = dialogRef2.componentInstance.event.subscribe(
      (file: File) => {
        console.log('logo fond is selected');
        const logo = new LogoFondEstablishment();

        let fileReader = new FileReader();

        fileReader.onload = () => {
          // Store base64 encoded representation of file
          logo.nameLogoFond = file.name;
          logo.sizeLogoFond = file.size;
          logo.contentTypeLogoFond = file.type;
          logo.fileAsBase64LogoFond = fileReader.result.toString();

          this.modelImageBean.logoFond = logo;
          this.updateLogoFond();
          //console.log("runned: " + fileReader.result.toString());
        }

        fileReader.readAsDataURL(file);
      }
    );
  }

  onChooseStamp() {
    const dialogRef2 = this.dialog.open(FileChooserComponent, {
      width: '600px',
      data: { titre: 'Choisir le fichier', obj: this.modelImageBean.logoEntete }
    });

    const validationSub2 = dialogRef2.componentInstance.event.subscribe(
      (file: File) => {
        console.log('cachet is selected');
        const logo = new Stamp();

        let fileReader = new FileReader();

        fileReader.onload = () => {
          // Store base64 encoded representation of file
          logo.nameStamp = file.name;
          logo.sizeStamp = file.size;
          logo.contentTypeStamp = file.type;
          logo.fileAsBase64Stamp = fileReader.result.toString();

          this.modelImageBean.stamp = logo;
          this.updateStamp();
          console.log("runned: " + fileReader.result.toString());
        }

        fileReader.readAsDataURL(file);
      }
    );
  }

  updateLogoEntete(): void {
    if (this.modelImageBean.logoEntete !== null) {
      if (this.modelImageBean.logoEntete !== undefined) {
        this.imageURL = this.modelImageBean.logoEntete.fileAsBase64LogoEntete;
        this.logoEnteteSize = Math.round(this.modelImageBean.logoEntete.sizeLogoEntete / 1000);
      }
    }
  }

  updateLogoFond(): void {
    if (this.modelImageBean.logoEntete !== null) {
      if (this.modelImageBean.logoFond !== undefined) {
        this.imageFondURL = this.modelImageBean.logoFond.fileAsBase64LogoFond;
        this.logoFondSize = Math.round(this.modelImageBean.logoFond.sizeLogoFond / 1000);
      }
    }
  }

  updateStamp(): void {
    if (this.modelImageBean.stamp !== null) {
      if (this.modelImageBean.stamp !== undefined) {
        this.stampURL = this.modelImageBean.stamp.fileAsBase64Stamp;
        this.stampSize = Math.round(this.modelImageBean.stamp.sizeStamp / 1000);
      }
    }
  }
}
