import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Payment } from 'src/app/compta/models/payment';
import { StudentPayementStatement } from 'src/app/compta/models/student-payement-statement';
import { SchoolClassIdentityBean } from 'src/app/establishment/models/school-class-identity-bean';
import { StudentIdentityBean } from 'src/app/student-mg/models/studentIdentityBean';
import { ComptaReportingService } from '../services/compta-reporting.service';
import { EmployeeIdentityService } from '../../employees-mg/services/employee-identity.service';
import { ConstanceService } from '../../utilities/services/constance.service';
import { StudentFormComponent } from '../../student-mg/student-form/student-form.component';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { Year } from 'src/app/establishment/models/year';
import { StudentComptaBean } from '../models/student-compta-Bean';
import { StudentCursusService } from 'src/app/student-mg/services/student-cursus.service';
import { StudentComptaService } from '../services/student-compta.service';
import { StudentCursusBean } from 'src/app/student-mg/models/studentCursusBean';
import { StudentIdentityService } from 'src/app/student-mg/services/student-identity.service';
import { EmployeeIdentityBean } from 'src/app/employees-mg/models/employee-identity-bean';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-cash-register-form',
  templateUrl: './cash-register-form.component.html',
  styleUrls: ['./cash-register-form.component.scss']
})
export class CashRegisterFormComponent implements OnInit, OnDestroy {
  displayedColumns = ['num', 'designation', 'montant', 'suppr'];

  // for autocomplete
  public studentControl = new FormControl();
  public studentCursusesList: StudentCursusBean[] = [];

  public studentIdentitiesList: StudentIdentityBean[] = [];
  public studentFilteredList: StudentIdentityBean[] = [];

  public paymentSituations: StudentPayementStatement[] = [];
  public reminder_payments = [];
  public payments: Payment[] = [];
  public paymentSelectedObjsSubj = new Subject<Payment[]>();

  public currentComptaStudent = new StudentComptaBean();
  public currentCursusStudent = new StudentCursusBean();
  public currentIdentityStudent = new StudentIdentityBean();

  public montant = 0;
  public serial = 0;
  public isRunning = false;
  public isLoading = true;
  public canSubmit = false;

  public canBePrint = false;
  public currentSchoolClass: SchoolClassIdentityBean;
  public currentYear: Year;

  public filterText: any;
  currentUserId: number;
  currentEmployee: EmployeeIdentityBean;

  constructor(
    public dialog: MatDialog,
    public studentCursusService: StudentCursusService, private studentComptaService: StudentComptaService,
    private studentIdentityService: StudentIdentityService,
    public authService: AuthService,
    public employeeIdentityService: EmployeeIdentityService,
    public snackBar: MatSnackBar,
    public constanceService: ConstanceService, public comptaReportingService: ComptaReportingService
  ) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
      this.isLoading = true;

      this.authService.currentUserSubj.subscribe((resp) => {
        this.currentUserId = resp;
        this.employeeIdentityService.getOne(this.currentUserId).subscribe(resp => {
          this.currentEmployee = resp;
          this.refreshStudentList();
        });
      });
    });

    this.paymentSelectedObjsSubj.subscribe((resp) => {
      this.payments = resp;
    })

    this.constanceService.setCurrentSection("Caisse");
  }

  refreshStudentList() {
    // getting list of student
    this.studentCursusService.getAllByYear(this.currentYear.id).subscribe(
      (response) => {
        this.studentCursusesList = response;

        this.studentIdentityService.getStudentIdentities(response).subscribe(
          (respId) => {
            this.studentIdentitiesList = respId;
            this.studentFilteredList = respId;
            //  console.log('student list size: ' + JSON.stringify(this.studentIdentitiesList));
            // console.log('student list size: ' + this.studentIdentitiesList.length);
            this.isLoading = false;
          }
        );
      }
    );

    this.refreshPayment([]);
    this.canSubmit = false;
  }

  // reset student beans
  refreshStudentIdentity(student: StudentIdentityBean) {

    this.currentIdentityStudent = student;

    //student cursus informations
    this.studentCursusService.getCurrentCursus(student.id, this.currentYear.id).subscribe(rsp => {
      this.currentSchoolClass = rsp.schoolClass;
    });
  }


  refreshStudentCompta(student: StudentComptaBean) {
    if (student.id !== undefined) {

      this.currentComptaStudent = student;

      this.reminder_payments = student.payments.filter((pymt) => (pymt.year.id === this.currentYear.id))
        .sort((a, b) => {
          return new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1;
        });

      //payment situation
      this.studentComptaService.getPaymentSituations(student.id, this.currentYear.id).subscribe(
        (resp) => {
          this.paymentSituations = resp;
        }
      );
    } else {
      console.log("none student logged!");
      this.paymentSituations = [];
    }
  }

  refreshPayment(payments: Payment[]) {
    this.paymentSelectedObjsSubj.next(payments.slice());
  }

  onFilterStudent() {
    console.log("filter text: " + this.filterText);

    if (typeof this.filterText === 'string') {
      const filterValue = this.filterText.toLowerCase();

      this.studentFilteredList = this.studentIdentitiesList.filter(option =>
        (option.identity.lastName + ' ' + option.identity.firstName).toLowerCase().includes(filterValue)
      );
    } else {
      this.refreshStudentIdentity(this.filterText);
      this.studentComptaService.getOne(this.filterText.id).subscribe((respCompta) => {
        this.refreshStudentCompta(respCompta);
      });
    }
  }

  ngOnDestroy(): void { }

  onDelete(obj: Payment) {
    if (this.payments.length > 0) {
      this.payments.splice(this.payments.indexOf(obj), 1);
      this.refreshPayment(this.payments);
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // this display filtered objet in the autocomplete component
  displayStudent(obj: StudentIdentityBean): string {
    if (obj !== null && obj !== undefined) {
      if (obj.identity !== undefined) {
        if (obj.identity.lastName !== undefined) {
          let name = obj.identity.lastName;
          if (obj.identity.lastName !== undefined) {
            name += ' ' + obj.identity.firstName;
          }

          return name;
        }
      }
    }
    return undefined;
  }

  onStudentSubmit() {
    if (this.currentComptaStudent.id === undefined) {
      const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        width: '600px',
        data: { titre: 'Cet élève n\'existe pas. Voulez- vous l\'ajouter?' }
      });

      dialogRef.componentInstance.event.subscribe(resp => {
        const dialogPatientRef = this.dialog.open(StudentFormComponent, {
          width: '1000px',
          data: { titre: 'Ajouter un élève', obj: new StudentIdentityBean() }
        });

        dialogPatientRef.componentInstance.event.subscribe(
          newStudent => {
            this.refreshStudentIdentity(newStudent);
          }
        );
      });
    }
  }

  onModifierInfo() {
    const data = Object.assign({}, this.currentComptaStudent);
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '1000px',
      data: { titre: 'Modifier', obj: data }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.studentComptaService.save(response).subscribe(response2 => {
          //this.refreshStudent(response2);
        });
      }
    );
  }

  onAddPayment(): void {
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un Frais', obj: new Payment(), schoolClass: this.currentSchoolClass }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.payments.push(response);
        this.isDataCorrect();
        this.refreshPayment(this.payments);
        validationSub.unsubscribe();
      }
    );
  }

  onSubmitPayment() {
    if (this.authService.isAuthenticated) {
      if (this.isDataCorrect()) {
        this.isRunning = true;
        this.canSubmit = false;

        this.comptaReportingService.getNewReceiptSerial(this.currentComptaStudent.id, this.currentYear.id).subscribe(resp => {
          this.serial = resp;

          for (const elmt of this.payments) {
            elmt.date = new Date();
            elmt.year = this.currentYear;
            elmt.serial = this.serial;
            elmt.cashRegister = this.currentEmployee;
            elmt.isValid = true;
            this.currentComptaStudent.payments.push(elmt);
          }

          this.studentComptaService.save(this.currentComptaStudent).subscribe(
            (response) => {
              // to reflesh lists
              this.askForPrinting(response);
              this.refreshStudentCompta(response);
              this.refreshPayment([]);
              this.isRunning = false;
            },
            (error) => {
              this.isRunning = false;
              this.snackBar.open('Une erreur s\'est produite!!!', null, {
                duration: 3000,
              });
            });
        });
      } else {
        this.snackBar.open('Vueillez remplir correctement les champs obligatoires.', null, {
          duration: 3000,
        });
      }
    } else {
      this.snackBar.open('Vueillez vous connecter avant tous.', null, {
        duration: 3000,
      });
    }
  }

  onCancel(payment: Payment) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: {
        titre: 'Voulez- vous vraiment annuler le payement de: ' + payment.currentAmount
          + ' pour l\'élève :' + this.currentIdentityStudent.identity.lastName + ' '
          + this.currentIdentityStudent.identity.firstName
      }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.isRunning = true;
      for (const p of this.currentComptaStudent.payments) {
        if (p.expense.id === payment.expense.id && p.currentAmount === payment.currentAmount
          && p.serial === payment.serial && p.date === payment.date) {
          p.isValid = false;
        }
      }

      this.studentComptaService.save(this.currentComptaStudent).subscribe((resp) => {
        // to reflesh lists
        this.refreshPayment([]);
        this.refreshStudentCompta(resp);
        this.isRunning = false;
      })
    });
  }

  askForPrinting(response: any) {
    this.canBePrint = true;
  }

  isDataCorrect(): boolean {
    if (this.payments.length > 0) {
      this.canSubmit = true;
      return true;
    } else {
      this.canSubmit = false;
      return false;
    }
  }

  reset() {
    this.filterText = undefined;
    this.refreshStudentIdentity(new StudentIdentityBean());
    this.refreshStudentCompta(new StudentComptaBean());
    this.refreshPayment([]);
  }

  generatePdfAndShow(student: StudentComptaBean, serial: number) {
    //we call pdf
    this.isRunning = true;
    this.comptaReportingService.generateReceiptOf(student, serial, 0).subscribe(() => {
      this.sleep(2000).then(() => { this.isRunning = false; });
    });
  }

  generatePdfAndPrint(student: StudentComptaBean, serial: number) {
    this.isRunning = true;
    this.comptaReportingService.generateReceiptOf(student, serial, 1).subscribe(() => {
      this.sleep(2000).then(() => { this.isRunning = false; });
    });
  }
}
