import { type ComponentProps } from 'react';
import { setLoaderMode } from 'shared/components/Loader';
import DownloadLink from './DownloadLink';
import { useDownload, useDownloadFile, useSubmitDownload } from './DownloadLink.hook';

type TDownloadLinkEnhanced = Omit<ComponentProps<typeof DownloadLink>, 'onDownload' | 'loaderMode'> & {
  fileName: string;
  path: string;
  isDisabled?: boolean;
  setLoaderModeFn?: typeof setLoaderMode;
  useDownloadFn?: typeof useDownload;
  useDownloadFileFn?: typeof useDownloadFile;
  useSubmitDownloadFn?: typeof useSubmitDownload;
  DownloadLinkCmpt?: typeof DownloadLink;
};

const DownloadLinkEnhanced = ({
  label,
  path,
  fileName,
  isDisabled = false,
  setLoaderModeFn = setLoaderMode,
  useDownloadFn = useDownload,
  useDownloadFileFn = useDownloadFile,
  useSubmitDownloadFn = useSubmitDownload,
  DownloadLinkCmpt = DownloadLink,
  ...rest
}: TDownloadLinkEnhanced) => {
  const { stateSubmitDownload, submitDownload, clearSubmitDownload } = useSubmitDownloadFn();
  const { isLoading, downloadFile, isSuccess, isError, error } = useDownloadFn({ path, hasSubmit: stateSubmitDownload });

  useDownloadFileFn({ downloadFile, fileName, hasSubmit: stateSubmitDownload, isSuccess, error, isError, clearSubmitDownload, isLoading });

  return <DownloadLinkCmpt {...rest} label={label} loaderMode={setLoaderModeFn({ isLoading })} onDownload={submitDownload} isDisabled={isDisabled} />;
};

export default DownloadLinkEnhanced;
