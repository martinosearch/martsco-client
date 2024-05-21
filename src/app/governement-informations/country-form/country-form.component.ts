import { EventEmitter, Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Armoirie } from 'src/app/establishment/models/armoirie';
import { CountryIdentityBean } from 'src/app/governement-informations/models/country-identity-bean';
import { Flag } from 'src/app/establishment/models/flag';
import { CountryService } from 'src/app/governement-informations/services/country.service';
import { FileChooserComponent } from '../../utilities/file-chooser/file-chooser.component';
import { CountryImageBean } from '../models/country-image-bean';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {
  model = new CountryIdentityBean();
  modelImage = new CountryImageBean();

  public event: EventEmitter<any> = new EventEmitter();
  public flagURL: string;
  public armoirieURL: string;
  viewHeight = 250;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<CountryFormComponent>, public dialog: MatDialog,
    public countryService: CountryService
  ) { }

  ngOnInit() {
    this.viewHeight = window.innerHeight * 0.3;
    this.model = this.data.obj;

    this.countryService.getImageBean(this.model.id).subscribe((resp) => {
      this.modelImage = resp;

      this.updateFlag();
      this.updateArmoirie();
    });
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.countryService.save(this.model).subscribe((respId) => {
      this.countryService.saveImageBean(this.modelImage).subscribe((respImg) => {
        this.event.emit(this.model);
        this.form.close();
      });
    });
  }

  onChooseFlag() {
    const dialogRef2 = this.dialog.open(FileChooserComponent, {
      width: '600px',
      data: { titre: 'Choisir le fichier', obj: this.modelImage.flag }
    });

    const validationSub2 = dialogRef2.componentInstance.event.subscribe(
      (file: File) => {
        console.log('logo entete is selected');
        const logo = new Flag();

        let fileReader = new FileReader();

        fileReader.onload = () => {
          // Store base64 encoded representation of file
          logo.nameFlag = file.name;
          logo.sizeFlag = file.size;
          logo.contentTypeFlag = file.type;
          logo.fileAsBase64Flag = fileReader.result.toString();

          this.modelImage.flag = logo;
          this.updateFlag();
          console.log("runned: " + fileReader.result.toString());
        }

        fileReader.readAsDataURL(file);
      }
    );
  }

  onChooseArmoirie() {
    const dialogRef2 = this.dialog.open(FileChooserComponent, {
      width: '600px',
      data: { titre: 'Choisir le fichier', obj: this.modelImage.armoirie }
    });

    const validationSub2 = dialogRef2.componentInstance.event.subscribe(
      (file: File) => {
        console.log('logo entete is selected');
        const logo = new Armoirie();

        let fileReader = new FileReader();

        fileReader.onload = () => {
          // Store base64 encoded representation of file
          logo.nameArmoirie = file.name;
          logo.sizeArmoirie = file.size;
          logo.contentTypeArmoirie = file.type;
          logo.fileAsBase64Armoirie = fileReader.result.toString();

          this.modelImage.armoirie = logo;
          this.updateArmoirie();
          console.log("runned: " + fileReader.result.toString());
        }

        fileReader.readAsDataURL(file);
      }
    );
  }

  updateFlag(): void {
    if (this.modelImage.flag !== null) {
      if (this.modelImage.flag !== undefined) {
        this.flagURL = this.modelImage.flag.fileAsBase64Flag;
      }
    }
  }

  updateArmoirie(): void {
    if (this.modelImage.armoirie !== null) {
      if (this.modelImage.armoirie !== undefined) {
        this.armoirieURL = this.modelImage.armoirie.fileAsBase64Armoirie;
      }
    }
  }
}
