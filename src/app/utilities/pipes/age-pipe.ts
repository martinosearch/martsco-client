import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'age' })
export class AgePipe implements PipeTransform {
  transform(id: number): string {
    if (id < 2) {
      return id + ' an';
    } else {
      return id + ' ans';
    }
  }
}
