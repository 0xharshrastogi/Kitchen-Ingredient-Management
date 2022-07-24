import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText',
})
export class TrimTextPipe implements PipeTransform {
  transform(value: string, count: number): string {
    if (value.length <= count) {
      return value;
    }

    return value.substring(0, count) + ' ...';
  }
}
