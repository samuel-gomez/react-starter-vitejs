import { customRenderHook, waitFor } from 'shared/testsUtils';
import { computeInfos, usePeople } from '../People';

const peopleMock = [
  {
    _id: '99999',
    firstname: 'Samuel',
    lastname: 'Gomez',
    birthDate: '1985-10-20T13:44:20.540000',
    entity: 'AXA',
  },
];

const expectedData = [
  {
    cols: {
      birthDate: {
        label: '20/10/1985',
      },
      firstname: {
        label: 'Samuel',
      },
      lastname: {
        label: 'Gomez',
      },
      entity: {
        label: 'AXA',
      },
    },
    key: '99999',
  },
];

const expectedEmptyAnomaly = {
  label: 'Info : Aucune donnée trouvée',
  type: 'info',
  iconName: 'exclamation-sign',
};

describe('computeInfos', () => {
  it('Should computed people when computeInfos have been called with people', () => {
    const computedPeople = computeInfos(peopleMock);
    expect(computedPeople).toMatchObject(expectedData);
  });

  it('Should empty array when computeInfos have been called with empty people', () => {
    const computedPeople = computeInfos([]);
    expect(computedPeople).toEqual([]);
  });
});

describe('usePeople', () => {
  it.each`
    queryData                       | people          | isLoading | anomaly
    ${{ responseBody: [] }}         | ${[]}           | ${false}  | ${expectedEmptyAnomaly}
    ${{ responseBody: peopleMock }} | ${expectedData} | ${false}  | ${null}
  `(
    'Should return isLoading: $isLoading, anomaly: $anomaly, people: $people when usePeople is rendered with queryData: $queryData',
    async ({ queryData, anomaly, isLoading, people }) => {
      const { result } = customRenderHook({ queryData })(() => usePeople(), {});

      await waitFor(() =>
        expect(result.current).toMatchObject({
          anomaly,
          isLoading,
          people,
          refetch: result.current.refetch,
        }),
      );
    },
  );
});
