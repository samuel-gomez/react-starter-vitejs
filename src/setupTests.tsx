import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import { server } from 'shared/testsUtils/msw';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import 'whatwg-fetch';

expect.extend(toHaveNoViolations);
expect.extend(matchers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
