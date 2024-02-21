import { useQuery } from '@tanstack/react-query';
import { NotificationContext, type TaddNotification } from 'App/NotificationProvider';
import downloadjs from 'downloadjs';
import { useCallback, useContext, useEffect, useId, useState } from 'react';
import { emptyFunction } from 'shared/helpers';
import { SERVICE_NAME, SUCCESS_DOWNLOAD_MESSAGE } from './constants';

/** *******************************************************
 * useDownload : hook pour l'appel asynchrone des données
 ********************************************************* */

type TuseDownload = {
  path: string;
  hasSubmit: boolean;
  useQueryFn?: typeof useQuery;
};

export const useDownload = ({ path, hasSubmit, useQueryFn = useQuery }: TuseDownload) => {
  const { data, isFetching, isSuccess, isError, error } = useQueryFn<Blob, { label: string }>({
    queryKey: [path, { blob: true }],
    enabled: hasSubmit,
  });
  return { error, isError, isSuccess, isLoading: isFetching, [SERVICE_NAME]: (data || []) as Blob };
};

export type TReturnUseDownload = ReturnType<typeof useDownload>;

/** *******************************************************
 * useSubmitDownload : hook pour l'état de la soumission
 ********************************************************* */

export const useSubmitDownload = (initialState = false) => {
  const [stateSubmitDownload, setStateSubmitDownload] = useState(initialState);

  const submitDownload = useCallback(() => {
    setStateSubmitDownload(true);
  }, []);

  const clearSubmitDownload = useCallback(() => {
    setStateSubmitDownload(false);
  }, []);

  return { stateSubmitDownload, submitDownload, clearSubmitDownload };
};

type TReturnUseSubmitDownload = ReturnType<typeof useSubmitDownload>;
type TclearSubmitDownload = TReturnUseSubmitDownload['clearSubmitDownload'];

/* ***************************************************************************************
 * Téléchargement du fichier dans le navigateur
 ***************************************************************************************** */

export const onSuccess = (clearSubmitDownload: TclearSubmitDownload, addNotification: TaddNotification, id = 'success-alert-id') => {
  clearSubmitDownload();
  addNotification({
    id,
    label: SUCCESS_DOWNLOAD_MESSAGE,
    type: 'success',
  });
};

export const onError = (
  clearSubmitDownload: TclearSubmitDownload,
  addNotification: TaddNotification,
  error: { label: string } | null,
  id = 'anomaly-alert-id',
) => {
  clearSubmitDownload();
  addNotification({
    id,
    label: error?.label ?? 'Erreur de téléchargement',
  });
};

type TuseDownloadFile = Omit<TReturnUseDownload, 'downloadFile'> & {
  downloadjsFn?: typeof downloadjs;
  hasSubmit: boolean;
  NotificationContextObj?: typeof NotificationContext;
  useIdFn?: typeof useId;
  clearSubmitDownload: TclearSubmitDownload;
  onSuccessFn?: typeof onSuccess;
  onErrorFn?: typeof onError;
  fileName: string;
  downloadFile: Blob;
  type?: string;
};

export const useDownloadFile = ({
  isLoading,
  isSuccess,
  isError,
  error,
  hasSubmit,
  downloadFile,
  fileName,
  type = 'text/csv',
  clearSubmitDownload,
  onSuccessFn = onSuccess,
  onErrorFn = onError,
  NotificationContextObj = NotificationContext,
  downloadjsFn = downloadjs,
  useIdFn = useId,
}: TuseDownloadFile) => {
  const { addNotification = emptyFunction } = useContext(NotificationContextObj);
  const id = useIdFn();

  useEffect(() => {
    if (downloadFile.size && fileName && hasSubmit && isSuccess && !isLoading) {
      downloadjsFn(downloadFile, fileName, type);
      onSuccessFn(clearSubmitDownload, addNotification, id);
    }
    if (isError && hasSubmit) {
      onErrorFn(clearSubmitDownload, addNotification, error, id);
    }
  }, [
    downloadFile,
    fileName,
    hasSubmit,
    type,
    isSuccess,
    addNotification,
    id,
    onSuccessFn,
    clearSubmitDownload,
    isError,
    onErrorFn,
    error,
    isLoading,
    downloadjsFn,
  ]);
};
