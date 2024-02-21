import { useOidcAccessToken } from '@axa-fr/react-oidc';
import { type QueryKey } from '@tanstack/react-query';
import fetch from 'cross-fetch';
import { API_URL, STATUS_API, STATUS_HTTP_MESSAGES } from 'shared/constants';
import { isEmptyOrNull, mergeObj } from 'shared/helpers';
import { useOidcAccessTokenMock } from './constants';

type TsetResponseError = {
  response: {
    anomaly?: {
      label?: string;
      detail?: string;
    };
    status: number;
  };
};

export const setResponseError = ({ response }: TsetResponseError) => {
  const { anomaly, status } = response;
  switch (true) {
    case `${status}`.startsWith(`${STATUS_API.WARNING}`):
      return {
        ...anomaly,
        label: isEmptyOrNull(anomaly?.label) ? STATUS_HTTP_MESSAGES[status] : anomaly?.label,
        detail: anomaly?.detail ?? '',
        type: 'danger',
        iconName: 'alert',
      };
    case `${status}`.startsWith(`${STATUS_API.ERROR}`):
      return {
        ...anomaly,
        label: isEmptyOrNull(anomaly?.label) ? STATUS_HTTP_MESSAGES[status] : anomaly?.label,
        detail: anomaly?.detail ?? '',
      };
    default:
      return {};
  }
};

export const computeDataError = async (response: Response, setResponseErrorFn = setResponseError) => {
  try {
    const data = await response.json();
    return setResponseErrorFn({ response: { ...data, status: response.status } });
  } catch (error) {
    return setResponseErrorFn({ response: { anomaly: { label: STATUS_HTTP_MESSAGES[response.status] }, status: response.status } });
  }
};

type TConfig = Record<string, boolean>;

export const buildResponse = async (response: Response, config: TConfig, computeDataErrorFn = computeDataError) => {
  const { status } = response;

  switch (true) {
    case `${status}`.startsWith(`${STATUS_API.ERROR}`):
    case `${status}`.startsWith(`${STATUS_API.WARNING}`): {
      throw await computeDataErrorFn(response);
    }
    case `${status}` === `${STATUS_API.SUCCESS}`:
      if (config.blob) {
        return response.blob();
      }
      if (config.text) {
        return response.text();
      }
      return {
        ...(await response.json()),
        statusHttp: status,
      };
    default:
      return {
        statusHttp: status,
      };
  }
};

export const manageConfig = (apiName: string, fetchAuthConfig: { headers?: object }) => {
  const { headers, ...restFetchAuthConfig } = fetchAuthConfig;
  return apiName === API_URL.BASE && headers ? { headers, ...restFetchAuthConfig } : restFetchAuthConfig;
};

export const catchErrorServer = (error: { message: string }) =>
  Response.json(
    {
      anomaly: {
        label: error.message,
      },
    },
    {
      status: 500,
      statusText: error.message,
    },
  );

export type TsetFetchCustom = {
  apiUrl: Record<string, string>;
  fetchAuthConfig: object;
  fetchFn?: typeof fetch;
  mergeObjFn?: typeof mergeObj;
  manageConfigFn?: typeof manageConfig;
  catchErrorServerFn?: typeof catchErrorServer;
};

export const setFetchCustom =
  ({
    apiUrl,
    fetchAuthConfig,
    fetchFn = fetch,
    mergeObjFn = mergeObj,
    manageConfigFn = manageConfig,
    catchErrorServerFn = catchErrorServer,
  }: TsetFetchCustom) =>
  async (queryKey: QueryKey) => {
    const [path, customConfig, apiName = API_URL.BASE]: QueryKey = queryKey;
    const url = `${apiUrl[apiName as string]}${path}`;
    const fetchAuthConfigCustom = manageConfigFn(apiName as string, fetchAuthConfig);
    const config = mergeObjFn(fetchAuthConfigCustom, customConfig);

    const response = await fetchFn(url, config).catch(catchErrorServerFn);
    return buildResponse(response, config);
  };

export const getAccessToken = ({
  isEnabled,
  useOidcAccessTokenFn = useOidcAccessToken,
  useOidcAccessTokenMockFn = useOidcAccessTokenMock,
}: {
  isEnabled?: boolean;
  useOidcAccessTokenFn?: typeof useOidcAccessToken;
  useOidcAccessTokenMockFn?: typeof useOidcAccessTokenMock;
}) => (isEnabled ? useOidcAccessTokenFn : useOidcAccessTokenMockFn);
