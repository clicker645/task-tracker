// import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
// import { Schema } from '@hapi/joi';
// import { dictionary } from '../../config/dictionary';
//
// @Injectable()
// export class JoiValidationPipe implements PipeTransform {
//   constructor(private readonly schema: Schema) {}
//
//   transform(value: any) {
//     const { error } = this.schema.validate(value);
//     if (error) {
//       throw new BadRequestException(dictionary.errors.validationError);
//     }
//     return value;
//   }
// }
