import { ValidationError } from '@nestjs/common';

export interface TransformedError {
  field: string[];
  errors: string[];
}

export const transformErrors = (
  validationErrors: ValidationError[],
  nest: string[] = []
) => {
  return validationErrors.reduce((accumulator: TransformedError[], current) => {
    accumulator.push(...transformError(current, nest));
    return accumulator;
  }, []);
};

const transformError = (
  validationError: ValidationError,
  nest: string[]
): TransformedError[] => {
  const op = [];

  if (validationError.constraints) {
    op.push({
      field: [...nest, validationError.property],
      errors: Object.values(validationError.constraints || []),
    });
  }

  if (validationError.children?.length) {
    validationError.children.forEach(child => {
      op.push(...transformError(child, [...nest, validationError.property]));
    });
  }

  return op;
};
