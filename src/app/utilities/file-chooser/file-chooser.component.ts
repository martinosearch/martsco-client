import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeIdentityService } from 'src/app/employees-mg/services/employee-identity.service';
import { FileService } from '../services/file.service';


@Component({
  selector: 'app-file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.scss']
})
export class FileChooserComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public file: File;
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<FileChooserComponent>, private formBuilder: FormBuilder,
    public employeeService: EmployeeIdentityService, public httpClient: HttpClient, private fileService: FileService) { }

  ngOnInit(): void {

  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
    console.log("I was called");
  }

  onSubmit() {
    this.event.emit(this.file);
    this.form.close();
  }
}
