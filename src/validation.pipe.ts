import {
  ValidationError,
  ValidationPipe as OriginalValidationPipe,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

export class ValidationPipe extends OriginalValidationPipe {
  public createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) {
        return new HttpErrorByCode[this.errorHttpStatusCode]();
      }
      const errors: Record<string, unknown> = {};
      validationErrors.forEach(error => {
        errors[error.property] = Object.values(error.constraints || {});
      });
      return new HttpErrorByCode[this.errorHttpStatusCode](errors);
    };
  }
}
