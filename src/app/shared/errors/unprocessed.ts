import { AppError } from './app-error';

export class Unprocessed extends AppError {
  errors: string[];

  constructor(originalError?: any) {
    super(originalError);

    if (originalError.error) {
      this.errors = originalError.error.errors;
    }
  }
}
