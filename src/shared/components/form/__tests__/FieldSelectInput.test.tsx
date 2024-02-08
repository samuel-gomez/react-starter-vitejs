import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FieldSelectInput from '../FieldSelectInput';
import { ERROR_MESSAGE, FieldInputWithControl, LABEL_SUBMIT } from './FieldWrapper.mock';

export const LABEL_CIVILITY = 'Civilité';
export const CIVILITY = 'civility';
export const OPTIONS_CIVILITY = [
  { label: 'M.', value: 'M', id: 'civility-m' },
  { label: 'Mme', value: 'MME', id: 'civility-mme' },
  { label: 'Other', value: 'OTHER', id: 'civility-other' },
];

const rules = {
  [CIVILITY]: {
    required: ERROR_MESSAGE,
  },
};

describe('<FieldSelectInput/>', () => {
  it('Should render FieldSelectInput', async () => {
    render(
      <FieldInputWithControl
        renderField={control => (
          <FieldSelectInput control={control} rules={rules[CIVILITY]} name={CIVILITY} label={LABEL_CIVILITY} options={OPTIONS_CIVILITY} />
        )}
      />,
    );
    const selectInput = screen.getByRole('combobox', { name: RegExp(LABEL_CIVILITY) });
    const type = 'Mme';

    expect(selectInput).toBeInTheDocument();
    await act(async () => {
      await waitFor(() => userEvent.selectOptions(selectInput, type));
    });
    await waitFor(() => expect(screen.getByDisplayValue(RegExp(type))).toBeInTheDocument());
  });

  it('Should render FieldSelectInput with error', async () => {
    render(
      <FieldInputWithControl
        renderField={control => (
          <FieldSelectInput control={control} rules={rules[CIVILITY]} name={CIVILITY} label={LABEL_CIVILITY} options={OPTIONS_CIVILITY} />
        )}
      />,
    );
    const selectInput = screen.getByRole('combobox', { name: RegExp(LABEL_CIVILITY) });
    expect(selectInput).toBeInTheDocument();

    await act(async () => {
      await waitFor(() => userEvent.click(screen.getByText(LABEL_SUBMIT)));
    });
    await screen.findByText(RegExp(ERROR_MESSAGE));
  });
});
