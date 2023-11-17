import { renderHook, act, customRenderHook } from 'shared/testsUtils';
import { SUCCESS_DOWNLOAD_MESSAGE } from '../constants';
import { useDownload, useSubmitDownload, onSuccess, onError, useDownloadFile } from '../DownloadLink.hook';

describe('useSubmitDownload', () => {
  it('Should stateSubmitDownload to be false when clearSubmitDownload called', () => {
    const { result } = renderHook(() => useSubmitDownload());
    act(() => result.current.clearSubmitDownload());
    expect(result.current.stateSubmitDownload).toBe(false);
  });

  it('Should stateSubmitDownload to be true when submitDownload called', () => {
    const { result } = renderHook(() => useSubmitDownload());
    act(() => result.current.submitDownload());
    expect(result.current.stateSubmitDownload).toBe(true);
  });
});

describe('useDownload', () => {
  const defaultProps = {
    path: 'download/id',
    hasSubmit: false,
    useQueryFn: vi.fn().mockReturnValue({
      data: new Blob(['test']),
      isFetching: false,
      error: { label: 'erreur' },
      isError: true,
      isSuccess: false,
    }),
  };
  it('Should return initial state when useDownload called with path: "elections/12/resultats" and hasSubmit: false', () => {
    const { result } = renderHook(() => useDownload({ ...defaultProps }));
    act(() => {
      expect(result.current).toEqual({
        isLoading: false,
        downloadFile: new Blob(['test']),
        error: { label: 'erreur' },
        isError: true,
        isSuccess: false,
      });
    });
  });
});

describe('useDownloadFile', () => {
  const downloadjsMock = vi.fn();
  const onSuccessMock = vi.fn();
  const onErrorMock = vi.fn();
  const clearSubmitDownloadMock = vi.fn();

  const defaultProps = {
    isLoading: false,
    isSuccess: true,
    isError: false,
    error: null,
    hasSubmit: true,
    downloadFile: new Blob(['file']),
    fileName: 'filename',
    clearSubmitDownload: clearSubmitDownloadMock,
    onSuccessFn: onSuccessMock,
    onErrorFn: onErrorMock,
    downloadjsFn: downloadjsMock,
  };
  it('Should call downloadjs and onSuccess when useDownloadFile called with isSuccess: true, hasSubmit: true, fileName: filename, isLoading: false and have downloadFile', () => {
    customRenderHook()(() => useDownloadFile({ ...defaultProps }));
    expect(downloadjsMock).toBeCalledWith(defaultProps.downloadFile, defaultProps.fileName, 'text/csv');
    expect(onSuccessMock).toBeCalled();
  });
  it('Should return initial state when useDownloadFile called with isError: true, hasSubmit: true', () => {
    customRenderHook()(() => useDownloadFile({ ...defaultProps, isError: true, error: { label: 'erreur' } }));
    expect(onErrorMock).toBeCalled();
  });
});

describe('onSuccess', () => {
  it('Should called clearSubmitDownloadMock and addNotificationMock', () => {
    const clearSubmitDownloadMock = vi.fn();
    const addNotificationMock = vi.fn();
    onSuccess(clearSubmitDownloadMock, addNotificationMock);
    expect(clearSubmitDownloadMock).toBeCalled();
    expect(addNotificationMock).toBeCalledWith({
      label: SUCCESS_DOWNLOAD_MESSAGE,
      id: 'success-alert-id',
      type: 'success',
    });
  });
});

describe('onError', () => {
  const clearSubmitDownloadMock = vi.fn();
  const addNotificationMock = vi.fn();

  it('Should called addNotificationMock with name error', () => {
    const error = { label: 'test' };
    onError(clearSubmitDownloadMock, addNotificationMock, error);
    expect(clearSubmitDownloadMock).toBeCalled();
    expect(addNotificationMock).toBeCalledWith({
      label: error.label,
      id: 'anomaly-alert-id',
    });
  });
  it('Should called addNotificationMock with null error', () => {
    const error = null;
    onError(clearSubmitDownloadMock, addNotificationMock, error);
    expect(clearSubmitDownloadMock).toBeCalled();
    expect(addNotificationMock).toBeCalledWith({
      label: 'Erreur de téléchargement',
      id: 'anomaly-alert-id',
    });
  });
});
