import { render, screen } from 'shared/testsUtils';
import DownloadLinkContainer from '../DownloadLink.container';

describe('DownloadLinkContainer', () => {
  it('Render <DownloadLinkContainer/> ', () => {
    render(<DownloadLinkContainer label="Télécharger les résultats" path="elecions/3/resultats" fileName="2_20220112_AAM-VIE_resultats.csv" />);
    const button = screen.getByLabelText('Télécharger les résultats');
    expect(button).toBeInTheDocument();
    const imageSvg = screen.getByRole('img');
    expect(imageSvg).toHaveClass('af-download-link__icon');
    const titleSvg = screen.getByText('download-csv');
    expect(titleSvg).toBeInTheDocument();
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
