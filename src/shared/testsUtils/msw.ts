import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { STATUS_HTTP_MESSAGES } from 'shared/constants';
import { MOCK_API_URL } from '.';

type TcommonResponse<T> = {
  code?: number;
  responseBody?: T;
};

export const commonResponse =
  <T>({ code = 200, responseBody }: TcommonResponse<T>) =>
  () =>
    HttpResponse.json(
      {
        code,
        responseBody,
        statusHttp: code,
        label: STATUS_HTTP_MESSAGES[code],
      },
      { status: code },
    );

export const server = setupServer(
  // here your mock urls

  // POST example :
  http.post(
    `${MOCK_API_URL.base}members/add`,
    commonResponse({ responseBody: { civility: 'MME', firstname: 'Samuel', lastname: 'Gomez', id: '1234' } }),
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
  server.use(http.get(`${base}${route}`, commonResponse<T>({ code, responseBody })));

export const serverUsePost = <T = Record<string, unknown>>({ base = MOCK_API_URL.base, route = '', code = 200, responseBody }: TserverUse<T>) => {
  server.use(http.post(`${base}${route}`, commonResponse<T>({ code, responseBody })));
};
