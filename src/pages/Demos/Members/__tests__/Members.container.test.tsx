import { render } from 'shared/testsUtils/customRender';
import { totals, oneMember } from './Members.mock';
import MembersContainer from '../Members.container';

describe('<MembersContainer />', () => {
  const MembersCmpt = vi.fn();
  const onChangePaging = vi.fn();
  const onChangeSorting = vi.fn();
  const refetch = vi.fn();
  const useMembersFn = vi.fn();
  const returnValueWithOneMember = {
    onChangePaging,
    onChangeSorting,
    refetch,
    anomaly: null,
    members: [{ name: 'value' }],
    pagination: {
      currentPage: 1,
      numberPages: 1,
      total: 0,
    },
    sorting: {
      field: 'firstname',
      order: 1,
    },
  };

  it.each`
    data           | returnValue
    ${[oneMember]} | ${returnValueWithOneMember}
    ${[]}          | ${{ ...returnValueWithOneMember, anomaly: { label: 'Info : Aucune donnée trouvée' }, members: [] }}
  `('Should call MembersCmpt with calculed props when useMembersFn return responseBody: $responseBody', ({ data, returnValue }) => {
    useMembersFn.mockReturnValue({ ...returnValue, isLoading: false });
    render(<MembersContainer MembersCmpt={MembersCmpt} useMembersFn={useMembersFn} />, {}, { responseBody: { totals, data } });
    expect(MembersCmpt).toBeCalledWith(
      {
        ...returnValue,
        loaderMode: 'none',
      },
      {},
    );
  });
});
