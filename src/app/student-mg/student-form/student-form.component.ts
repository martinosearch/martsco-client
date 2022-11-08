import { Component, EventEmitter, Inject, OnInit, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Passport } from 'src/app/id-card-mg/models/passport';
import { StudentIdentityBean } from 'src/app/student-mg/models/studentIdentityBean';
import { StudentCursus } from 'src/app/student-mg/models/student-cursus';
import { Year } from 'src/app/establishment/models/year';
import { SchoolClassIdentityBean } from '../../establishment/models/school-class-identity-bean';
import { CivilityService } from '../../establishment/services/civility.service';
import { SchoolClassIdentityService } from '../../establishment/services/school-class-identity.service';
import { YearService } from '../../establishment/services/year.service';
import { ConstanceService } from '../../utilities/services/constance.service';
import { FileChooserComponent } from '../../utilities/file-chooser/file-chooser.component';
import { StudentCursusBean } from '../models/studentCursusBean';
import { StudentPassportBean } from 'src/app/id-card-mg/models/studentPassportBean';
import { StudentCursusService } from '../services/student-cursus.service';
import { StudentIdentityService } from '../services/student-identity.service';
import { StudentPassportService } from '../services/student-passport.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  stendentCursusBean = new StudentCursusBean();
  studentIdentityBean = new StudentIdentityBean();
  studentPassportBean = new StudentPassportBean;

  years: Year[] = [];
  classes: SchoolClassIdentityBean[] = [];
  currentSchoolClassId: number;
  currentYearId: number;
  isRedoublant = false;
  schooling = 0;
  public event: EventEmitter<any> = new EventEmitter();
  viewHeight = 250;
  public passportURL: string;
  currentYear: Year;
  currentPassport: Passport;
  currentPassportSize = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<StudentFormComponent>, public dialog: MatDialog,
    public civilityService: CivilityService, public constanceService: ConstanceService,
    public yearService: YearService, public schoolClassService: SchoolClassIdentityService,
    public studentCursusService: StudentCursusService,
    private studentIdentityService: StudentIdentityService,
    private studentPassportService: StudentPassportService
  ) { }

  ngOnInit() {
    this.viewHeight = window.innerHeight * 0.45;
    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYearId = resp.id;
      this.currentYear = resp;

      this.yearService.getAll().subscribe((resp) => {
        this.years = resp;
      });
      this.schoolClassService.getAll().subscribe((resp) => {
        this.classes = resp;
      });

      const currentStudent = this.data.obj;

      if (currentStudent != undefined) {
        this.updateStudentIdentities(currentStudent);

        this.studentCursusService.getCurrentCursus(currentStudent.id, this.currentYearId).subscribe(resp => {
          this.updateCursus(resp);

          this.studentPassportService.getCurrentPassport(currentStudent.id, this.currentYearId).subscribe((resp) => {
            this.updatePassport(resp);
          });
        });
      }
    });
  }

  updateStudentIdentities(resp: StudentIdentityBean) {
    if (resp != null) {
      this.studentIdentityBean = resp;
    }
  }

  updateCursus(currentCursus: StudentCursus) {
    if (currentCursus != null) {
      if (currentCursus.schooling > 0) {
        this.isRedoublant = true;
      } else {
        this.isRedoublant = false;
      }

      this.schooling = currentCursus.schooling;

      if (this.data.currentSchoolClassId != null) {
        this.currentSchoolClassId = this.data.currentSchoolClassId;
      } else if (currentCursus.schoolClass !== undefined) {
        this.currentSchoolClassId = currentCursus.schoolClass.id
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewHeight = window.innerHeight * 0.45;
    console.log("windows resizing::::" + event);
  }

  onNoClick(): void {
    this.form.close();
  }

  onYearChange(): void {
    this.currentYear = this.years.filter((item) => item.id === this.currentYearId)[0];
  }

  onSubmit(): void {
    // save identity
    console.log("current school class id: " + this.currentSchoolClassId);
    this.schoolClassService.getOne(this.currentSchoolClassId).subscribe((sch) => {

      this.studentIdentityService.save(this.studentIdentityBean, sch).subscribe((student) => {

        //save cursus
        this.studentCursusService.save(student, sch, this.currentYear,
          this.schooling).subscribe((curs) => {

            //save passport
            this.studentPassportService.save(student, this.currentYear, this.currentPassport)
              .subscribe(
                (respCurs) => {
                  console.log("student passport saved!!");

                  this.event.emit();
                  this.form.close();
                },
                (error) => {
                  this.event.emit();
                  this.form.close();
                });
          });
      });
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onIsRedoublant() {
    if (this.isRedoublant) {
      this.schooling = 1;
    } else {
      this.schooling = 0;
    }
  }

  calculateBirthYear() {
    this.studentIdentityBean.identity.birthday = new Date(Date.now() - (this.studentIdentityBean.identity.age * 24
      * 3600 * 365.25 * 1000));
    console.log('date on initialisation: ' + this.studentIdentityBean.identity.birthday);
  }

  calculateAge() {
    this.studentIdentityBean.identity.age = Math.floor(Math.abs((Date.now() - this.studentIdentityBean.identity.birthday.getTime())
      / (24 * 3600 * 365.25 * 1000)));
  }

  onChoosePassport() {
    const dialogRef2 = this.dialog.open(FileChooserComponent, {
      width: '600px',
      data: { titre: 'Choisir la photo' }
    });

    const validationSub2 = dialogRef2.componentInstance.event.subscribe(
      (file: File) => {
        console.log('logo entete is selected');
        const passport = new Passport();

        let fileReader = new FileReader();

        fileReader.onload = () => {
          // Store base64 encoded representation of file
          passport.namePassport = file.name;
          passport.sizePassport = file.size;
          passport.contentTypePassport = file.type;
          passport.fileAsBase64Passport = fileReader.result.toString();
          passport.year = this.currentYear;

          this.updatePassport(passport);
        }

        fileReader.readAsDataURL(file);
      }
    );
  }

  updatePassport(passport: Passport): void {
    if (passport != null) {
      this.currentPassport = passport;
      this.passportURL = passport.fileAsBase64Passport;
      this.currentPassportSize = Math.round(this.currentPassport.sizePassport / 1000);
    }
  }
}
