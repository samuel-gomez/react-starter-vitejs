import { render, screen } from 'shared/testsUtils';
import DownloadLinkContainer from '../DownloadLink.container';

describe('DownloadLinkContainer', () => {
  it('Render <DownloadLinkContainer/> ', () => {
    render(<DownloadLinkContainer label="Télécharger" path="download/id" fileName="document.csv" />);
    const button = screen.getByLabelText('Télécharger');
    expect(button).toBeInTheDocument();
    const imageSvg = screen.getByRole('img');
    expect(imageSvg).toHaveClass('af-download-link__icon');
    const titleSvg = screen.getByText('download-csv');
    expect(titleSvg).toBeInTheDocument();
  });

  it('Should call useDownloadFn with path: "download/id" and callsetLoaderModeFn with {isLoading: false} when render DownloadLinkContainer', () => {
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
        label="Télécharger"
        path="download/id"
        fileName="document.csv"
        useSubmitDownloadFn={useSubmitDownloadFnMock}
        useDownloadFileFn={useDownloadFileMock}
      />,
    );

    expect(setLoaderModeFnMock).toBeCalledWith({ isLoading: false });
    expect(useDownloadFnMock).toBeCalledWith({ path: 'download/id', hasSubmit: false });
  });
});
