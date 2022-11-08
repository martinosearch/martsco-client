import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'devise' })
export class DevisePipe implements PipeTransform {
  transform(mnt: number): string {
    return mnt + ' F CFA';
  }
}

@Pipe({ name: 'assurance' })
export class AssurancePipe implements PipeTransform {
  transform(type: number): string {
    if (type === 0) {
      return 'PUBLIQUE';
    } else {
      return 'PRIVEE';
    }
  }
}
