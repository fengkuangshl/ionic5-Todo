import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentSubstring'
})
export class ContentSubstringPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    value = value + ''; // make sure it's a string
    if (value.length > args) {
      return value.substr(0, args) + '...';
    }
    return value;
  }

}
