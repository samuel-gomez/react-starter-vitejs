import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { WrapperQuery } from 'shared/testsUtils';
import DownloadLinkContainer from '../DownloadLink.container';

describe('DownloadLinkContainer', () => {
  it('Render <DownloadLinkContainer/> ', () => {
    const { asFragment } = render(
      <WrapperQuery>
        <DownloadLinkContainer label="Télécharger les résultats" path="elecions/3/resultats" fileName="2_20220112_AAM-VIE_resultats.csv" />
      </WrapperQuery>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should call useDownloadFn with path: "elecions/3/resultats" and callsetLoaderModeFn with {isLoading: false} when render DownloadLinkContainer', () => {
    const clearSubmitDownloadMock = vi.fn();
    const setLoaderModeFnMock = vi.fn().mockReturnValue('none');
    const useSubmitDownloadFnMock = vi.fn().mockReturnValue({
      submitDownload: vi.fn(),
      clearSubmitDownload: clearSubmitDownloadMock,
      stateSubmitDownload: false,
    });
    const useDownloadFnMock = vi.fn().mockReturnValue({
      submitDownload: vi.fn(),
      isLoading: false,
      anomaly: null,
    });
    const useDownloadFileMock = vi.fn();

    render(
      <DownloadLinkContainer
        setLoaderModeFn={setLoaderModeFnMock}
        useDownloadFn={useDownloadFnMock}
        label="Télécharger les résultats"
        path="elecions/3/resultats"
        fileName="2_20220112_AAM-VIE_resultats.csv"
        useSubmitDownloadFn={useSubmitDownloadFnMock}
        useDownloadFileFn={useDownloadFileMock}
      />,
    );

    expect(setLoaderModeFnMock).toBeCalledWith({ isLoading: false });
    expect(useDownloadFnMock).toBeCalledWith({ path: 'elecions/3/resultats', hasSubmit: false, clearSubmitDownload: clearSubmitDownloadMock });
  });
});
