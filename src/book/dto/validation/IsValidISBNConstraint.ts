import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import * as ISBNUtils from 'isbn-utils';

@ValidatorConstraint({ async: false }) // No necesita ser asíncrono
export class IsValidISBNConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return Boolean(ISBNUtils.isValid(value));
  }

  defaultMessage(args: ValidationArguments): string {
    return 'El ISBN proporcionado no es válido';
  }
}
