import { CivilityService } from '../../establishment/services/civility.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'civility' })
export class CivilityPipe implements PipeTransform {
  constructor(public civilityService: CivilityService) {
  }
  transform(id: number): string {
    for (const item of this.civilityService.civilities) {
      if (item.id === id) {
        return item.intitule;
      }
    }
    return undefined;
  }
}
