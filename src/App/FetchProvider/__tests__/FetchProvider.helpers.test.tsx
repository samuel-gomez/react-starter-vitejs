import { STATUS_HTTP_MESSAGES } from 'shared/constants';
import { Blob as BlobNode } from 'node:buffer';
import {
  buildResponse,
  setFetchCustom,
  computeDataError,
  setResponseError,
  manageConfig,
  catchErrorServer,
  getAccessToken,
} from '../FetchProvider.helpers';

const fetchConfigMock = {
  headers: {
    'Content-Type': 'text/plain',
  },
};

const apiMock = {
  base: 'http://localhost:5001/api/',
  github: 'https://raw.githubusercontent.com/',
};

const fetchMock = vi.fn();

describe('setFetchCustom', () => {
  const resolvedValue = { json: () => ({ data: 'data' }), blob: () => ({ blob: 'blob' }), status: 200 };
  it('Should fetch called with merged infos and result return 200 response Fetch when call setFetchCustom', async () => {
    const queryKey = [
      'members',
      {
        headers: {
          body: 'body',
        },
      },
    ];
    fetchMock.mockResolvedValue(resolvedValue);
    const result = await setFetchCustom({ apiUrl: apiMock, fetchAuthConfig: fetchConfigMock, fetchFn: fetchMock })(queryKey);

    expect(fetchMock).toBeCalledWith('http://localhost:5001/api/members', {
      headers: {
        'Content-Type': 'text/plain',
        body: 'body',
      },
    });

    expect(result).toEqual({ data: 'data', statusHttp: 200 });
  });

  it('Should return blob response when config.blob is true', async () => {
    const queryKey = [
      'members',
      {
        blob: true,
      },
    ];
    fetchMock.mockResolvedValue(resolvedValue);
    const result = await setFetchCustom({ apiUrl: apiMock, fetchAuthConfig: fetchConfigMock, fetchFn: fetchMock })(queryKey);
    expect(result).toEqual({ blob: 'blob' });
  });
});

const responseMock = new Response();
responseMock.text = async () => JSON.stringify({ msg: 'testText' });
responseMock.blob = async () => new BlobNode([JSON.stringify({ msg: 'testblob' }, null, 2)]) as unknown as Blob;
responseMock.json = async () => ({ msg: 'test' });

describe('buildResponse', () => {
  const computeDataErrorFn = vi.fn();

  const responseMock200 = {
    ...responseMock,
    status: 200,
  };

  it('Should return response 200 and msg = test when status = 200 and blob is falsy', async () => {
    const result = await buildResponse(responseMock200, { blob: false, text: false });
    expect(result).toEqual({ statusHttp: responseMock200.status, msg: 'test' });
  });

  it('Should return msg = testblob when status = 200 and blob is truthy', async () => {
    const result = await buildResponse(responseMock200, { blob: true, text: false });
    const textBlob = await result.text();
    expect(textBlob).toContain('testblob');
  });

  it('Should return msg = testText when status = 200 and text is truthy', async () => {
    const result = await buildResponse(responseMock200, { blob: false, text: true });
    expect(result).toEqual('{"msg":"testText"}');
  });

  it('Should called computeDataErrorFn when status = 504', async () => {
    const responseMock504 = { ...responseMock, status: 504 };
    try {
      await buildResponse(responseMock504, { blob: false, text: false }, computeDataErrorFn);
    } catch (error) {
      expect(computeDataErrorFn).toBeCalled();
    }
  });

  it('Should called computeDataErrorFn when status = 500', async () => {
    const responseMock500 = { ...responseMock, status: 500 };
    try {
      await buildResponse(responseMock500, { blob: false, text: false }, computeDataErrorFn);
    } catch (error) {
      expect(computeDataErrorFn).toBeCalled();
    }
  });

  it('Should called computeDataErrorFn when status = 400', async () => {
    const responseMock400 = { ...responseMock, status: 200 };
    try {
      await buildResponse(responseMock400, { blob: false, text: false }, computeDataErrorFn);
    } catch (error) {
      expect(computeDataErrorFn).toBeCalled();
    }
  });

  it('Should return response 204 when status = 204', async () => {
    const responseMock204 = { ...responseMock, status: 204 };
    const result = await buildResponse(responseMock204, { blob: false, text: false });
    expect(result).toEqual({ statusHttp: responseMock204.status });
  });
});

describe('computeDataError', () => {
  const responseMockError = {
    ...responseMock,
    status: 500,
    json: async () => ({
      anomaly: { label: 'test' },
      code: 500,
    }),
  };
  const setResponseFn = vi.fn();

  it('Should called setResponseFn without setResponseFn', async () => {
    try {
      await computeDataError(responseMockError);
      expect(setResponseFn).toBeCalledWith({ label: 'test' });
    } catch (error) {
      /* empty */
    }
  });

  it('Should called setResponseFn', async () => {
    try {
      await computeDataError(responseMockError, setResponseFn);
      expect(setResponseFn).toBeCalledWith({ label: 'test' });
    } catch (error) {
      /* empty */
    }
  });

  it('Should called setResponseFn in throw', async () => {
    const responseMockThrowError = {
      ...responseMock,
      status: 500,
      json: async () => {
        throw new Error('');
      },
    };

    try {
      await computeDataError(responseMockThrowError, setResponseFn);
    } catch (error) {
      expect(setResponseFn).toBeCalledWith({
        response: { anomaly: { label: STATUS_HTTP_MESSAGES[responseMockThrowError.status] }, status: responseMockThrowError.status },
      });
    }
  });
});

describe('setResponseError', () => {
  it('Should return 404 danger', () => {
    const responseService = {
      anomaly: {
        label: 'test',
        detail: '',
      },
      status: 404,
      responseBody: {},
    };
    const result = setResponseError({ response: responseService });
    expect(result).toEqual({
      ...responseService.anomaly,
      label: responseService.anomaly?.label,
      type: 'danger',
      iconName: 'alert',
    });
  });

  it('Should return 404 danger with generic label when anomaly is undefined', () => {
    const responseService = {
      anomaly: undefined,
      status: 404,
      responseBody: {},
    };
    const result = setResponseError({ response: responseService });
    expect(result).toEqual({
      label: STATUS_HTTP_MESSAGES[responseService.status],
      type: 'danger',
      iconName: 'alert',
      detail: '',
    });
  });

  it('Should return 500 error', () => {
    const responseService = {
      anomaly: {
        label: 'test',
        detail: '',
      },
      status: 500,
      responseBody: {},
    };
    const result = setResponseError({ response: responseService });
    expect(result).toEqual({
      ...responseService.anomaly,
      label: responseService.anomaly?.label,
    });
  });

  it('Should return 500 error with generic label when anomaly is undefined', () => {
    const responseService = {
      anomaly: undefined,
      status: 500,
      responseBody: {},
    };
    const result = setResponseError({ response: responseService });
    expect(result).toEqual({
      label: STATUS_HTTP_MESSAGES[responseService.status],
      detail: '',
    });
  });

  it('Should return empty object', () => {
    const responseService = {
      anomaly: {
        label: 'test',
        detail: '',
      },
      status: 100,
      responseBody: {},
    };
    const result = setResponseError({ response: responseService });
    expect(result).toEqual({});
  });
});

describe('manageConfig', () => {
  let apiNameMock = 'base';
  const fetchAuthConfigMock = {
    headers: { test: 'test' },
  };
  it('Should return object with headers', () => {
    const result = manageConfig(apiNameMock, fetchAuthConfigMock);
    expect(result).toEqual(fetchAuthConfigMock);
  });
  it('Should return object without headers', () => {
    apiNameMock = 'other';
    const result = manageConfig(apiNameMock, fetchAuthConfigMock);
    expect(result).toEqual({});
  });
});

describe('catchErrorServer', () => {
  it('Should return object with headers', async () => {
    const result = catchErrorServer({ message: 'servor error' });
    const resultJson = await result.json();
    expect(resultJson).toEqual({
      anomaly: {
        label: 'servor error',
      },
    });
  });
});

describe('getAccessToken', () => {
  const useOidcAccessTokenFn = vi.fn();
  const useOidcAccessTokenMockFn = vi.fn();
  const defaultProps = {
    isEnabled: true,
    useOidcAccessTokenFn,
    useOidcAccessTokenMockFn,
  };
  it('Should useOidcAccessTokenFn when isEnabled true', async () => {
    const result = getAccessToken(defaultProps);
    expect(result).toEqual(useOidcAccessTokenFn);
  });
  it('Should useOidcAccessTokenMockFn when isEnabled true', async () => {
    const result = getAccessToken({ ...defaultProps, isEnabled: false });
    expect(result).toEqual(useOidcAccessTokenMockFn);
  });
});
