import { rest } from 'msw';
import type { ResponseResolver, RestRequest, PathParams, RestContext } from 'msw';
import { setupServer } from 'msw/node';
import { STATUS_HTTP, STATUS_HTTP_MESSAGES } from 'shared/constants';
import { MOCK_API_URL } from '.';

type HandlerResolver = ResponseResolver<RestRequest<never, PathParams<string>>, RestContext>;

type TcommonResponse<T> = {
  code?: number;
  responseBody?: T;
};

export const commonGetResponse =
  <T>({ code = 200, responseBody }: TcommonResponse<T>): HandlerResolver =>
  (req, res, ctx) =>
    res(
      ctx.status(code),
      ctx.json({
        code,
        responseBody,
      }),
    );

const commonPostResponse =
  <T = Record<string, unknown>>({ code = 200, responseBody }: TcommonResponse<T>): HandlerResolver =>
  async (req, res, ctx) => {
    return `${code}` === `${STATUS_HTTP.SUCCESS}`
      ? res(
          ctx.json({
            code,
            responseBody,
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

export const server = setupServer(
  // here your mock urls

  // POST example :
  rest.post(
    `${MOCK_API_URL.base}members/add`,
    commonPostResponse({ responseBody: { civility: 'MME', firstname: 'Samuel', lastname: 'Gomez', id: '1234' } }),
  ),
);

type TserverUse<T> = {
  base?: string;
  route?: string;
  code?: number;
  responseBody?: T;
};

/**
 * Méthodes permettant de mocker une route d'API en GET et POST depuis le fichier de test
 * @param base : BASE ROUTE avec comme valeur par défaut MOCK_API_URL.base
 * @param route : URI à renseigner
 * @param code : status code que l'API doit renvoyer
 * @param responseBody : corps de la réponse
 */

export const serverUseGet = <T = Record<string, unknown>>({ base = MOCK_API_URL.base, route = '', code = 200, responseBody }: TserverUse<T>) =>
  server.use(rest.get(`${base}${route}`, commonGetResponse<T>({ code, responseBody })));

export const serverUsePost = <T = Record<string, unknown>>({ base = MOCK_API_URL.base, route = '', code = 200, responseBody }: TserverUse<T>) => {
  server.use(rest.post(`${base}${route}`, commonPostResponse<T>({ code, responseBody })));
};
