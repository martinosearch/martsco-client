import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { FileChooserComponent } from './file-chooser/file-chooser.component';
import { MenuComponent } from './menu/menu.component';
import { OldVersionComponent } from './old-version/old-version.component';
import { ParamSoftComponent } from './param-soft/param-soft.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PrincipalMenuComponent } from './principal-menu/principal-menu.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProgressComponent } from './progress/progress.component';
import { ShowMessageComponent } from './show-message/show-message.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { RejectedMessageComponent } from './rejected-message/rejected-message.component';
import { appInitializerProvider } from './services/app-configs.service';
import { cacheInterceptorProviders } from './services/cache-interceptor.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { JournalShowComponent } from './journal-show/journal-show.component';
import { ForfaitStateComponent } from './forfait-state/forfait-state.component';
import { UserParametersComponent } from './user-parameters/user-parameters.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { authInterceptorProviders } from './services/auth-interceptor.service';
import { AgePipe } from './pipes/age-pipe';
import { CivilityPipe } from './pipes/civility-pipe';
import { CurrentClass } from './pipes/cursus-pipe';
import { DevisePipe, AssurancePipe } from './pipes/devise-pipe';
import { SafeHtml } from './pipes/security';
import { SexPipe, CountMalePipe, CountFemalePipe } from './pipes/sexe-pipe';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    ConfirmDeleteComponent, PdfViewerComponent, FileChooserComponent,
    ParamSoftComponent, MenuComponent, PrincipalMenuComponent,
    OldVersionComponent, UserDashboardComponent, ShowMessageComponent,
    SuccessMessageComponent, RejectedMessageComponent, ProgressComponent,
    UserListComponent, UserFormComponent, JournalShowComponent, ForfaitStateComponent,
    UserParametersComponent, LoginFormComponent, DevisePipe, SexPipe,
    CountMalePipe, CountFemalePipe, AgePipe, SafeHtml, AssurancePipe,
    CivilityPipe, CurrentClass
  ],
  imports: [
    BrowserModule, CommonModule, NoopAnimationsModule,
    FlexLayoutModule, FormsModule, ReactiveFormsModule, PdfJsViewerModule,
    ChartModule, MaterialModule
  ],
  exports: [
    PrincipalMenuComponent, MenuComponent, ProgressComponent, DevisePipe,
    SexPipe, CountMalePipe, CountFemalePipe, AgePipe, SafeHtml,
    AssurancePipe, CivilityPipe, CurrentClass, MaterialModule
  ],
  entryComponents: [ConfirmDeleteComponent, ShowMessageComponent, SuccessMessageComponent, RejectedMessageComponent],
  providers: [appInitializerProvider, cacheInterceptorProviders, authInterceptorProviders]
})
export class UtilitiesModule { }
