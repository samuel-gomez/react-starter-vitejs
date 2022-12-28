import { describe, it, expect } from 'vitest';
import emptyFuncion from './emptyFunction';

describe('emptyFuncion', () => {
  it('Should return null when emptyFuncion have been called', () => {
    const result = emptyFuncion();
    expect(result).toBeNull();
  });
});
