import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { MySubject } from 'src/app/subject-mg/models/subject';
import { Subject } from 'rxjs';
import { SubjectAttribution } from 'src/app/subject-mg/models/subject-attribution';
import { Year } from 'src/app/establishment/models/year';
import { EmployeeIdentityBean } from '../../employees-mg/models/employee-identity-bean';
import { SchoolClassIdentityBean } from '../../establishment/models/school-class-identity-bean';
import { EmployeeIdentityService } from '../../employees-mg/services/employee-identity.service';
import { SchoolClassIdentityService } from '../../establishment/services/school-class-identity.service';
import { SubjectService } from '../../subject-mg/subject.service';
import { YearService } from '../../establishment/services/year.service';
import { ConstanceService } from '../../utilities/services/constance.service';
import { ReductionStudentFormComponent } from '../../compta/reduction-student-form/reduction-student-form.component';
import { ClassChooserModel } from 'src/app/establishment/models/class-chooser-model';
import { SchoolClassSubjectBean } from 'src/app/establishment/models/school-class-subject-bean';
import { SchoolClassSettingService } from 'src/app/establishment/services/school-class-setting.service';
import { MessageService } from 'src/app/utilities/services/message.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { StudentListModel } from 'src/app/student-mg/models/student-list-model';

@Component({
  selector: 'app-subject-attribution',
  templateUrl: './subject-attribution.component.html',
  styleUrls: ['./subject-attribution.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class SubjectAttributionComponent implements OnInit, OnDestroy {

  displayedColumns = [
    'num',
    'designation',
    'type'
  ];

  displayedColumnsSelected = [
    'num', 'designation', 'charge', 'select'
  ];

  // for checkbox in the table
  selection = new SelectionModel<SubjectAttribution>(true, []);

  expandedElement: MySubject | null;
  currentSchoolClass: SchoolClassIdentityBean;
  currentSchoolClassSubjectBean: SchoolClassSubjectBean;

  filteredList: MySubject[] = [];
  filteredListAdd = new Subject<MySubject[]>();

  currentYear: Year;
  notSelected: MySubject[] = [];
  defaultSubjects: MySubject[] = [];

  employees: EmployeeIdentityBean[] = [];
  classes: SchoolClassIdentityBean[] = [];

  chargeIds: number[] = [];
  selectedAdd: SubjectAttribution[] = [];

  currentDefaultSubject: MySubject;
  currentSelectedSubject: SubjectAttribution;

  isRunning = false;
  showActions = false;
  filterControl = new FormControl();
  event: EventEmitter<any> = new EventEmitter();
  currentAmount: number;


  numberOfResult = 0;
  currentFilterValue: string;
  numSubject = 0;
  numSubjectSelected = 0;
  count: number;
  enableAction = true;

  constructor(
    public auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: ClassChooserModel, private messageService: MessageService,
    public dialog: MatDialog, public form: MatDialogRef<SubjectAttributionComponent>,
    private subjectService: SubjectService, private schoolClassSettingService: SchoolClassSettingService,
    public schoolClassService: SchoolClassIdentityService,
    public constanceService: ConstanceService, public employeeService: EmployeeIdentityService,
    public yearService: YearService,
  ) { }

  ngOnInit() {
    this.isRunning = true;
    this.currentYear = this.data.year;
    this.currentSchoolClass = this.data.schoolClass;

    // for autocomplete
    this.filterControl.valueChanges.pipe(
      startWith(''), map(value => {
        this.currentFilterValue = value;
        return this.filter(value);
      })
    ).subscribe((resp) => {
      this.numSubject = resp.length;
      this.filteredListAdd.next(resp.slice());
    });

    this.filteredListAdd.subscribe((resp) => {
      console.log('susbcription filter ok !!!');
      this.filteredList = resp;
      this.numSubject = resp.length;
      this.refreshAttribs();
    });


    this.employeeService.getAll().subscribe((respEmpl) => {
      this.employees = respEmpl;
      this.schoolClassService.getAll().subscribe((respSch) => {
        this.classes = respSch;
        this.schoolClassSettingService.findSubjectBean(this.currentSchoolClass.id).subscribe((resp) => {
          this.currentSchoolClassSubjectBean = resp;
          this.refresh();
        });
      });
    });
  }

  refreshAttribs() {
    // attribution of class
    this.chargeIds = [];
    for (const item of this.selectedAdd) {
      let exists = false;

      for (const subj of this.currentSchoolClassSubjectBean.subjectAttributions) {
        if (item.subject.id === subj.subject.id && subj.year.id === this.currentYear.id) {
          exists = true;
          if (subj.employee !== null && subj.employee !== undefined) {
            this.chargeIds.push(subj.employee.id);
          } else {
            this.chargeIds.push(undefined);
          }
        }

        // this help to check optional subjectAttribs
        if (subj.isOptional) {
          this.selection.selected.push(subj);
        }
      }

      // set master checks
      //this.masterToggle();

      if (!exists) {
        this.chargeIds.push(undefined);
      }
    }
  }

  ngOnDestroy(): void { }

  refresh() {
    //for progress
    this.isRunning = true;

    this.selectedAdd = this.currentSchoolClassSubjectBean.subjectAttributions.filter(subj => (subj.year.id === this.currentYear.id));
    this.selectedAdd.slice();

    //count
    this.numSubjectSelected = this.selectedAdd.length;

    this.notSelected = [];
    this.subjectService.getAll().subscribe(
      (resp) => {
        this.defaultSubjects = resp;
        //we move subject that are alreday selected
        for (const subj of resp) {
          let exists = false;
          for (const attrib of this.selectedAdd) {
            if (attrib.subject.id === subj.id) {
              exists = true;
            }
          }

          // we add it if not found
          if (exists === false) {
            this.notSelected.push(subj);
          }
        }

        this.filteredListAdd.next(this.notSelected.slice());
        //for progress
        this.isRunning = false;
      },

      () => {
        console.log('finished lodding!!!!!!!');
        //for progress
        this.isRunning = false;
      }
    );
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  // filter for test autocomplete
  private filter(value: string): MySubject[] {
    if (typeof value === 'string') {
      if (value === '') {
        return this.notSelected;
      } else {
        const filterValue = value.toLowerCase();
        return this.notSelected.filter(option =>
          (option.designation).toLowerCase().includes(filterValue)
        );
      }
    } else {
      return this.notSelected;
    }
  }

  onSubmit() {
    this.isRunning = true;
    console.log('before submit Attribution::::::: ' + JSON.stringify(this.chargeIds));
    this.count = 0;

    const otherSubjAttribs = this.currentSchoolClassSubjectBean.subjectAttributions.filter(subj => (subj.year.id !== this.currentYear.id));

    for (const attrib of this.selectedAdd) {
      // set Optionnal
      attrib.isOptional = this.selection.isSelected(attrib);

      otherSubjAttribs.push(attrib);
    }

    this.currentSchoolClassSubjectBean.subjectAttributions = otherSubjAttribs;

    this.schoolClassSettingService.saveSubjectBean(this.currentSchoolClassSubjectBean).subscribe((resp) => {
      this.isRunning = false;
      this.currentSchoolClassSubjectBean = resp;
      this.refresh();
      this.messageService.showSucces("Succès !", true);
    });
  }

  onExit() {
    this.form.close();
  }

  setCharger(index: number) {
    this.enableAction = false;
    this.employeeService.getOne(this.chargeIds[index]).subscribe((resp) => {
      this.selectedAdd[index].employee = resp;
      this.enableAction = true;
    });
  }

  // movement
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
    for (const item of this.filteredList) {
      if (item.id !== this.currentDefaultSubject.id) {
        temp.push(item);
      } else {
        const attrib = new SubjectAttribution();

        attrib.year = this.currentYear;
        attrib.subject = item;

        this.selectedAdd.push(attrib);
        this.selectedAdd = this.selectedAdd.slice();
      }
    }

    this.filteredList = temp;
    this.filteredListAdd.next(this.filteredList.slice());
    this.currentDefaultSubject = undefined;
  }

  moveAllDefault() {
    for (const item of this.filteredList) {
      this.moveDefault(item);
    };
  }

  moveSelected(selected?: SubjectAttribution) {
    if (selected !== undefined) {
      this.currentSelectedSubject = selected;
    }

    const temp: SubjectAttribution[] = [];

    // we put default either selected to have typeSubject
    for (const item of this.selectedAdd) {
      if (item.subject.id !== this.currentSelectedSubject.subject.id) {
        temp.push(item);
      } else {
        this.filteredList.push(item.subject);
      }
    }

    this.selectedAdd = temp;
    this.selectedAdd.slice();
    this.filteredListAdd.next(this.filteredList.slice());
    this.currentSelectedSubject = undefined;
    //on rafraichi les attribution
  }

  moveAllSelected() {
    for (const item of this.selectedAdd) {
      this.moveSelected(item);
    }
  }

  // for selecte ***************************************************
  // ***************************************************************
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.selectedAdd.length;
    return numSelected === numRows;

    //return this.allSelected;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();

      // // set all not optional
      // for (const subj of this.selectedAdd) {
      //   subj.isOptional = false;
      // }

      // return;
    } else {
      this.selection.select(...this.selectedAdd);

      // // set all optional
      // for (const subj of this.selectedAdd) {
      //   subj.isOptional = true;
      // }
    }
  }

  /** The label for the checkbox on the passed row */
  masterCheckboxLabel(): string {
    const option = this.isAllSelected() ? "select" : "deselect";
    return option + " all";
  }

  /** The label for the checkbox  */
  checkboxLabel(row: SubjectAttribution, index: number): string {
    const option = this.selection.isSelected(row) ? "deselect" : "select";
    return option + " row " + (index + 1);
  }
}
