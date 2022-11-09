import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HostListener, LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssuranceModule } from './assurance/assurance.module';
import { BiblioModule } from './biblio/biblio.module';
import { CantineModule } from './cantine/cantine.module';
import { ComptaRoutingModule } from './compta/compta-routing.module';
import { ComptaModule } from './compta/compta.module';
import { EmployeesMgModule } from './employees-mg/employees-mg.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { SchoolRoutingModule } from './establishment/school-routing.module';
import { YearFormComponent } from './establishment/year-form/year-form.component';
import { EvaluationTrimModule } from './evaluation-trim/evaluation-trim.module';
import { ExamsModule } from './exams/exams.module';
import { PlanningModule } from './planning/planning.module';
import { StudentFormComponent } from './student-mg/student-form/student-form.component';
import { StudentMgRoutingModule } from './student-mg/student-mg-routing.module';
import { StudentMgModule } from './student-mg/student-mg.module';
import { FileChooserComponent } from './utilities/file-chooser/file-chooser.component';
import { LoginFormComponent } from './utilities/login-form/login-form.component';
import { cacheInterceptorProviders } from './utilities/services/cache-interceptor.service';
import { UtilitiesModule } from './utilities/utilities.module';

//registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule, AppRoutingModule, ComptaRoutingModule,
    SchoolRoutingModule, StudentMgRoutingModule, HttpClientModule,
    FlexLayoutModule, EstablishmentModule, ComptaModule, EmployeesMgModule,
    EvaluationTrimModule, UtilitiesModule, AssuranceModule, StudentMgModule,
    BiblioModule, PlanningModule, CantineModule, ExamsModule
  ],

  //some addition here for externalization of configs
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    cacheInterceptorProviders
  ],

  bootstrap: [AppComponent],

  entryComponents: [StudentFormComponent, LoginFormComponent, YearFormComponent,
    FileChooserComponent]
})

export class AppModule {
  viewHeight = window.innerHeight - 55;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewHeight = window.innerHeight - 55;
  }
}