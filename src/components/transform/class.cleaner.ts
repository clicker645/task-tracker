import { PipeTransform } from '@nestjs/common';

export class ClassCleaner implements PipeTransform {
  transform(value: any): any {
    Object.entries(value).forEach(([key, objValue]) => {
      if (objValue === undefined || objValue === null) {
        delete value[key];
      }
    });

    return value;
  }
}
