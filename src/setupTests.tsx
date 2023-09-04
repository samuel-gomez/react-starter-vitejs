import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from 'shared/testsUtils/msw';
import { toHaveNoViolations } from 'jest-axe';
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
