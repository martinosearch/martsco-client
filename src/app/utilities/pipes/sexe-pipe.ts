import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sex' })
export class SexPipe implements PipeTransform {
  transform(id: number): string {
    if (id === 1) {
      return 'F';
    } else if (id === 3) {
      return '-';
    } else {
      return 'M';
    }
  }
}

@Pipe({ name: 'male' })
export class CountMalePipe implements PipeTransform {
  transform(list: any[]): number {
    const temp = [];

    for (const item of list) {
      if (item.identity.sex === 0) {
        temp.push(item);
      }
    }

    return temp.length;
  }
}

@Pipe({ name: 'female' })
export class CountFemalePipe implements PipeTransform {
  transform(list: any[]): number {
    const temp = [];

    for (const item of list) {
      if (item.identity.sex === 1) {
        temp.push(item);
      }
    }

    return temp.length;
  }
}
