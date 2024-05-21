import { Injectable } from '@angular/core';
import { AppConfigsService } from './app-configs.service';


@Injectable({
  providedIn: 'root'
})

export class RouteService {
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  //soft correction
  public softCorrection = this.API_MARTSCO + '/soft/refactor';

  // invoice url
  public invoiceListUrl = this.API_MARTSCO + '/invoice/list';
  public invoiceSaveUrl = this.API_MARTSCO + '/invoice/save';
  public invoiceInfoUrl = this.API_MARTSCO + '/invoice/info/';
  public invoiceDeleteUrl = this.API_MARTSCO + '/invoice/delete/';
  public invoicesComptantUrl = this.API_MARTSCO + '/invoice/list-comptants';
  public invoicesCreditUrl = this.API_MARTSCO + '/invoice/list-credits';

  //progress
  public docGenerationWaitingUrl = this.API_MARTSCO + '/progress/handle';

  // commande url
  public orderListeUrl = this.API_MARTSCO + '/order/list';
  public orderSaveUrl = this.API_MARTSCO + '/order/save';
  public orderInfoUrl = this.API_MARTSCO + '/order/info/';
  public orderDeleteUrl = this.API_MARTSCO + '/order/delete/';

  // setting url
  public settingListeUrl = this.API_MARTSCO + '/setting/list';
  public settingSaveUrl = this.API_MARTSCO + '/setting/save';
  public settingInfoUrl = this.API_MARTSCO + '/setting/info/';
  public settingDeleteUrl = this.API_MARTSCO + '/setting/delete/';

  // establishment type url
  public establishmentTypeListeUrl = this.API_MARTSCO + '/establishment-type/list';
  public establishmentTypeSaveUrl = this.API_MARTSCO + '/establishment-type/save';
  public establishmentTypeInfoUrl = this.API_MARTSCO + '/establishment-type/info/';
  public establishmentTypeDeleteUrl = this.API_MARTSCO + '/establishment-type/delete/';

  // user url
  public userListeUrl = this.API_MARTSCO + '/user/list';
  public userSaveUrl = this.API_MARTSCO + '/user/save';
  public userInfoUrl = this.API_MARTSCO + '/user/info/';
  public userDeleteUrl = this.API_MARTSCO + '/user/delete/';

  // event url
  public eventListeUrl = this.API_MARTSCO + '/event/list';
  public eventSaveUrl = this.API_MARTSCO + '/event/save';
  public eventInfoUrl = this.API_MARTSCO + '/event/info/';
  public eventDeleteUrl = this.API_MARTSCO + '/event/delete/';

  // event url
  public assuranceListUrl = this.API_MARTSCO + '/assurance/list';
  public assuranceSaveUrl = this.API_MARTSCO + '/assurance/save';
  public assuranceInfoUrl = this.API_MARTSCO + '/assurance/info/';
  public assuranceDeleteUrl = this.API_MARTSCO + '/assurance/delete/';

  // further information
  public userTypeUrl = this.API_MARTSCO + '/info/list-user-type/';

  // old version url
  public oldVersionImportAllUrl = this.API_MARTSCO + '/old-version/import-all/';

  // file
  public fileDownloadUrl = this.API_MARTSCO + '/file/download-file/';
  public fileUpload = this.API_MARTSCO + '/file/upload-file';
  public saveFileInDB = this.API_MARTSCO + '/file/save-in-db';

  // commande url
  public subjectTypeListUrl = this.API_MARTSCO + '/subject-type/list';
  public subjectTypeSaveUrl = this.API_MARTSCO + '/subject-type/save';
  public subjectTypeInfoUrl = this.API_MARTSCO + '/subject-type/info/';
  public subjectTypeDeleteUrl = this.API_MARTSCO + '/subject-type/delete/';

  // commande url
  public evaluationTypeListUrl = this.API_MARTSCO + '/evaluation-type/list';
  public evaluationTypeSaveUrl = this.API_MARTSCO + '/evaluation-type/save';
  public evaluationTypeInfoUrl = this.API_MARTSCO + '/evaluation-type/info/';
  public evaluationTypeDeleteUrl = this.API_MARTSCO + '/evaluation-type/delete/';

  // decoupage-type url
  public decoupageTypeListUrl = this.API_MARTSCO + '/decoupage-type/list';
  public decoupageTypeSaveUrl = this.API_MARTSCO + '/decoupage-type/save';
  public decoupageTypeInfoUrl = this.API_MARTSCO + '/decoupage-type/info/';
  public decoupageTypeDeleteUrl = this.API_MARTSCO + '/decoupage-type/delete/';


  // internal routes ****************************************************************
  // accueil


  // SchoolClass
  public schoolClassListRoute = '/school-class/list';
  public schoolClassAfficherRoute = '/school-class/show';

  // students
  public studentListRoute = '/student/list';
  public studentAfficherRoute = '/student/show';
  public studentRepartitionRoute = '/student/repartition';
  public studentRepartitionManuelleRoute = '/student/repartition-manuelle';


  // typeTest
  public academicStandartListRoute = '/academic-standart/list';
  public academicStandartAfficherRoute = '/academic-standart/show';

  // setting
  public settingFormRoute = '/setting/form';

  // employee
  public employeeListRoute = '/employee/list';
  public employeeShowRoute = '/employee/show';
  public employeeFormRoute = '/employee/form';

  // user
  public userListRoute = '/user/list';
  public userShowRoute = '/user/show';
  public userFormRoute = '/user/form';

  // info
  public infoTestRoute = '/information/test';
  public infoPatientRoute = '/information/patient';

  // principal menu
  public principalMenu = '/principal-menu';
  public secretariatRoute = '/secretariat/show';
  public adminRoute = '/admin/show';
  public paramSoftRoute = '/param-soft/show';
  public paramSchoolRoute = '/param-school/show';
  public evaluationsRoute = '/evaluations/show';

  // other information from server
  public forfaitStateRoute = '/forfait-state/show';

  // year
  public yearFormRoute = '/year-app/form';
  public yearListRoute = '/year-app/list';
  public yearShowRoute = '/year-app/show';

  // assurance
  public assuranceFormRoute = '/assurance/form';
  public assuranceListRoute = '/assurance/list';
  public assuranceShowRoute = '/assurance/show';



  // expense
  public expenseFormRoute = '/expense/form';
  public expenseListRoute = '/expense/list';

  // pdfViewerRoute
  public pdfViewerShowRoute = '/pdfViewer/show';

  // historique
  public histoPatientsRoute = '/histo-patients/show';
  public histoTestsRoute = '/histo-tests/show';


  // old version tools
  public oldVersionRoute = '/old-version/show';

  // establishment
  public reductionMotiveFormRoute = '/reduction-motive/form';
  public reductionMotiveListRoute = '/reduction-motive/list';
  public reductionStudentListRoute = '/reduction-student/list';

  // subject
  public subjectFormRoute = '/subject/form';
  public subjectListRoute = '/subject/list';
  public subjectTypeFormRoute = '/subject-type/form';
  public subjectTypeListRoute = '/subject-type/list';

  // evaluation
  public evaluationFormRoute = '/evaluation/form';
  public evaluationListRoute = '/evaluation/list';
  public evaluationTypeFormRoute = '/evaluation-type/form';
  public evaluationTypeListRoute = '/evaluation-type/list';


  // decoupage
  public decoupageFormRoute = '/decoupage/form';
  public decoupageListRoute = '/decoupage/list';

  constructor(private appConfigsService: AppConfigsService) { }
}
