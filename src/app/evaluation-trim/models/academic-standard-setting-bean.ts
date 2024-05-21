import { CoefAttribution } from "./coef-attribution";
import { AcademicStandardSetting } from "./academic-standard-setting";

export class AcademicStandardSettingBean {
  id: number;
  coefAttributions: CoefAttribution[] = [];
  settings: AcademicStandardSetting[] = [];
}
