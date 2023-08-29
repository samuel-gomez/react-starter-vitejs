import { screen, within, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { DefineStepFunction } from 'jest-cucumber';

export const JeSelectionneUneValeurSurleChamp = (instruction: DefineStepFunction, parentLabel = '') =>
  instruction(/^Je sélectionne la valeur "(.*)" sur le champ "(.*)"$/, async (type, fieldName) => {
    const base = parentLabel ? within(await screen.findByLabelText(parentLabel)) : screen;

    const selectInput = base.getByLabelText(fieldName);

    await waitFor(() => userEvent.selectOptions(selectInput, type));
    await waitFor(() => expect(base.getByDisplayValue(RegExp(type))).toBeInTheDocument());
  });

export default JeSelectionneUneValeurSurleChamp;
