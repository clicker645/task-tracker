import { ValidationPipe } from '@nestjs/common';
import { ClassCleaner } from '../transform/class.cleaner';

export const queryValidations = [
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
  new ClassCleaner(),
];
