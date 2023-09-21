import { rest } from 'msw';
import type { ResponseResolver, RestRequest, PathParams, RestContext } from 'msw';
import { setupServer } from 'msw/node';
import { GITHUB_API, STATUS_HTTP, STATUS_HTTP_MESSAGES } from 'shared/constants';
import { MOCK_API_URL } from '.';

type HandlerResolver = ResponseResolver<RestRequest<never, PathParams<string>>, RestContext>;

const commonResponse: HandlerResolver = (req, res, ctx) => {
  const testMock = req.headers.get('testMock');
  const testMockParsed = testMock === null ? {} : JSON.parse(testMock);
  const { responseBody = {}, code = 200 } = testMockParsed;
  return res(
    ctx.json({
      code,
      responseBody,
    }),
  );
};

const commonPostResponse: HandlerResolver = async (req, res, ctx) => {
  const testMock = req.headers.get('testMock');
  const testMockParsed = testMock === null ? {} : JSON.parse(testMock);
  const { code = 200 } = testMockParsed;
  const { ...responseBody } = await req.json();

  return `${code}` === '200'
    ? res(
        ctx.json({
          code,
          responseBody: {
            ...responseBody,
            id: '123',
          },
        }),
      )
    : res(
        ctx.status(code),
        ctx.json({
          code,
          statusHttp: code,
          label: STATUS_HTTP_MESSAGES[STATUS_HTTP.SERVER_ERROR],
        }),
      );
};

export const handlers = [
  rest.get(`${MOCK_API_URL.github}${GITHUB_API}test/README.md`, commonResponse),
  rest.get(`${MOCK_API_URL.base}members`, commonResponse),
  rest.get(`${MOCK_API_URL.base}members/search`, commonResponse),
  rest.get(`${MOCK_API_URL.base}members/:id/download-detail`, commonResponse),
  rest.post(`${MOCK_API_URL.base}members/add`, commonPostResponse),
];

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
