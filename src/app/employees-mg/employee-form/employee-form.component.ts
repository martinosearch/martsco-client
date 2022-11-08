import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CivilityService } from 'src/app/establishment/services/civility.service';
import { EmployeeIdentityBean } from 'src/app/employees-mg/models/employee-identity-bean';
import { Signature } from 'src/app/establishment/models/signature';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { FileChooserComponent } from 'src/app/utilities/file-chooser/file-chooser.component';
import { EmployeeIdentityService } from '../services/employee-identity.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  model = new EmployeeIdentityBean();
  types = [];
  public event: EventEmitter<any> = new EventEmitter();
  public signatureURL: string;
  viewHeight = 250;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<EmployeeFormComponent>, public dialog: MatDialog,
    public dataService: EmployeeIdentityService, public civilityService: CivilityService, public constanceService: ConstanceService
  ) { }

  ngOnInit() {
    this.viewHeight = window.innerHeight * 0.6;

    this.model = this.data.obj;
    this.model.identity.birthday = this.model.identity.birthday !== null ? new Date(this.model.identity.birthday) : null;
    this.model.inscriptionInfo.entryDate = this.model.inscriptionInfo.entryDate !== null ? new Date(this.model.inscriptionInfo.entryDate) : null;
    this.model.inscriptionInfo.leavingDate = this.model.inscriptionInfo.leavingDate !== null ? new Date(this.model.inscriptionInfo.leavingDate) : null;

    this.updateSignature();
  }


  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.event.emit(this.model);
    this.form.close();
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  calculateBirthYear() {
    this.model.identity.birthday = new Date(Date.now() - (this.model.identity.age * 24 * 3600 * 365.25 * 1000));
    console.log('date on initialisation: ' + this.model.identity.birthday);
  }

  calculateAge() {
    this.model.identity.age = Math.floor(Math.abs((Date.now() - this.model.identity.birthday.getTime())
      / (24 * 3600 * 365.25 * 1000)));
  }

  onChooseSignature() {
    const dialogRef2 = this.dialog.open(FileChooserComponent, {
      width: '600px',
      data: { titre: 'Choisir le fichier', obj: this.model.signature }
    });

    const validationSub2 = dialogRef2.componentInstance.event.subscribe(
      (file: File) => {
        console.log('cachet is selected');
        const logo = new Signature();

        let fileReader = new FileReader();

        fileReader.onload = () => {
          // Store base64 encoded representation of file
          logo.nameSignature = file.name;
          logo.sizeSignature = file.size;
          logo.contentTypeSignature = file.type;
          logo.fileAsBase64Signature = fileReader.result.toString();

          this.model.signature = logo;
          this.updateSignature();
          console.log("runned: " + fileReader.result.toString());
        }

        fileReader.readAsDataURL(file);
      }
    );
  }

  updateSignature(): void {
    if (this.model.signature !== null) {
      if (this.model.signature !== undefined) {
        this.signatureURL = this.model.signature.fileAsBase64Signature;
      }
    }
  }
}
