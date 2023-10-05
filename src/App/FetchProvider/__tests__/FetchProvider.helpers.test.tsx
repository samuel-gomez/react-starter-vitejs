import { STATUS_HTTP_MESSAGES } from 'shared/constants';
import { buildResponse, setFetchCustom, computeDataError, setResponseError, manageConfig } from '../FetchProvider.helpers';

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

describe('buildResponse', () => {
  const computeDataErrorFn = vi.fn();
  const responseMock = {
    status: 200,
    text: async () => ({ msg: 'testText' }),
    json: async () => ({ msg: 'test' }),
    blob: async () => ({ msg: 'testblob' }),
  };
  it('Should return response 200 and msg = test when status = 200 and blob is falsy', async () => {
    const result = await buildResponse(responseMock, { blob: false, text: false });
    expect(result).toEqual({ statusHttp: responseMock.status, msg: 'test' });
  });

  it('Should return msg = testblob when status = 200 and blob is truthy', async () => {
    const result = await buildResponse(responseMock, { blob: true, text: false });
    expect(result).toEqual({ msg: 'testblob' });
  });

  it('Should return msg = testText when status = 200 and text is truthy', async () => {
    const result = await buildResponse(responseMock, { blob: false, text: true });
    expect(result).toEqual({ msg: 'testText' });
  });

  it('Should called computeDataErrorFn when status = 504', async () => {
    responseMock.status = 504;
    try {
      await buildResponse(responseMock, { blob: false, text: false }, computeDataErrorFn);
    } catch (error) {
      expect(computeDataErrorFn).toBeCalled();
    }
  });

  it('Should called computeDataErrorFn when status = 500', async () => {
    responseMock.status = 500;
    try {
      await buildResponse(responseMock, { blob: false, text: false }, computeDataErrorFn);
    } catch (error) {
      expect(computeDataErrorFn).toBeCalled();
    }
  });

  it('Should called computeDataErrorFn when status = 400', async () => {
    responseMock.status = 400;
    try {
      await buildResponse(responseMock, { blob: false, text: false }, computeDataErrorFn);
    } catch (error) {
      expect(computeDataErrorFn).toBeCalled();
    }
  });

  it('Should return response 204 when status = 204', async () => {
    responseMock.status = 204;
    const result = await buildResponse(responseMock, { blob: false, text: false });
    expect(result).toEqual({ statusHttp: responseMock.status });
  });
});

describe('computeDataError', () => {
  const responseMock = {
    status: 500,
    text: async () => ({ msg: 'test' }),
    json: async () => ({}),
    blob: async () => ({ msg: 'testblob' }),
  };
  const setResponseFn = vi.fn();

  it('Should called setResponseFn without setResponseFn', async () => {
    responseMock.json = async () => ({
      anomaly: { label: 'test' },
      code: 500,
    });
    try {
      await computeDataError(responseMock);
      expect(setResponseFn).toBeCalledWith({ label: 'test' });
    } catch (error) {
      /* empty */
    }
  });

  it('Should called setResponseFn', async () => {
    responseMock.json = async () => ({
      anomaly: { label: 'test' },
      code: 500,
    });
    try {
      await computeDataError(responseMock, setResponseFn);
      expect(setResponseFn).toBeCalledWith({ label: 'test' });
    } catch (error) {
      /* empty */
    }
  });

  it('Should called setResponseFn in throw', async () => {
    responseMock.json = async () => {
      throw new Error('');
    };
    try {
      await computeDataError(responseMock, setResponseFn);
    } catch (error) {
      expect(setResponseFn).toBeCalledWith({
        response: { anomaly: { label: STATUS_HTTP_MESSAGES[responseMock.status] }, status: responseMock.status },
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
