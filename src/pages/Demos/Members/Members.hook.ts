import { useQuery } from '@tanstack/react-query';
import { useCallback, useState, type Dispatch, type SetStateAction } from 'react';
import { setDisplay, type Torder } from 'shared/components/Table';
import { setAnomalyEmptyItems, setDate } from 'shared/helpers';
import type { Tanomaly } from 'shared/types.d';
import { DEFAULT_STATE_VALUE, INITIAL_STATE_PAGING, INITIAL_STATE_SORTING, SERVICE_NAME } from './constants';

export const setNumberPages = ({ total = 1, max = 1 }) => Math.ceil(max >= total ? 1 : Number(total / max) - 1);
export const setCurrentPage = ({ max, skip }: { max: number; skip: number }) => (+max !== 0 && Math.ceil(Number(skip / max))) || 1;

export const setPagination = ({ total = 1, skip = 1, max = 1, setCurrentPageFn = setCurrentPage, setNumberPagesfn = setNumberPages }) => ({
  total: Number(total),
  numberItems: Number(max),
  numberPages: setNumberPagesfn({ total, max }),
  currentPage: setCurrentPageFn({ max, skip }),
});

export type TMemberData = Record<string, string>;

export type TresponseBody = {
  data?: TMemberData[];
  totals?: {
    total: number;
    count: number;
    skip: number;
    max: number;
  };
};

export const computeInfos = (data: TMemberData[], setDateFn = setDate, setDisplayFn = setDisplay) =>
  data.map(({ _id, firstname, lastname, birthdate, sexe }) => ({
    key: _id,
    cols: {
      ...setDisplayFn({ firstname }),
      ...setDisplayFn({ lastname }),
      ...setDisplayFn({ birthdate: setDateFn({ date: birthdate }) }),
      ...setDisplayFn({ sexe }),
    },
  }));

type TcomputeSuccess = {
  setAnomalyEmptyItemsFn?: typeof setAnomalyEmptyItems;
  computeInfosFn?: typeof computeInfos;
  setPaginationFn?: typeof setPagination;
  responseBody: TresponseBody;
};

export const computeSuccess = ({
  responseBody,
  setAnomalyEmptyItemsFn = setAnomalyEmptyItems,
  computeInfosFn = computeInfos,
  setPaginationFn = setPagination,
}: TcomputeSuccess) => ({
  anomaly: setAnomalyEmptyItemsFn(responseBody?.data),
  [SERVICE_NAME]: {
    data: computeInfosFn(responseBody?.data ?? []),
    pagination: {
      ...setPaginationFn(responseBody?.totals ?? {}),
    },
  },
});

export const setPaging = (paging: typeof INITIAL_STATE_PAGING) => (prevPaging: Partial<typeof INITIAL_STATE_PAGING>) =>
  prevPaging?.numberItems !== paging?.numberItems
    ? {
        numberItems: paging?.numberItems,
        page: 1,
      }
    : paging;

type TsetState<Tstate> = Dispatch<SetStateAction<Tstate>>;

type TsetOnChangePaging = {
  setStateFormPaging: TsetState<typeof INITIAL_STATE_PAGING>;
  paging: typeof INITIAL_STATE_PAGING;
  setPagingFn?: typeof setPaging;
};

export const setOnChangePaging = ({ setStateFormPaging, paging, setPagingFn = setPaging }: TsetOnChangePaging) => {
  setStateFormPaging(setPagingFn(paging));
};

export const computeDataQuery = (data: { responseBody: TcomputeSuccess['responseBody'] } = { responseBody: {} }, computeSuccessFn = computeSuccess) =>
  computeSuccessFn({ ...data });

type TuseMembers = {
  initStateSorting?: Omit<typeof INITIAL_STATE_SORTING, 'order'> & { order: Torder };
  initStatePaging?: typeof INITIAL_STATE_PAGING;
  computeDataQueryFn?: typeof computeDataQuery;
  setOnChangePagingFn?: typeof setOnChangePaging;
  useQueryFn?: typeof useQuery;
};

export const useMembers = ({
  initStateSorting = INITIAL_STATE_SORTING,
  initStatePaging = INITIAL_STATE_PAGING,
  computeDataQueryFn = computeDataQuery,
  setOnChangePagingFn = setOnChangePaging,
  useQueryFn = useQuery,
}: TuseMembers) => {
  const [stateSorting, setStateSorting] = useState(initStateSorting);
  const [stateFormPaging, setStateFormPaging] = useState(initStatePaging);

  const { field, order } = stateSorting;
  const { numberItems, page } = stateFormPaging;

  const onChangeSorting = useCallback((sorting: typeof INITIAL_STATE_SORTING) => setStateSorting(sorting), []);

  const onChangePaging = useCallback(
    (paging: typeof INITIAL_STATE_PAGING) => setOnChangePagingFn({ setStateFormPaging, paging }),
    [setOnChangePagingFn],
  );

  const { data, isFetching, error, refetch } = useQueryFn({
    queryKey: [`members?max=${Number(numberItems)}&sort=${field}&dir=${order}&skip=${Number(page * numberItems)}`],
    select: computeDataQueryFn,
  });

  return {
    members: data?.members?.data ?? DEFAULT_STATE_VALUE.data,
    pagination: data?.members?.pagination ?? DEFAULT_STATE_VALUE.pagination,
    anomaly: (error || data?.anomaly) as Tanomaly | null,
    isLoading: isFetching,
    refetch,
    onChangeSorting,
    onChangePaging,
    sorting: stateSorting,
    stateFormPaging,
  };
};

export type TReturnUseMembers = ReturnType<typeof useMembers>;
