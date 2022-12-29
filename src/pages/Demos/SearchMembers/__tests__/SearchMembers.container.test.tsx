import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { MODES } from 'shared/components/Loader';
import { render, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import SearchMembersContainer from '../SearchMembers.container';

const useSearchMembersFn = vi.fn();
const setLoaderModeFn = vi.fn();
const useFormSearchMembersFn = vi.fn();
const SearchMembersCmpt = vi.fn();
const submitFormSearchMembers = vi.fn();

const defaultProps = {
  useSearchMembersFn,
  setLoaderModeFn,
  useFormSearchMembersFn,
  SearchMembersCmpt,
};

const stateFormSearchMembers = {
  name: 'sam',
  hasSubmit: false,
};

describe('<SearchMembersContainer/>', () => {
  it('Should render SearchMembersContainer', () => {
    useFormSearchMembersFn.mockReturnValue({ submitFormSearchMembers, stateFormSearchMembers });
    useSearchMembersFn.mockReturnValue({ anomaly: null, isLoading: false, searchMembers: [] });
    setLoaderModeFn.mockReturnValue(MODES.none);
    renderWithWrapperStaticRouter(<SearchMembersContainer {...defaultProps} />);
    expect(useFormSearchMembersFn).toHaveBeenCalledWith({});
    expect(useSearchMembersFn).toHaveBeenCalledWith({ stateFormSearchMembers });
    expect(SearchMembersCmpt).toHaveBeenCalledWith({ submitFormSearchMembers, searchMembers: [], loaderMode: MODES.none, anomaly: null }, {});
  });

  const searchMembers = [
    {
      key: '1',
      name: {
        label: 'nom du membre',
      },
      id: {
        label: '1254689759',
      },
    },
  ];
  it('Should render SearchMembersContainer with one member', () => {
    useFormSearchMembersFn.mockReturnValue({ submitFormSearchMembers, stateFormSearchMembers });
    useSearchMembersFn.mockReturnValue({ anomaly: null, isLoading: false, searchMembers });
    setLoaderModeFn.mockReturnValue(MODES.none);
    renderWithWrapperStaticRouter(<SearchMembersContainer {...defaultProps} />);
    expect(useFormSearchMembersFn).toHaveBeenCalledWith({});
    expect(useSearchMembersFn).toHaveBeenCalledWith({ stateFormSearchMembers });
    expect(SearchMembersCmpt).toHaveBeenCalledWith({ submitFormSearchMembers, searchMembers, loaderMode: MODES.none, anomaly: null }, {});
  });

  it('Should render SearchMembersContainer with search form', () => {
    render(<SearchMembersContainer />);
    expect(screen.getByText(/Minimum 3 caractères pour un nom/));
    expect(screen.getByRole('form'));
  });
});
