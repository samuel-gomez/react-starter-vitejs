import { expect, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { server } from 'shared/testsUtils/msw';

expect.extend(matchers);

vi.doMock('react-jsx-parser', () => ({
  default: ({ jsx }: { jsx?: string }) => jsx,
}));

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
