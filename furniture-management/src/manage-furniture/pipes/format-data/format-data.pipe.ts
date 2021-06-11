import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatData'
})
export class FormatDataPipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    return value.substr(0, 40) + "...";
  };

}
