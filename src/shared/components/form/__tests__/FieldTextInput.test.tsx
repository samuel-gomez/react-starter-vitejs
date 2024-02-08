import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FieldTextInput from '../FieldTextInput';
import { ERROR_MESSAGE, FieldInputWithControl, LABEL_SUBMIT } from './FieldWrapper.mock';

export const LABEL_FIRSTNAME = 'Prénom';
export const FIRSTNAME = 'firstname';

const rules = {
  [FIRSTNAME]: {
    required: ERROR_MESSAGE,
  },
};

describe('<FieldTextInput/>', () => {
  it('Should render FieldTextInput', async () => {
    render(
      <FieldInputWithControl
        renderField={control => <FieldTextInput control={control} rules={rules[FIRSTNAME]} name={FIRSTNAME} label={LABEL_FIRSTNAME} />}
      />,
    );

    const textInput = screen.getByRole('textbox', { name: RegExp(LABEL_FIRSTNAME) });
    const value = 'Samuel';

    expect(textInput).toBeInTheDocument();
    const user = userEvent.setup();
    await act(async () => {
      await waitFor(() => user.type(textInput, value));
    });

    await waitFor(() => expect(textInput).toHaveValue(value));
  });

  it('Should render FieldSelectInput with error', async () => {
    render(
      <FieldInputWithControl
        renderField={control => <FieldTextInput control={control} rules={rules[FIRSTNAME]} name={FIRSTNAME} label={LABEL_FIRSTNAME} />}
      />,
    );
    const textInput = screen.getByRole('textbox', { name: RegExp(LABEL_FIRSTNAME) });
    expect(textInput).toBeInTheDocument();

    await act(async () => {
      await waitFor(() => userEvent.click(screen.getByText(LABEL_SUBMIT)));
    });
    await screen.findByText(RegExp(ERROR_MESSAGE));
  });
});
