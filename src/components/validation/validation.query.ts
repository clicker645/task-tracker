import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ClassCleaner } from '../transform/class.cleaner';
import { ValidationError } from 'class-validator';

export const queryValidations = [
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
  new ClassCleaner(),
];
