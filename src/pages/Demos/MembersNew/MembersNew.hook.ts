import { useMutation } from '@tanstack/react-query';
import { FetchContext, type FetchContextType } from 'App/FetchProvider';
import { ALERT_TYPE, NotificationContext } from 'App/NotificationProvider';
import { type TNotificationContext } from 'App/NotificationProvider/NotificationProvider';
import { useContext } from 'react';
import type { FieldValues, UseFormReset } from 'react-hook-form';
import { STATUS_API } from 'shared/constants';
import type { Tanomaly } from 'shared/types.d';
import { ENDPOINT } from './constants';

type TData = Record<string, unknown>;

export type TfetchCustomAddMember = {
  fetchContextFn: FetchContextType;
  data: TData;
};

type TDataResponse = {
  responseBody: TData;
};

export const fetchCustomAddMember = ({ data, fetchContextFn }: TfetchCustomAddMember) =>
  fetchContextFn.fetchCustom<TDataResponse>([
    ENDPOINT,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  ]);

type Tmutation = {
  fetchContextFn: FetchContextType;
  fetchCustomAddMemberFn?: typeof fetchCustomAddMember;
};

export const mutation =
  ({ fetchContextFn, fetchCustomAddMemberFn = fetchCustomAddMember }: Tmutation) =>
  async (data: TData) =>
    fetchCustomAddMemberFn({ data, fetchContextFn });

type TonSuccess = TNotificationContext & {
  reset: UseFormReset<FieldValues>;
};

export const onSuccess =
  ({ addNotification, reset }: TonSuccess) =>
  (data: TDataResponse) => {
    const { firstname, lastname, id } = data.responseBody;
    addNotification({
      id: `addmember-${id}`,
      label: `Membre ${firstname} ${lastname} ajouté avec succès`,
      type: 'success',
    });
    reset();
  };

type TonError = TNotificationContext;

export const setTypeNotification = ({ code }: { code: Tanomaly['code'] }) =>
  `${code}`.startsWith(`${STATUS_API.WARNING}`) ? { type: ALERT_TYPE.danger } : {};

const onError =
  ({ addNotification }: TonError) =>
  (data: Tanomaly) => {
    const { label, code } = data;
    addNotification({
      label,
      id: `error-addmember-${code}`,
      ...setTypeNotification({ code }),
    });
  };

type TuseAddMember = {
  reset: UseFormReset<FieldValues>;
};

export const useAddMember = ({ reset }: TuseAddMember) => {
  const fetchContextFn = useContext(FetchContext) as FetchContextType;
  const { addNotification } = useContext(NotificationContext);
  return useMutation({
    onSuccess: onSuccess({ addNotification, reset }),
    onError: onError({ addNotification }),
    mutationFn: mutation({ fetchContextFn }),
  });
};
