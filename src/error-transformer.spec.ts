import { transformErrors } from './error-transformer';
import { exampleErrors } from './example-errors';

describe('Error transformer', () => {
  it('returns an array of errors with relavant fields', async () => {
    const transformedErrors = transformErrors(exampleErrors);

    expect(Array.isArray(transformedErrors)).toBe(true);
    expect(Array.isArray(transformedErrors[0].errors)).toBe(true);
    expect(typeof transformedErrors[0].errors[0]).toBe('string');
    expect(Array.isArray(transformedErrors[0].field)).toBe(true);
    expect(typeof transformedErrors[0].field[0]).toBe('string');
  });
});
