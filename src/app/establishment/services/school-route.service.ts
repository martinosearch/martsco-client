import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchoolRouteService {
  // employee
  public parentsListRoute = '/parent/list';

  // country
  public countryFormRoute = '/country/form';
  public countryListRoute = '/country/list';

  // ministary
  public ministaryFormRoute = '/ministary/form';
  public ministaryListRoute = '/ministary/list';

  // exam national
  public ExamNationalFormRoute = '/exam-national/form';
  public examNationalListRoute = '/exam-national/list';

  // establishment
  public establishmentTypeFormRoute = '/establishment-type/form';
  public establishmentTypeListRoute = '/establishment-type/list';
  public cycleListRoute = '/cycle/list';


  // establishment
  public establishmentFormRoute = '/establishment/form';
  public establishmentListRoute = '/establishment/list';
  public establishmentShowRoute = '/establishment/show';

  constructor() { }
}
