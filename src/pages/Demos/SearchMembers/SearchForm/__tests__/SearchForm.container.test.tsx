import { render } from '@testing-library/react';
import SearchFormContainer, { setOnSubmitSearchForm } from '../SearchForm.container';

const SearchFormCmpt = vi.fn();
const onSubmitSearchForm = vi.fn();
const useFormFnMockReturn = {
  handleSubmit: vi.fn(),
  control: {},
};
const defaultProps = {
  submitFormSearchMembers: vi.fn(),
  SearchFormCmpt,
};

describe('SearchFormContainer', () => {
  it('setConfirmClassModifierFn when Render <SearchFormContainer/>', () => {
    const setConfirmClassModifierFnMock = vi.fn().mockReturnValue('confirmClassModifier');
    const setOnSubmitSearchFormFnMock = vi.fn().mockReturnValue(onSubmitSearchForm);
    const useFormFnMock = vi.fn().mockReturnValue({ ...useFormFnMockReturn, formState: { isValid: true }, watch: vi.fn() });

    render(
      <SearchFormContainer
        {...defaultProps}
        setOnSubmitSearchFormFn={setOnSubmitSearchFormFnMock}
        setConfirmClassModifierFn={setConfirmClassModifierFnMock}
        useFormFn={useFormFnMock}
      />,
    );
    expect(setConfirmClassModifierFnMock).toBeCalled();
    expect(setOnSubmitSearchFormFnMock).toBeCalled();
    expect(SearchFormCmpt).toBeCalledWith(
      {
        className: 'af-filter-inline',
        confirmClassModifier: 'confirmClassModifier',
        hasErrors: false,
        onSubmit: onSubmitSearchForm,
        ...useFormFnMockReturn,
      },
      {},
    );
  });
});

describe('setOnSubmitSearchForm', () => {
  it('Should call submitFormSearchMembers with fields values When called with fields', () => {
    const submitFormSearchMembersMock = vi.fn();

    setOnSubmitSearchForm({
      submitFormSearchMembers: submitFormSearchMembersMock,
      fields: {
        name: 'valuename',
      },
    })();

    expect(submitFormSearchMembersMock).toBeCalledWith({
      name: 'valuename',
    });
  });
});
