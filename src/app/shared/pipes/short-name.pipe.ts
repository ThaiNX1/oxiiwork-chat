import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {
  transform(fullName: string): string {
    let shortName = '';
    if (fullName) {
      const names = fullName.trim().split(' ').reduce((arr: string[], curr) => {
        arr.push(curr.trim());
        return arr;
      }, []);
      shortName = names.length === 1
        ? names[0].substring(0, 1)
        : names[0].substring(0, 1) + names[names.length - 1].substring(0, 1);
    }
    return shortName.toUpperCase();
  }
}
